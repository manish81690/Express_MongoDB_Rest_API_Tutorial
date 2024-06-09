const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    property_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,

    });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
