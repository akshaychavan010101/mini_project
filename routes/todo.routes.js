const express = require("express");
const { TodoModel } = require("../model/todo.model");
const TodoRouter = express.Router();

TodoRouter.use(express.json());



TodoRouter.get("/todos", async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({ msg: "Error", Error: error.message });
    }
})

TodoRouter.post("/todos/add", async (req, res) => {
    try {
        const payload = req.body;
        const newTodo = await TodoModel(payload).save();
        res.status(201).send({ msg: "Todo created", newTodo });
    } catch (error) {
        res.status(500).send({ msg: "Error", Error: error.message });
    }
})

TodoRouter.delete("/todos/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await TodoModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "Todo deleted", deletedTodo });
    } catch (error) {
        res.status(500).send({ msg: "Error", Error: error.message });
    }
})

TodoRouter.patch("/todos/update/:id",async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTodo = await TodoModel.findOneAndUpdate({ _id: id } , req.body,{ returnOriginal: false });
        res.status(200).send({ msg: "Todo updated", updatedTodo });
    } catch (error) {
        res.status(500).send({ msg: "Error", Error: error.message });
    }
})



module.exports = { TodoRouter }