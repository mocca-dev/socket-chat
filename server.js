var app = require('express')();
var http = require('http').createServer(app);
const PORT = 8080;
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

const NEW_MESSAGE_EVENT = 'newChatMessage';

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    console.log('new message', data);
    io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on('disconnect', () => socket.leave(roomId));
  console.log('new client connected');
});
