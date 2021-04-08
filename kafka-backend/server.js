var connection = new require("./kafka/connection");
//const database = require('./database');

const mongoose = require("mongoose");
const mongoDBURI =
	"mongodb+srv://admin:admin@cluster0.jengz.mongodb.net/dbSplitwise?retryWrites=true&w=majority";

const connectMongoDB = async () => {
	const options = {
		poolSize: 10,
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	};

	try {
		await mongoose.connect(mongoDBURI, options);
		console.log("MongoDB connected !!");
	} catch (err) {
		console.log("Could not connect to MongoDB", err);
	}
};
connectMongoDB();
// topics files
const signup = require("./services/authentication/signup");
const login = require("./services/authentication/login");
const getuserprofile = require("./services/profile/getuserprofile");
const updateuser = require("./services/profile/updateuser");
const images = require("./services/profile/images");
const creategroup = require("./services/group/creategroup");
const getallusers = require("./services/group/getallusers");

function handleTopicRequest(topic_name, fname) {
	var consumer = connection.getConsumer(topic_name);
	var producer = connection.getProducer();
	//console.log(producer);
	console.log("server is running ");
	consumer.on("message", function (message) {
		console.log("message received for " + topic_name + " ", fname);
		console.log(JSON.stringify(message.value));
		var data = JSON.parse(message.value);
		fname.handle_request(data.data, (err, res) => {
			console.log("in callback, producer:");
			console.log(err);
			console.log(res);
			//console.log(producer);
			//response(data, res, err, producer);
			var payloads = [
				{
					topic: data.replyTo,
					messages: JSON.stringify({
						correlationId: data.correlationId,
						data: res,
					}),
					partition: 0,
				},
			];
			producer.send(payloads, function (err, data) {
				//console.log('producer send', data);
				if (err) {
					console.log("Error when producer sending data", err);
				} else {
					console.log("response");
					console.log(data);
				}
			});
			return;
		});
	});
}

function response(data, res, producer) {
	console.log("after handle", res);
	var payloads = [
		{
			topic: data.replyTo,
			messages: JSON.stringify({
				correlationId: data.correlationId,
				data: res,
			}),
			partition: 0,
		},
	];
	producer.send(payloads, function (err, data) {
		//console.log('producer send', data);
		if (err) {
			console.log("Error when producer sending data", err);
		} else {
			console.log(data);
		}
	});
	return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup", signup);
handleTopicRequest("login", login);
handleTopicRequest("getuserprofile", getuserprofile);
handleTopicRequest("updateuser", updateuser);
handleTopicRequest("images", images);
handleTopicRequest("creategroup", creategroup);
handleTopicRequest("getallusers", getallusers);
