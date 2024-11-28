// Setting up the express server
const express = require('express');
const { ObjectId, ReturnDocument } = require('mongodb');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')


//Middleware setup
app.use(express.static("doc"));
app.use(bodyParser.json());


app.listen(4000, function () {
    console.log('Server started at port 4000')
})
