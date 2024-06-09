const asyncHandler = require("express-async-handler");
const Property = require("../models/propertyModel");

const registerProperty = asyncHandler(async (req, res) => {
  const { name, location, contact } = req.body;
  if (!name || !location || !contact) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const property = await Property.create({
    property_name: name,
    location,
    contact,
    createdBy: req.user.id,
  });

  res.status(201).json(property);
});

const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ createdBy: req.user.id });
  res.status(200).json(properties);
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.body.id);
  if (property) {
    await property.remove();
    res.status(200).json({ message: "Property removed" });
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

module.exports = {
  registerProperty,
  getProperties,
  deleteProperty,
};
