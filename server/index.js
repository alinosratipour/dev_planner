const express = require('express');
const app = express();
const core = require('cors');
const router = require('./routes/jwtAuth');

app.use(express.json()); // req.body
app.use(core());


// Dashboard Route
app.use("/dashboard", require('./routes/dashboard'));


// register and login routes
app.use("/auth", require("./routes/jwtAuth"));


app.listen(5000, () =>{
    console.log('server running at port 5000');
});