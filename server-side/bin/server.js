import debug from 'debug';
import http from 'http';
import app from './../src/app';
import socketIO  from 'socket.io';

const port   = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

app.set('port', port);

server.listen(port, () => console.log('Server running on the port: ' + port));
server.on('error', onError);
server.on('listening', onListening);

//Socket IO
const io = new socketIO(server);

    io.on('connection', socket => {
        console.log('User connect', socket.id);
    });










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