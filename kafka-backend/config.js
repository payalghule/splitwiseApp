const appServer = 'http://localhost:3000';

const backendServer = 'http://localhost:3001';

const secret = 'payal_splitwise_secure_string';

const kafkaURI = 'localhost:2181';

const mongoDB =
	'mongodb+srv://admin:admin@cluster0.jengz.mongodb.net/dbSplitwise?retryWrites=true&w=majority';

exports.appServer = appServer;
exports.backendServer = backendServer;
exports.secret = secret;
exports.mongoDB = mongoDB;
exports.kafkaURI = kafkaURI;
