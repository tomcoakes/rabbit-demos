var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertExchange('myLoggingExchange', 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, queue) {
      ch.bindQueue(queue.queueName, 'myLoggingExchange', '');

      ch.consume(queue.queueName, function(msg) {
        console.log('[x] Received %s', msg.content.toString());
      }, {noAck: true});
    });
  });
});
