var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var queue = 'myQueue';

    ch.assertQueue(queue, {durable: false});

    console.log('Waiting for messages to appear on %s', queue)
    ch.consume(queue, function(msg) {
      console.log('[*] Received %s', msg.content.toString());
    }, {noAck: true});
  })
});
