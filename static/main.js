$(function () {
  var socket = io();
  var stock = {
    "pods": 0,
    "iphone": 0,
    "cable": 0,
    "adapter": 0,
    "jack": 0
  };

  // Check stock and fill buttons
  function refresh () {
    $.each(stock, function(key, value) {
      if (value > 0) {
        $('.action a[href=#'+key+']').next().next().html(value+' in stock').parent().removeClass('disable');
      } else {
        $('.action a[href=#'+key+']').next().next().html('Not available').parent().addClass('disable');
      }
    })
  }

  // Init refresh
  refresh();

  // Buy
  $(".action a").click(function(e){
    e.preventDefault();
    key = $(this).attr('href').substr(1);
    if (stock[key] > 0) {
      socket.emit('buy', key);
    }
  })

  // Update stock
  $("a[href=#addstock]").click(function(e){
    e.preventDefault();
    socket.emit('addstock');
  })

  // Socket update stock
  socket.on('stock', function(data){
    stock = data;
    refresh();
  });
});