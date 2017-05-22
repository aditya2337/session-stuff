var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds053206.mlab.com:53206/androiditya');
mongoose.Promise = global.Promise;

mongoose.connection
.once('open', () => console.log('Mongo good to go!'))
.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

const User = new mongoose.Schema({
  username: String,
  password: String
}, {collection: 'purnima'});

module.exports = mongoose.model('User', User);
