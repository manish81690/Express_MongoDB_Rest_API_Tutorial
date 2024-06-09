const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
    addRoom
} = require("../controllers/roomController");

const router = express.Router();

router.post("/add", validateToken, addRoom);


module.exports = router;
