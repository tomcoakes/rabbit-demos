var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var queue = 'myWorkerQueue';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    ch.assertQueue(queue, {durable: true});

    ch.sendToQueue(queue, new Buffer(msg), {persistent: true});
    console.log('Sent %s to the queue named: %s', msg, queue);
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
