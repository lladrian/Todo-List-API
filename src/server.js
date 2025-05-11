import express from 'express';
import { createClient } from 'redis';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import { AuthenticateToken } from './middlewares/auth.js';

import userRoutes from "./routes/user_route.js";
import todoListRoutes from "./routes/todo_list_route.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    keyGenerator: (req, res) => {
        // Get the IP address
        const ip = req.headers['x-forwarded-for'] || req.ip;
        return ip;
    }
});

// Create a Redis client
const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

app.use("/users", userRoutes);
app.use("/todos", AuthenticateToken, todoListRoutes);


connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Weather API is running on http://localhost:${port}`);
});

export default app;

