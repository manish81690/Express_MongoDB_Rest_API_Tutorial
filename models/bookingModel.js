const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    isbooked: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
