var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Stock
var stock = {
  "pods": 12,
  "iphone": 5,
  "cable": 12,
  "adapter": 3,
  "jack": 9
}
var users = 0;

// Static files and main page
app.use(express.static('static'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// On connection
io.on('connection', function(socket){
  users++;
  io.emit('users', users);

  io.emit('stock', stock);

  socket.on('buy', function(key){
    if (stock[key] > 0) {
      stock[key]--;
    }
    io.emit('stock', stock);
  })

  socket.on('addstock', function(){
    stock = {
      "pods": 10,
      "iphone": 10,
      "cable": 10,
      "adapter": 10,
      "jack": 10
    }
    io.emit('stock', stock);
  })

  socket.on('disconnect', function(){
    users--;    
    io.emit('users', users);
  });
});

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
});