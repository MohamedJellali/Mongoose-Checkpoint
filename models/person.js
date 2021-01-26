const mongoose = require("mongoose");

//creating the schema person

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: [String],
});

module.exports = mongoose.model("person", PersonSchema);
