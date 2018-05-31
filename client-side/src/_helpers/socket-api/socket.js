import openSocket from 'socket.io-client';
import { API } from '../../_constants';

const socket = openSocket(API);

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer, socket };