const asyncHandler = require("express-async-handler");
const Booking = require('../models/bookingModel');
const mongoose = require('mongoose');


const bookRoom = asyncHandler(async (req, res) => {
    const { room_id, checkIn, checkOut } = req.body;
    console.log(req.body);
    if (!room_id || !checkIn || !checkOut) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    try {
        const booking = await Booking.create({
            room_id,
            bookedBy: req.user.id,
            checkIn,
            checkOut,
        });

        console.log(`Booking created ${booking}`);

        res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Could not create booking" });
    }
});

const generateBill = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role !== "admin") {
        res.status(403);
        throw new Error("You are not authorized to view this page !");
    }
    const { booking_id } = req.body;
    if (!booking_id) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const { Types } = mongoose;

    const bookingObjectId = Types.ObjectId(booking_id);

    const details = await Booking.aggregate([
        {
          $match: {
            _id: bookingObjectId
          }
        },
        {
          $lookup:
            {
              from: "rooms",
              localField: "room_id",
              foreignField: "_id",
              as: "room"
            }
        },
        {
          $unwind:
            {
              path: "$room"
            }
        },
        {
          $lookup:
            {
              from: "properties",
              localField: "room.property_id",
              foreignField: "_id",
              as: "property"
            }
        },
        {
          $unwind:
            {
              path: "$property"
            }
        }
      ]);

    if (details.length === 0) {
        res.status(404);
        throw new Error("Booking not found");
    }

    const booking = details[0];

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const bill = {
        property_name: booking.property.property_name,
        room_number: booking.room.roomNumber,
        checkIn: checkIn,
        checkOut: checkOut,
        total_days: days,
        total_amount: days * booking.room.roomPrice
    };

    res.status(200).json(bill);
});

module.exports = { bookRoom, generateBill };