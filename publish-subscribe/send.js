var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertExchange('myLoggingExchange', 'fanout', {durable: false});

    ch.publish('myLoggingExchange', '', new Buffer('Hello World!')); // empty string as second parameter means we don't want to send to any specific queue, only to the logs exchange
    console.log('[x] Sent message to myLoggingExchange');
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
