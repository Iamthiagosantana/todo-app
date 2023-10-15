const express = require("express");
const todosRouter = express.Router();
const jwt = require("jsonwebtoken");

const Todo = require("../models/Todo");
const cookieSettings = require("../cookieSettings");


const checkAuthentication = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        // The token does not exist, therefore the user should be sent back to the login page.
        return res.status(401).json({message: "Unauthorized.", redirectTo: '/login'})
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            // The token is invalid, therefore it should be cleared and the user should be sent back to the login page.
            return res.clearCookie("token", {secure: cookieSettings.secure, sameSite: "None"}).status(401).json({message: "Unauthorized.", redirectTo: '/login'})
        }
        req.user = user
    })

    next()
}

todosRouter.get("/", checkAuthentication, async (req, res) => {
    const { _id } = req.user

    try {
        const todos = await Todo.find({user: _id})

        res.status(200).json({ todos })
    }
    catch (err) {
        res.status(500).json({message: "Internal server error."})
    }
})

todosRouter.post("/", checkAuthentication, async (req, res) => {
    try {
        const { _id } = req.user

        const { name, completed } = req.body.todo

        const newTodo = new Todo({
            name,
            completed,
            user: _id
        });

        const savedTodo = await newTodo.save();

        res.status(200).json({ todo: savedTodo })
    }
    catch (err) {
        res.status(500).json({message: "Failed to add todo."})
    }
})

todosRouter.put("/:id", checkAuthentication, async (req, res) => {
    try {
        const userId = req.user._id
        const todoId = req.params.id
        const { name, completed } = req.body.todo

        const update = {
            name,
            completed
        }

        const result = await Todo.updateOne({ _id: todoId, user: userId }, {$set: update});

        if (result.n === 0) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.status(200).json({ message: "Todo updated successfully." });
    }
    catch (err) {
        res.status(500).json({message: "Failed to add todo."})
    }
})

todosRouter.delete("/:id", checkAuthentication, async (req, res) => {
    try {
        const userId = req.user._id;
        const todoId = req.params.id;

        const result = await Todo.deleteOne({ _id: todoId, user: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Todo not found." });
        }

        res.status(200).json({ message: "Todo deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete todo." });
    }
});

module.exports = todosRouter