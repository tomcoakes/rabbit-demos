var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue('myPointToPointQueue', {durable: false});

    ch.sendToQueue('myPointToPointQueue', new Buffer('Hello World!'));
    console.log('Sent a message to myPointToPointQueue');
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
