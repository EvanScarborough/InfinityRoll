const mongoose = require("mongoose");

const GenItemSchema = mongoose.Schema({
    listName: {
        type: String,
        required: true,
        index: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    text: {
        type: String,
        required: true
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});


module.exports = mongoose.model("GenItem", GenItemSchema);