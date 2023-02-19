const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task: { type: String, required: true, unique:true },
    status: { type: Boolean, default: false }
}, {
    versionKey: false
})


const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel }