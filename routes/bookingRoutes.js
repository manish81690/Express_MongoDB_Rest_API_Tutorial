const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
    bookRoom,
    generateBill
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", validateToken, bookRoom);
router.get("/bill", validateToken, generateBill);

module.exports = router;
