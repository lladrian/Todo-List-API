import { Router } from "express";
import * as TodoListController from '../controllers/todo_list_controller.js'; // Import the controller
import { AuthenticateToken } from '../middlewares/auth.js';

const todoListRoutes = Router();


todoListRoutes.post('/add_todo_list', TodoListController.create_todo_list);
todoListRoutes.put('/update_todo_list/:id', TodoListController.update_todo_list);
todoListRoutes.get('/get_all_todo_list', TodoListController.get_all_todo_list);
todoListRoutes.get('/get_specific_todo_list/:id', TodoListController.get_specific_todo_list);
todoListRoutes.delete('/delete_todo_list/:id', TodoListController.delete_todo_list);


export default todoListRoutes;
