const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const GenList = require("../models/genlist");
const GenItem = require("../models/genitem");
const auth = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");



router.get("/", optionalAuth, async (req, res) => {
    searchTerm = req.query.search;
    if (searchTerm) {
        let genlists = await GenList.find({$text: {$search: searchTerm}}).populate('createdBy', 'username');
        return res.status(200).json({groups:[{title:"Search Results",lists:genlists}]});
    }

    let groups = [];
    if (req.user) { // if you are logged in...
        // generators you created
        let mygen = await GenList.find({ createdBy: req.user.id }).populate('createdBy', 'username');
        if (mygen && mygen.length > 0) groups.push({title:"My Generators",lists:mygen});
        // liked
        let liked = await GenList.find({ upvotes: req.user.id }).populate('createdBy', 'username');
        if (liked && liked.length > 0) groups.push({title:"Liked",lists:liked});
    }

    // popular generators
    let popular = await GenList.find().sort({ "upvoteCount": -1 }).limit(6).populate('createdBy', 'username');
    groups.push({title:"Popular",lists:popular});

    // random generators
    let count = await GenList.countDocuments();
    let skips = [];
    let random = [];
    while (skips.length < 3) {
        const s = Math.floor(Math.random() * count);
        if (!skips.includes(s)) {
            skips.push(s);
            const gen = await GenList.findOne().skip(s).populate('createdBy', 'username');
            random.push(gen);
        }
    }
    groups.push({title:"Random",lists:random});

    return res.status(200).json({groups});
});

router.get("/:name", async(req, res) => {
    let genlist = await GenList.findOne({ unique_name: req.params.name }).populate('createdBy', 'username');
    let genitems = await GenItem.find({ listName: req.params.name }).sort('createdAt').populate('createdBy', 'username');
    return res.status(200).json({ list:genlist, items:genitems });
});



router.post("/create", auth,
    [
        check("name", "Please enter a valid name").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                errors: errors.array()
            });
        }
        
        const { name, description, tags } = req.body;
        const unique_name = name.toLowerCase().replace(/ /g, "_");

        const regex = /[^a-z0-9\_]/g;
        if (regex.test(unique_name)) {
            return req.status(400).json({message:"Name can only contain letters, numbers, spaces, and underscores"});
        }
        if ((unique_name.charAt(0) >= '0' && unique_name.charAt(0) <= '9') || unique_name.charAt(0) === '_') {
            return req.status(400).json({message:"Name must start with a letter"});
        }


        try {
            let genlist = await GenList.findOne({ unique_name });
            if (genlist) return res.status(400).json({ message: "There is already a generator with that name!" });

            genlist = new GenList({
                unique_name,
                name,
                description,
                tags,
                createdBy: req.user.id
            });

            await genlist.save();
            return res.status(200).json({message: "Successfully created a new generator", id: unique_name});
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server error"
            });
        }
    });

router.post("/:name/like", auth, async (req, res) => {
    try {
        let genlist = await GenList.findOne({ unique_name: req.params.name });
        if (!genlist) return req.status(400).json({message: "There is no generator with that name!"});
        const index = genlist.upvotes.indexOf(req.user.id);
        if (index > -1) {
            // remove from list
            genlist.upvotes.splice(index, 1);
            genlist.upvoteCount--;
        }
        else {
            // add to list
            genlist.upvotes.push(req.user.id);
            genlist.upvoteCount++;
        }
        await genlist.save();
        return res.status(200).json({message:"Success", upvotes:genlist.upvotes});
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server error"
        });
    }
});

router.post("/:name/item", auth, [
        check("item", "Please enter a valid item").not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                errors: errors.array()
            });
        }
        const { item } = req.body;

        try {
            let genitem = new GenItem({
                listName: req.params.name,
                createdBy: req.user.id,
                text: item
            });
            await genitem.save();
            return res.status(200).json({message: "Successfully added a new item", item: genitem});
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server error"
            });
        }
    });


module.exports = router;