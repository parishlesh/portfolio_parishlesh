const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String, required: true }],
  icon: { type: String, required: true }
});

const Service = new model("service", serviceSchema);

module.exports = Service;
