const bodyParser = require('body-parser')
const express = require("express");
const path = require("path");
const process = require("process");

const json_reader = require("./json_reader.js");

// Change default folder
process.chdir(path.join(__dirname, "public"));

// Set up server
const app = express();
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({ extended: true }));
app.listen("8080");

// JSON Reader
var jsonReader = new json_reader.JSONReader(path.join(__dirname, "/public/resources/index.json"));

// Deal with GET request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/views/index.html"));
});

app.get("/json", (req, res) => {
    res.json(jsonReader.read());
});
