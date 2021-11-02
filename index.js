const { token } = require('./config.json');
var log4js = require("log4js");

var myMikuClient = require('./client/MyMikuClient').instance;

var logger = log4js.getLogger();
logger.level = "debug";
logger.debug("Some debug messages");

myMikuClient.login(token);
