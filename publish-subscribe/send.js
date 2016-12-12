var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var loggingExchange = 'myLoggingExchange';

    ch.assertExchange(loggingExchange, 'fanout', {durable: false});

    ch.publish(loggingExchange, '', new Buffer('Hello World!')); // empty string as second parameter means we don't want to send to any specific queue, only to the logs exchange
    console.log('[x] Sent message to the exchange named: %s', loggingExchange);
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
