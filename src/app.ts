import { Server } from 'socket.io';
import { Pieces } from '../entities';

const io = new Server({
    cors: {
        origin: '*'
    }
});

let positions: (Pieces | null)[][];
let myTurn = true;

io.on('connection', (socket) => {
    console.log('user : ' + socket.id + " connected");

    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('user : ' + socket.id + " disconnected");
    });

    socket.on('positionsToBack', (data) => {
        positions = data;
        console.log(positions);
        socket.broadcast.emit('positionsToFront', positions);
    })

    if (io.sockets.sockets.size === 1) {
        socket.emit('myTurn')
    }

});


io.listen(8000);