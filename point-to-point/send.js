var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var queue = 'myQueue';

    ch.assertQueue(queue, {durable: false});

    ch.sendToQueue(queue, new Buffer('Hello World!'));
    console.log('Sent a message to the queue named:', queue)
  })

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
