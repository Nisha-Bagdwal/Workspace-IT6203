const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
//specify where to find the schema
const StudentInfo = require('./models/studentinfo');
const Driver = require('./models/driver');
const Ride = require('./models/ride');
//connect and display the status 
mongoose.connect('mongodb://localhost:27017/KSURideShare')
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

app.get('/studentinfo/:id', (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
    StudentInfo.findOne({ studentId: req.params.id })
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});

app.get('/driver/:id', (req, res, next) => {
    Driver.findOne({ _id: req.params.id })
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
        })
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

    const studentinfo = new StudentInfo({
        studentId,
        firstName,
        lastName,
        phone,
        email
    });

    //send the document to the database 
    driver.save()
        //in case of success
        .then(() => {
            console.log('Registered ' + driver.firstName + " " + driver.lastName);
            //save information of driver as student in student info table
            studentinfo.save().then(() => console.log("Student Info Saved " + driver.firstName + " " + driver.lastName))
                .catch(err => {
                    console.log('Error:' + err);
                });
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
        res.status(200).json("Deleted!");
    });
});

app.get('/listDrivers', (req, res, next) => {
    Driver.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});

app.delete("/driver/:id", (req, res, next) => {
    Driver.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json("Deleted!");
    });
});

app.put('/driver/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        //find a document and set new first and last names 
        Driver.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    studentId: req.body.studentId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    carInfo: {
                        licensePlateNumber: req.body.carInfo.licensePlateNumber,
                        carMake: req.body.carInfo.carMake,
                        carModel: req.body.carInfo.carModel,
                        carColor: req.body.carInfo.carColor,
                    },
                    availabilities: req.body.availabilities
                }
            },
            { new: true }
        )
            .then((driver) => {
                if (driver) { //what was updated 
                    res.status(200).json("Updated!");
                } else {
                    console.log("no data exist for this driver id");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("please provide correct id");
    }
});

app.post('/searchAvailableRides', (req, res, next) => {

    const sourceCampus = req.body.searchRide.sourceCampus;
    const destinationCampus = req.body.searchRide.destinationCampus;
    const dayOfRide = req.body.searchRide.dayOfRide;

    // Find drivers with matching availabilities
    Driver.find({
        'availabilities.sourceCampus': sourceCampus,
        'availabilities.destinationCampus': destinationCampus,
        'availabilities.availableDay': dayOfRide,
    })
        .then(availableDrivers => {
            // Create an array to store available rides
            const availableRides = [];

            // Loop through each driver
            availableDrivers.forEach(driver => {
                // Loop through each availability of the driver
                driver.availabilities.forEach(availability => {
                    if (
                        availability.sourceCampus === sourceCampus &&
                        availability.destinationCampus === destinationCampus &&
                        availability.availableDay === dayOfRide
                    ) {
                        // Availability matches the ride information
                        availableRides.push({
                            driverId: driver._id,
                            firstName: driver.firstName,
                            lastName: driver.lastName,
                            email: driver.email,
                            phone: driver.phone,
                            carInfo: driver.carInfo,
                            availability: availability,
                        });
                    }
                });
            });

            res.status(200).json(availableRides);
        })
        .catch(error => {
            console.error('Error searching for rides:', error);
            res.status(500).json({ error: 'Internal server error' });
        });

});

app.post('/bookRide', (req, res, next) => {

    const { ride, rider } = req.body;

    // Create a new ride instance
    const rideBooked = new Ride({
        ride,
        rider
    });

    const { studentId, firstName, lastName, phone, email} = req.body.rider;

    const studentinfo = new StudentInfo({
        studentId,
        firstName,
        lastName,
        phone,
        email
    });

    //send the document to the database 
    rideBooked.save()
        //in case of success
        .then(() => {
            console.log('Ride booked ' + rideBooked.ride.firstName + " " + rideBooked.ride.lastName);

             //save information of driver as student in student info table
             studentinfo.save().then(() => console.log("Student Info Saved "  + rideBooked.ride.firstName + " " + rideBooked.ride.lastName))
             .catch(err => {
                 console.log('Error:' + err);
             });

            //sent an acknowledgment back to caller 
            res.status(201).json('Post successful');
        })
        .catch(err => {
            console.log('Error:' + err);
            //sent an error back to caller 
            res.status(500).json(err);
        });
});

app.get('/getScheduledRides', (req, res, next) => {
    Ride.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

app.delete("/ride/:id", (req, res, next) => {
    Ride.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json("Deleted!");
    });
});

app.put('/ride/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Ride.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    ride: req.body.ride,
                    rider: req.body.rider
                }
            },
            { new: true }
        )
            .then((ride) => {
                if (ride) { //what was updated 
                    res.status(200).json("Updated!");
                } else {
                    console.log("no data exist for this ride id");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("please provide correct id");
    }
});

app.get('/ride/:id', (req, res, next) => {
    Ride.findOne({ _id: req.params.id })
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
        })
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});


//to use this middleware in other parts of the application
module.exports = app;