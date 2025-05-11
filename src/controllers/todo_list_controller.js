import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
import db from '../config/db.js'; // Import the database connection
import TodoList from '../models/todo_lists.js';


//const JWT_SECRET = process.env.JWT_SECRET; // Replace with your own secret key
const JWT_SECRET = 'test'; // Replace with your own secret key


function storeCurrentDate(expirationAmount, expirationUnit) {
    // Get the current date and time in Asia/Manila timezone
    const currentDateTime = moment.tz("Asia/Manila");
    // Calculate the expiration date and time
    const expirationDateTime = currentDateTime.clone().add(expirationAmount, expirationUnit);

    // Format the current date and expiration date
    const formattedExpirationDateTime = expirationDateTime.format('YYYY-MM-DD');

    // Return both current and expiration date-time
    return formattedExpirationDateTime;

}


export const create_todo_list = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    
    try {
        // Check if all required fields are provided
        if (!title || !description) {
            return res.status(400).json({ message: "Please provide all fields (title, description)." });
        }

        const newTodoList = new TodoList({
            title: title,
            description: description,
            userId: req.user.user._id,
            created_at: storeCurrentDate(0, 'hours'),
        });

        await newTodoList.save();

        return res.status(200).json({ data: 'Todo list successfully created.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create todo list.' });
    }
});

export const get_all_todo_list = asyncHandler(async (req, res) => {    
    try {
        const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc', title } = req.query;
        const skip = (page - 1) * limit;

        const filter = { userId: req.user.user._id };
        if (title) filter.title = new RegExp(title, 'i');

        const [data, total] = await Promise.all([
            TodoList.find(filter)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(Number(limit)),
            TodoList.countDocuments(filter)
        ]);

        return res.status(200).json({ data, page: Number(page), limit: Number(limit), total });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get all todo lists.' });
    }
});




export const get_specific_todo_list = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the meal ID from the request parameters

    try {
        const todo = await TodoList.findOne({ _id: id, userId: req.user.user._id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        res.status(200).json({ data: todo });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get specific todo list.' });
    }
});



export const update_todo_list = asyncHandler(async (req, res) => {    
    const { id } = req.params; // Get the meal ID from the request parameters
    const { title, description } = req.body;

    try {
        const todo_list = await TodoList.findById(id);

        if (!todo_list || todo_list.userId.toString() !== req.user.user._id) {
            return res.status(403).json({ message: 'Forbidden' });
        }   

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required: title and description." });
        }

        todo_list.title = title;
        todo_list.description = description;
        await todo_list.save();

        return res.status(200).json({ data: todo_list });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update todo list.' });
    }
});


export const delete_todo_list = asyncHandler(async (req, res) => {    
    const { id } = req.params; // Get the meal ID from the request parameters

    try {
        const todo_list = await TodoList.findById(id);

        if (!todo_list || todo_list.userId.toString() !== req.user.user._id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await todo_list.deleteOne();

        return res.status(200).json({ data: 'Todo list successfully deleted.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete todo list.' });
    }
});


