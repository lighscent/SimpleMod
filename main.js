const client = require("./client");
require("dotenv").config();


require("./db")
require("./handlers/events");
require("./handlers/commands");



client.login(process.env.TOKEN);