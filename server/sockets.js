var io = require('socket.io')();

io.on('connection', function (socket) {
  
  // New connection on port
  console.log('New Connection: ', socket.id);
  
  // Emit name for testing purposes
  socket.emit('send:name', {
    name: '@SebFlorian'
  });
  
  /*
  / Published Data
  */
  
  // Add Item
  socket.on('add:pub', function (data) {
    
    console.log("Pub item added: ", data.item.id);
    
    // breadcast to all other clients deleted element's id
    socket.broadcast.emit('add:pub:out', {
      item : data.item
    });
  });
  
  // Delete Item
  socket.on('delete:pub', function (data) {
    
    console.log("Pub item deleted ", data.id);
    
    // breadcast to all other clients deleted element's id
    socket.broadcast.emit('delete:pub:out', {
      id: data.id
    });
    
  });
  
  // Disconnect
  socket.on('disconnect', function(){
    console.log('Disconnected: ', socket.id);
  });
  
});

module.exports = io;