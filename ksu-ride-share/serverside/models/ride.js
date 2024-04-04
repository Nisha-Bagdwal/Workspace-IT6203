const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({

    ride: {
        studentId: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phone: { type: String },
        carInfo: {
            licensePlateNumber: String,
            carMake: String,
            carModel: String,
            carColor: String,
        },
        availability: {
            sourceCampus: String,
            destinationCampus: String,
            availableDay: String,
            availableTime: String,
        }
    },

    rider: {
        studentId: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        searchRide: {
            sourceCampus: String,
            destinationCampus: String,
            dayOfRide: String,
            timeOfRide: String,
        }
    }

});


//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Ride', rideSchema, 'RideDetails');
//note capital S in the collection name