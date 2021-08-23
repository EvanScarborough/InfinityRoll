const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const GenList = require("../models/genlist");
const GenItem = require("../models/genitem");
const auth = require("../middleware/auth");







module.exports = router;