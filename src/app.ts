import { Server } from 'socket.io';
import { Pieces } from '../entities';

const io = new Server({
    cors: {
        origin: '*'
    }
});

let positions: (Pieces | null)[][];

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

});


io.listen(8000);