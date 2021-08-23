const express = require('express');
var cors = require('cors');
const path = require("path");
const app = express();

var user = require("./routes/user");
var gen = require("./routes/gen");

// Use the .env file
require('dotenv').config();
const port = process.env.PORT || 3000;

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/user", user);
app.use("/api/gen", gen);

// app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});