const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const app = next({});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        socket.on('message', (msg) => {
            io.emit('message', msg);
        });

        socket.on('disconnect', () => {});
    });

    const PORT = process.env.PORT || 3000;
    httpServer
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(PORT, () => {
            console.log(`> Ready on http://localhost:${PORT}`);
        });
});


console.log("hi?!")