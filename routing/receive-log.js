var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    ch.assertExchange('myDirectLoggingExchange', 'direct', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      args.forEach(function(severity) {
        ch.bindQueue(q.queue, 'myDirectLoggingExchange', severity);
      });

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});
