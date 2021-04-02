const mongoose = require('mongoose');
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	poolSize: 3,
	bufferMaxEntries: 0,
};
const connectionString =
	'mongodb+srv://admin:admin@cluster0.jengz.mongodb.net/dbSplitwise?retryWrites=true&w=majority';
const mongoConnection = mongoose.connect(connectionString, options).then(() => {
	console.log('MongoDB connected');
});
module.exports = mongoConnection;
