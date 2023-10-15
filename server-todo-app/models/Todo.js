const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("todos", todoSchema)