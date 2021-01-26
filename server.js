let mongoose = require("mongoose");
let express = require("express");
const connectDB = require("./database");
let app = express();
let port = 5000;
const Person = require("./models/person");
const food = "Banane";
const personId = "600f6b22d9f72f093c54c23e";
//connect to DB
connectDB();
//server
app.listen(port, (error) =>
  error
    ? console.log("error while the running of server", error)
    : console.log("sever is running...")
);
//insert person_1
app.post("/insert", (req, res) => {
  const person_1 = new Person({
    name: "Mohamed",
    age: 28,
    favoriteFoods: ["Chakchouka", "Couscous"],
  });

  person_1
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log("error while adding Ahmed", error));
});

//Create Many Records with model.create()
let arrayOfPeople = [
  { name: "Ahmed", age: 27, favoriteFoods: ["Banane", "Makloub"] },
  { name: "Ghofran", age: 20, favoriteFoods: ["Chips", "Sushi"] },
  { name: "Mohamed", age: 56, favoriteFoods: ["Melawi", "Pizza"] },
];
app.post("/insert_many", (req, res, next) => {
  Person.create(arrayOfPeople)
    .then((result) => res.send(result))
    .catch((error) => console.log("error while insert many", error));
});

//Use model.find() to Search Your Database
let nameToFind = "Mohamed";
app.get("/find", (req, res, next) => {
  Person.find({ name: nameToFind })
    .then((result) => res.send(result))
    .catch((error) => console.log("error on searching nameToFind", error));
});

//Use model.findOne() to Return a Single Matching Document from Your Database

app.get("/findOne", (req, res) => {
  Person.findOne({ favoriteFoods: food })
    .then((result) => res.send(result))
    .catch((error) => console.log("error while searching food", error));
});

//Use model.findById() to Search Your Database By _id

app.get("/personID", (req, res) => {
  Person.findById(personId)
    .then((result) => res.send(result))
    .catch((error) => console.log("error whith findById method", error));
});

//Perform Classic Updates by Running Find, Edit, then Save

app.get("/updatebyID", (req, res) => {
  Person.findById(personId)
    .then((personToupdate) => {
      personToupdate.favoriteFoods.push("humberger");
      personToupdate
        .save()
        .then((personupdated) => res.send(personupdated))
        .catch((error) => console.log("err save  personID", error));
    })
    .catch((error) => console.log("error while updateID", error));
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

const personName = "Ahmed";
app.get("/findOneAndUpdate", (req, res) => {
  Person.findOneAndUpdate({ name: personName }, { age: 77 }, { new: true })
    .then((result) => res.send(result))
    .catch((error) => console.log("error whith findoneandupdate", error));
});
//Delete One Document Using model.findByIdAndRemove
const personId2 = "600f6b22d9f72f093c54c23e";
app.get("/findByIdAndRemove", (req, res) => {
  Person.findByIdAndRemove(personId2)
    .then((result) => res.send(result))
    .catch((error) => console.log("error whith findbyIDand Remove", error));
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()

app.get("/deleteAllMary", (req, res) => {
  Person.remove({ name: "Mary" })
    .then((result) => res.send(result))
    .catch((error) => console.log("error whith delete all mary", error));
});

//Chain Search Query Helpers to Narrow Search Results
app.get("/burrito", (req, res) => {
  Person.find({ favoriteFoods: { $in: "burrito" } })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec()
    .then((result) => res.send(result))
    .catch((error) => console.log("error whith shearching burrito", error));
});
