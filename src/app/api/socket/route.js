// src/app/api/socket/route.js
import { Server } from 'socket.io';

export async function GET(req) {
    const res = req.res;
    if (!res.socket.server.io) {
        console.log('*First use, starting Socket.IO');

        const io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });

        io.on('connection', socket => {
            console.log('A user connected:', socket.id);

            socket.on('disconnect', () => {
                console.log('A user disconnected:', socket.id);
            });

            socket.on('chat message', msg => {
                io.emit('chat message', msg);
            });
        });

        res.socket.server.io = io;
    }

    // End the response to avoid stalling the request
    return new Response(null, { status: 200 });
}