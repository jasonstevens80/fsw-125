// File which handle all bounty related task
const express = require("express");
const bountyRouter = express.Router(); // my router variable to handle routes, when constructor is called it returns router variable
const { v4: uuidv4 } = require('uuid'); // My variable importing uuid

// Here is an array of bounty data for my server
const bounties = [
    {
      firstName: "Kylo",
      lastName: "Wren",
      living: "true",
      bountyAmount: 2000,
      type: "sith",
      _id: uuidv4(),
    },
    {
      firstName: "Luke",
      lastName: "Skywalker",
      living: "true",
      bountyAmount: 8000,
      type: "jedi",
      _id: uuidv4(),
    },
    {
      firstName: "Lando",
      lastName: "Calrissian",
      living: "true",
      bountyAmount: 5000,
      type: "smuggler",
      _id: uuidv4(),
    },
    {
      firstName: "Wilhuff",
      lastName: "Tarkin",
      living: "True",
      bountyAmount: 10000,
      type: "admiral",
      _id: uuidv4(),
    },
  ];
  
// Routes

//Get  all request
bountyRouter.get("/", (req, res) => { // a route to get the data from array
  res.send(bounty);
});
//Get one request
bountyRouter.get("/:bountyId", (req, res, next) => {
    const bountyId = req.params.bountyId
    const foundBounty = bounty.find(bounty => bounty._id === bountyId)
    if(!foundBounty) {
      const error = new Error(`The bounty with id of ${thingId} NOT FOUND.`)
      res.status(500)
      return next(error)
    }
    res.status(500).send(foundBounty)
})
//Post request
bountyRouter.post("/", (req, res) => { // a route to post data to the array
  const newBounty = req.body; //to add an id to new objects added to array
  newBounty._id === uuidv4();
  bounty.push(newBounty);
  res.status(201).send(newBounty);
});
//Delete request
bountyRouter.delete("/:bountyId", (req, res) => {
const bountyId = req.params.bountyId // pulling & keeping track of Id 
const bountyIndex = bounty.findIndex(bounty => bounty._id === bountyId) //finding the index in the list
bounty.splice(bountyIndex, 1) // delete one item from list
res.send("Successfully deleted bounty!")
})
//Put request
bountyRouter.put("/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const updateObject = req.body
    const bountyIndex = bounty.findIndex(bounty => bounty._id === bountyId)
    const updatedBounty = Object.assign(bounty[bountyIndex], updateObject) 
    //First param is finding the object and second is what we'd like to replace it with merging both params
    res.status(201).send(updatedBounty)
})

module.exports = bountyRouter; // exporting variable to server to handle request