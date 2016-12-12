var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var queue = 'myWorkerQueue';

    ch.assertQueue(queue, {durable: true});
    ch.prefetch(1);

    console.log('Waiting for messages to appear on %s', queue)
    ch.consume(queue, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log('[*] Received %s', msg.content.toString());

      setTimeout(function() {
        console.log('[x] Done');
        ch.ack(msg);
      }, secs * 1000);
    }, {noAck: false});
  });
});
