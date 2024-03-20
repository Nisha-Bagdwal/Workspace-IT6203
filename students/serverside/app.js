const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
//specify where to find the schema
const Student = require('./models/student')
//connect and display the status 
mongoose.connect('mongodb://localhost:27017/IT6203')
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/students', (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
    Student.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});

//serve incoming post requests to /students
app.post('/students', (req, res, next) => {
    // create a new student variable and save request’s fields 
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    //send the document to the database 
    student.save()
        //in case of success
        .then(() => {
            console.log('Success ' + student.firstName + " " + student.lastName);
            //sent an acknowledgment back to caller 
            res.status(201).json('Post successful');
        })
        //if error
        .catch(err => {
            console.log('Error:' + err);
            //sent an error back to caller 
            res.status(500).json(err);
        });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/students/:id", (req, res, next) => {
    Student.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//to use this middleware in other parts of the application
module.exports = app;