var kafka = require("kafka-node");
var http = require("http");
const Config = require("../config");

function ConnectionProvider() {
	this.getConsumer = function (topic_name) {
		console.log("consumer consumer", topic_name);
		this.client = new kafka.KafkaClient(`${Config.kafkaURI}`);
		this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
			{ topic: topic_name, partition: 0 },
		]);
		this.client.on("ready", function () {
			console.log("client ready in node backend!");
		});
		// }
		return this.kafkaConsumerConnection;
	};

	//Code will be executed when we start Producer
	this.getProducer = function () {
		if (!this.kafkaProducerConnection) {
			this.client = new kafka.KafkaClient(`${Config.kafkaURI}`);
			var HighLevelProducer = kafka.HighLevelProducer;
			this.kafkaProducerConnection = new HighLevelProducer(this.client);
			console.log("producer ready");
		}
		return this.kafkaProducerConnection;
	};
}
exports = module.exports = new ConnectionProvider();
