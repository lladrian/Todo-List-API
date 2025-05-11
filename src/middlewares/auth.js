import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';


dotenv.config();

//const JWT_SECRET = process.env.JWT_SECRET; // Replace with your own secret key
const JWT_SECRET = 'test'; // Replace with your own secret key

export const AuthenticateToken = (req, res, next) => {
    //const token  = req.headers['x-jwt-token'];
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log(token)
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user; // Save user info in request
        next(); // Proceed to the next middleware or route handler
    });
};