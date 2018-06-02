import debug from 'debug';
import http from 'http';
import app from './../src/app';
import Server from 'socket.io';

const port   = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);
const io = new Server().attach(server);

app.set('port', port);

server.listen(port, '192.168.1.5');

server.listen(port, () => console.log('Server running on the port: ' + port));
server.on('error', onError);
server.on('listening', onListening);

var sala = 'aguardando';
var cont = 0;


function onError() {

    if(error.syscall !== 'listen') 
        throw error;

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch(error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': 
            console.log(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }

}

function onListening() {

    const addr = server.address();
    
    const bind = typeof addr === 'string'
        ? 'Pipe ' + addr
        : 'Port ' + addr.port;
    
    debug('Listening on ' + bind);
    
}

function normalizePort(val) {

    const port = parseInt(val, 10);

    if(isNaN(port)) 
        return val;

    if(port >= 0)
        return port;

    return false;

}

io.on('connection', function (socket) {

    cont = cont +1;

    console.log('User connect', socket.id);

    socket.on('join', function (data) {
        
        if (sala == 'aguardando') {
            sala = data;
            socket.join(sala);
            socket.room = sala;
        }
        else {
            socket.join(sala);
            socket.room = sala;


            let rand = Math.floor(Math.random() * 8) + 1;
            socket.to(sala).emit('cenario', rand);
            socket.emit('cenario', rand);

            socket.to(sala).emit('oponente', data);
            socket.emit('oponente', sala);
            sala = 'aguardando';
        }
    });

    socket.on('disconnect', function (data) {

        cont = cont-1;

        io.of('/').in(socket.room).clients((error, clients) => {
            if (clients.length > 0) {
                clients.forEach(function (id) {
                    if (id !== socket.id) {
                        socket.to(id).emit('desconectado');
                        io.sockets.connected[id].leave(socket.room);
                    }
                });
            }
            if (sala === socket.room) {
                sala = 'aguardando'
            }
        });
    });

    socket.on('gameover', function () {
        io.of('/').in(socket.room).clients((error, clients) => {
            if (clients.length > 0) {
                clients.forEach(function (id) {
                    socket.to(id).emit('oponente','');
                    io.sockets.connected[id].leave(socket.room);
                });
            }
            if (sala === socket.room) {
                sala = "aguardando"
            }
        });
    });

    socket.on('desistiu', function () {
        io.of('/').in(socket.room).clients((error, clients) => {
            if (clients.length > 0) {
                clients.forEach(function (id) {
                    if (id !== socket.id) {
                        socket.to(id).emit('desistiu');
                        io.sockets.connected[id].leave(socket.room);
                    }
                });
            }
            if (sala === socket.room) {
                sala = "aguardando"
            }
        });

    });

    socket.on('oponenteJogou', function () {
        socket.broadcast.to(socket.room).emit('oponenteJogou');
    });

    socket.on('decidir', function (jogada) {
        socket.broadcast.to(socket.room).emit('decidir', jogada);
    });
    
});
