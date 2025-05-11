import { Router } from "express";
import * as UserController from '../controllers/user_controller.js'; // Import the controller
import { AuthenticateToken } from '../middlewares/auth.js';

const userRoutes = Router();


userRoutes.post('/token', UserController.token);
userRoutes.post('/add_user', UserController.create_user);
userRoutes.post('/login_user', UserController.login_user);
userRoutes.put('/update_user/:id', UserController.update_user);
userRoutes.put('/update_user_password/:id', UserController.update_user_password);
userRoutes.get('/get_all_user', UserController.get_all_user);
userRoutes.get('/get_specific_user/:id', UserController.get_specific_user);
userRoutes.delete('/delete_user/:id', UserController.delete_user);



export default userRoutes;
