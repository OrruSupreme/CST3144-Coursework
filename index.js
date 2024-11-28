// Setting up the express server
const express = require('express');
const { ObjectId, ReturnDocument } = require('mongodb');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')


//Middleware setup
app.use(express.static("doc"));
app.use(bodyParser.json());