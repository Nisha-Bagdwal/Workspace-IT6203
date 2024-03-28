const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    carInfo: {
        licensePlateNumber: String,
        carMake: String,
        carModel: String,
        carColor: String,
    },
    availabilities: [{
        sourceCampus: String,
        destinationCampus: String,
        availableDay: String,
        availableTime: String,
    }],
});


//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Driver', driverSchema, 'DriverDetails');
//note capital S in the collection name