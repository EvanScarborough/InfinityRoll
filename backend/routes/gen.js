const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();

const GenList = require("../models/GenList");
const GenItem = require("../models/GenItem");
const auth = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");


/**
 * /api/gen/
 * Returns a list of generator groups to be displayed on the main generator page.
 * If the user is logged in, then this will return all of the generators they created
 * as well as all the generators they liked.
 * This also returns 3 randomly selected generators just for random fun.
 * If there is a search query, then it will instead return search results.
 */
router.get("/", optionalAuth, async (req, res) => {
    // check if there is a search query
    searchTerm = req.query.search;
    if (searchTerm) {
        // if there is, query the text index in the database and return the results
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

/**
 * /api/gen/{generator name}
 * Returns all info about a specific generator including both the info about the list
 * and all of the list items
 */
router.get("/:name", async(req, res) => {
    let genlist = await GenList.findOne({ unique_name: req.params.name }).populate('createdBy', 'username');
    let genitems = await GenItem.find({ listName: req.params.name }).sort('createdAt').populate('createdBy', 'username');
    return res.status(200).json({ list:genlist, items:genitems });
});


/**
 * /api/gen/create
 * Create a new generator. 
 */
router.post("/create", auth,
    [
        check("name", "Please enter a valid name").not().isEmpty()
    ],
    async (req, res) => {
        // check validation errors (no name supplied)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                errors: errors.array()
            });
        }
        
        const { name, description, tags } = req.body;
        // create the unique_name. This is just an all lowercase version of the name with '_' instead of ' '
        const unique_name = name.toLowerCase().replace(/ /g, "_");

        // validate the unique_name to make sure it is only letters, numbers, and underscores and doesn't start with a number
        const regex = /[^a-z0-9\_]/g;
        if (regex.test(unique_name)) {
            return req.status(400).json({message:"Name can only contain letters, numbers, spaces, and underscores"});
        }
        if ((unique_name.charAt(0) >= '0' && unique_name.charAt(0) <= '9') || unique_name.charAt(0) === '_') {
            return req.status(400).json({message:"Name must start with a letter"});
        }

        try {
            // check if that name already exists
            let genlist = await GenList.findOne({ unique_name });
            if (genlist) return res.status(400).json({ message: "There is already a generator with that name!" });

            // if not, create the new generator and save it
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
    }
);

/**
 * /api/gen/{generator name}/like
 * Like or unlike a generator. It just toggles back and forth and returns the new list of upvotes.
 * Make sure to maintain the upvoteCount
 */
router.post("/:name/like", auth, async (req, res) => {
    try {
        // make sure the generator exists
        let genlist = await GenList.findOne({ unique_name: req.params.name });
        if (!genlist) return req.status(400).json({message: "There is no generator with that name!"});
        // determine whether the user already liked the generator
        const index = genlist.upvotes.indexOf(req.user.id);
        if (index > -1) {
            // the user already liked it, so remove from list
            genlist.upvotes.splice(index, 1);
            genlist.upvoteCount--;
        }
        else {
            // the user doesn't already like it, so add to list
            genlist.upvotes.push(req.user.id);
            genlist.upvoteCount++;
        }
        // save the generator
        await genlist.save();
        return res.status(200).json({message:"Success", upvotes:genlist.upvotes});
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server error"
        });
    }
});

/**
 * /auth/gen/{generator name}/item
 * Add an item to the generator list.
 */
router.post("/:name/item", auth, [
        check("item", "Please enter a valid item").not().isEmpty()
    ], async (req, res) => {
        // make sure the item is not empty
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                errors: errors.array()
            });
        }
        const { item } = req.body;
        try {
            // add the gen item. no need to check for duplicates or anything
            let genitem = new GenItem({
                listName: req.params.name,
                createdBy: req.user.id,
                text: item
            });
            // save the item
            await genitem.save();
            return res.status(200).json({message: "Successfully added a new item", item: genitem});
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

/**
 * /api/gen/{generator name}/item/{item id}
 * Delete {item id} from the generator
 */
router.delete("/:generator/item/:item", auth, async (req, res) => {
    try {
        const generator = req.params.generator;
        const item = req.params.item;
        let genItem = await GenItem.findById(item);
        if (genItem.createdBy._id != req.user.id) {
            return res.status(400).json({message: "You cannot delete another user's item"});
        }
        await genItem.delete();
        return res.status(200).json({message: "Successfully deleted item", item: item});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;