const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
//specify where to find the schema
const StudentInfo = require('./models/studentinfo')
const Driver = require('./models/driver')
//connect and display the status 
mongoose.connect('mongodb://localhost:27017/KSURideShare')
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
app.get('/studentinfo/:id', (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
    StudentInfo.findOne({studentId : req.params.id})
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});

app.post('/registerDriver', (req, res, next) => {
    
    // Extract form data
    const { studentId, firstName, lastName, email, phone, carInfo, availabilities } = req.body;

    // Create a new Driver instance
    const driver = new Driver({
        studentId,
        firstName,
        lastName,
        email,
        phone,
        carInfo,
        availabilities,
    });

    //send the document to the database 
    driver.save()
        //in case of success
        .then(() => {
            console.log('Registered ' + driver.firstName + " " + driver.lastName);
            //sent an acknowledgment back to caller 
            res.status(201).json('Post successful');
        })
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