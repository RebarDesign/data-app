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
  
  
  // Delete Item
  socket.on('delete:pub', function (data) {
    
    console.log("Pub item deleted ", data.id);
    
    // breadcast to all other clients deleted element's id
    socket.broadcast.emit('delete:pub:out', {
      id: data.id
    });
    
  });
  
  // Add Item
  socket.on('add:pub', function (data) {
    
    console.log("Pub item added: ", data.item.id);
    
    // breadcast to all other clients added element
    socket.broadcast.emit('add:pub:out', {
      item : data.item
    });
  });
  
  // Update Item
  socket.on('update:pub', function (data) {
    
    console.log("Pub item updated: ", data.id);
    
    // breadcast to all other clients added element
    socket.broadcast.emit('update:pub:out', {
      id   : data.id,
      item : data.item
    });
  });
  
  // Disconnect
  socket.on('disconnect', function(){
    console.log('Disconnected: ', socket.id);
  });
  
});

module.exports = io;