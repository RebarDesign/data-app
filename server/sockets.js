var io = require('socket.io')();

io.on('connection', function (socket) {
  
  // New connection on port
  console.log('New Connection: ', socket.id);
  
  // Emit name for testing purposes
  socket.emit('send:name', {
    name: '@SebFlorian'
  });
  
  
  // Disconnect
  socket.on('disconnect', function(){
    console.log('Disconnected: ', socket.id);
  });
  
});

module.exports = io;