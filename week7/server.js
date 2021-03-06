const express = require("express");
const morgan = require("morgan");
const app = express();

const nodePort = 9010
//https://www.cluemediator.com/how-to-enable-cors-in-node-js
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Middleware - A function that fires on the inbetween for every route
app.use(express.json()); // Looks for a request body, and turns it into "req.body"
app.use(morgan("dev")) // Logs request to the console
//Routes
app.use("/capitals", require("./routes/capitalRouter.js"))
// telling app to listen to port with callback function showing it is in fact working.
app.use((err, req, res, next) => {
  console.log(err)
  res.send({errMsg: err.message})
})
app.listen(nodePort, () => {
  console.log(`App is listening on port ${nodePort}!`);
});