var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue('myPointToPointQueue', {durable: false});

    console.log('Waiting for messages to appear on myPointToPointQueue');
    ch.consume('myPointToPointQueue', function(msg) {
      console.log('[*] Received %s', msg.content.toString());
    }, {noAck: true});
  })
});
