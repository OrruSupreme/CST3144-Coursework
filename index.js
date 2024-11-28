// Setting up the express server
const express = require('express');
const { ObjectId, ReturnDocument } = require('mongodb');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')


//Middleware setup
app.use(express.static("doc"));
app.use(bodyParser.json());

//Request Logger Middleware
const reqLogger = (req, res, next) => {
    console.log(
        `A ${req.method} request to the ${req.path} URL was made on ${new Date()}`
    );
    next()
}
app.use(reqLogger)


app.listen(4000, function () {
    console.log('Server started at port 4000')
})

// Importing required module
const { MongoClient } = require("mongodb");
//mongodb URI used to connect to a Atlas cluster
const databaseURL = "mongodb+srv://so956:4d3Icf30RSuc1MwB@cluster0.edg67.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoClient = new MongoClient(databaseURL)
//accessing the project1 database 
const database = mongoClient.db("project1");


// Establish a connection to the MongoDB server
function connect() {
    mongoClient.connect()
    let database = mongoClient.db('project1')
    return database
}

//Create a mongodb instance
let mongoDatabase = connect();



//Retrieve all courses
app.get("/courses/", async (req, res) => {
    try {
        const courses = database.collection("courses")
        const result = await courses.find({}).toArray()
        const response = result.map((item) => {
            return {
                ...item,
                id: item._id.toString()
            }

        })
        res.json(response)
    } catch (error) {
        console.error(error.message);

    }
});


/*Create new course*/
app.post('/courses/', async (req, res) => {
    //try block to catch and handle errors
    try {
        //defined courses to represent the courses collection in my MongoDB database allowing me to insert data
        const courses = database.collection("courses")
        //defined data object to hold the data to be inserted into courses
        const data = {
            id: req.body.id,
            subject: req.body.subject,
            location: req.body.location,
            price: req.body.price,
            space: req.body.space
        }
        /* inserting the defined data into courses*/
        const result = await courses.insertOne(data);
        console.log(result);
    }
    /*if any error occurs in the try block the catch block will execute it*/
    catch (error) {
        console.error(error.message);
    }
    return res.send();

});


/*setting up a put route to update course by id*/
app.put('/courses/:id', async (req, res) => {
    let course = {}
    try {
        const courses = database.collection("courses");
        const filter = { _id: new ObjectId(req.params.id) };
        console.log(req.params.id);
        course = await courses.findOne(filter)
        console.log(course)
        const updateDoc = {
            $set: {
                id: req.body.id || course.id,
                subject: req.body.subject || course.subject,
                location: req.body.location || course.location,
                price: req.body.price || course.price,
                space: req.body.space || course.space
            },
        };
        await courses.updateOne(filter, updateDoc);
        course = await courses.findOne(filter)
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
    return res.status(200).json(course);
})

//get by id
app.get('/courses/:id', async (req, res) => {
    let course = {}
    try {
        const courses = database.collection("courses");
        const filter = { _id: new ObjectId(req.params.id) };
        course = await courses.findOne(filter)
    } catch (error) {
        console.log(error)
    }
    return res.status(200).json(course);
})
