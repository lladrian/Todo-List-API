import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
import { generateAccessToken, verifyAccessToken   } from '../utils/token.js';
import User from '../models/users.js';


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


function hashConverterMD5(password) {
    return crypto.createHash('md5').update(String(password)).digest('hex');
}



export const token = asyncHandler(async (req, res) => {
    const { token } = req.body;
   
    if (!token) return res.status(401).json({ message: 'Missing refresh token' });
    
    try {
        const payload = verifyAccessToken(token);
        const user = await User.findById(payload.user._id);
        
        if (!user || user.token !== token) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
       
        return res.json({ user });
    } catch {
        return res.status(500).json({ error: 'Invalid refresh token' });
    }
});

export const create_user = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields (email, password, contact_number)." });
        }

        if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists' });

        const hash_password = hashConverterMD5(password);
   
        const newUser = new User({
            name: name,
            password: hash_password,
            email: email,
            created_at: storeCurrentDate(0, 'hours'),
        });

        await newUser.save();

        return res.status(200).json({ message: 'Account successfully created.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create admin entry' });
    }
});


export const get_all_user = asyncHandler(async (req, res) => {    
    try {
        //const users = await User.find();
        //const users = (await User.find({}, 'name email password created_at ').lean()).map(user => ({
        const users = (await User.find().lean()).map(user => ({...user, created_at: user.created_at.toISOString().split('T')[0]}));

        return res.status(200).json({ data: users });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get all users.' });
    }
});

export const get_specific_user = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the meal ID from the request parameters

    try {
        const user = await User.findById(id).lean();
   
        //user.created_at = user.created_at.toISOString().split('T')[0];

        res.status(200).json({ data: user });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get specific user.' });
    }
});


export const login_user = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

    try {
        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Find the user by email
        let user = await User.findOne({ email: email }); // Don't use .lean() here
        const hash = hashConverterMD5(password);
        // Check if the admin exists and if the password is correct
        if (user && user.password == hash) {
            const token = generateAccessToken(user);

            user.token = token;
            await user.save();

            return res.status(200).json({ token: token });
        }

        return res.status(400).json({ message: 'Wrong email or password.'});
    } catch (error) {
        return res.status(500).json({ error: 'Failed to login ' });
    }
});


export const update_user = asyncHandler(async (req, res) => {    
    const { id } = req.params; // Get the meal ID from the request parameters
    const { email, name } = req.body;

    try {
        if (!email || !name) {
            return res.status(400).json({ message: "All fields are required: email and name." });
        }

        const updatedAdmin = await User.findByIdAndUpdate(
        id, 
        { email : email, name : name }, // Fields to update
        { new: true, runValidators: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ data: 'Account successfully updated.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update account.' });
    }
});

export const update_user_password = asyncHandler(async (req, res) => {    
    const { id } = req.params; // Get the meal ID from the request parameters
    const { password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: "All fields are required: password." });
        }
        const hash = hashConverterMD5(password);

        const updatedUser = await User.findByIdAndUpdate(
        id, 
        { password : hash }, // Fields to update
        { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ data: 'Account password successfully updated.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update password account.' });
    }
});


export const delete_user = asyncHandler(async (req, res) => {    
    const { id } = req.params; // Get the meal ID from the request parameters

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ data: 'Account successfully deleted.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete account.' });
    }
});