const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const GenList = require("../models/genlist");
const GenItem = require("../models/genitem");
const auth = require("../middleware/auth");



router.get("/", async (req, res) => {
    searchTerm = req.query.search;

    if (searchTerm) {
        let genlists = await GenList.find({$text: {$search: searchTerm}}).populate('createdBy', 'username');
        return res.status(200).json({groups:[{title:"Search Results",lists:genlists}]});
    }
    let genlists = await GenList.find().populate('createdBy', 'username');
    return res.status(200).json({groups:[{title:"All",lists:genlists}]});
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