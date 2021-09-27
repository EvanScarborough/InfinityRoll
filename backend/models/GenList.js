const mongoose = require("mongoose");

const GenListSchema = mongoose.Schema({
    unique_name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        index: true
    },
    tags: {
        type: [String],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    locked: {
        type: Boolean,
        default: false
    },
    hidden: {
        type: Boolean,
        default: false
    },
    allowEdit: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    allowView: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    upvoteCount: {
        type: Number,
        default: 0
    }
});

GenListSchema.index({'name': 'text', 'unique_name': 'text', 'description': 'text'});

module.exports = mongoose.model("GenList", GenListSchema);