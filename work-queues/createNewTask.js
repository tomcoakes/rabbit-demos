var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var msg = process.argv.slice(2).join(' ');

    ch.assertQueue('myWorkerQueue', {durable: true});

    ch.sendToQueue('myWorkerQueue', new Buffer(msg), {persistent: true});
    console.log('Sent %s to myWorkerQueue', msg);
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
