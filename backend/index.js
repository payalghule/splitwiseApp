// inbuilt package imports
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const multer = require("multer");

const bcrypt = require("bcrypt");
const Config = require("./config");
//const mongoConnection = require("./database");
//var kafka = require('./kafka/client');

const app = express();
// setting view engine
app.set("view engine", "ejs");
// use body parser to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());

app.use(cors({ origin: `${Config.appServer}`, credentials: true }));

//Allow Access Control
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", `${Config.appServer}`);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	res.setHeader("Cache-Control", "no-cache");
	next();
});

// use session to store user data between HTTP requests
app.use(
	session({
		secret: "payal_splitwise_secure_string",
		resave: false,
		saveUninitialized: false,
		duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
		activeDuration: 5 * 60 * 1000,
	})
);

app.use(express.static("./public"));

//const signupRouter = require("./Services/signup");
//app.post("/signup", signupRouter.UserSignUp);

const signup = require("./Services/signup");
const login = require("./Services/login");
const profile = require("./Services/profile");
const uploads = require("./Services/uploads");
const images = require("./Services/images");

app.use("/signup", signup);
app.use("/login", login);
app.use("/profile", profile);
app.use("/uploads", uploads);
app.use("/images", images);

const server = app.listen(3001, () => {
	console.log("Server listening on port 3001");
});

module.exports = app;
