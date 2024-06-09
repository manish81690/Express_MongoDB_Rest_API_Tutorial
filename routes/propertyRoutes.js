const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
    registerProperty,
    getProperties,
    deleteProperty
} = require("../controllers/propertyController");

const router = express.Router();

router.post("/register", validateToken, registerProperty);

router.get("/get", validateToken, getProperties);

router.delete("/delete", validateToken, deleteProperty);

module.exports = router;
