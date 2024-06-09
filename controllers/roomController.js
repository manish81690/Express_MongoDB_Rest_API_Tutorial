const asyncHandler = require("express-async-handler");
const Room = require('../models/roomModel');

const addRoom = asyncHandler(async (req, res) => {
    const { roomNumber, roomType, roomPrice, property_id } = req.body;
    console.log(req.body);
    if (!roomNumber || !roomType || !roomPrice || !property_id) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    try {
        const room = await Room.create({
            roomNumber,
            roomType,
            roomPrice,
            property_id,
        });

        console.log(`Room created ${room}`);

        res.status(201).json(room);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ error: "Could not create room" });
    }
});

module.exports = { addRoom };
