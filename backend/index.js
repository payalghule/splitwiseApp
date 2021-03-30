// inbuilt package imports
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const multer = require("multer");

const Config = require('./config');

const app = express();
// setting view engine
app.set('view engine', 'ejs');
// use body parser to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());

app.use(cors({ origin: `${Config.appServer}`, credentials: true }));

//Allow Access Control
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', `${Config.appServer}`);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,HEAD,OPTIONS,POST,PUT,DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
	);
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

// use session to store user data between HTTP requests
app.use(
	session({
		secret: 'payal_splitwise_secure_string',
		resave: false,
		saveUninitialized: false,
		duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
		activeDuration: 5 * 60 * 1000,
	})
);

app.use(express.static('./public'));

//To test connection
const mongoose = require('mongoose');

var options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	poolSize: 500,
	bufferMaxEntries: 0,
};

mongoose.connect(Config.mongoDB, options, (err, res) => {
	if (err) {
		console.log(err);
		console.log(`MongoDB Connection Failed`);
	} else {
		console.log(`MongoDB Connected`);
	}
});

const signup = require('./Services/signup');
const login = require('./Services/login');

app.use('/signup', signup);
app.use('/login', login);

const server = app.listen(3001, () => {
	console.log('Server listening on port 3001');
});

module.exports = app;
