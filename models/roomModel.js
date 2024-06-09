const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }   
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;