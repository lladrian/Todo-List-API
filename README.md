# API Todo List
 Develop a RESTful API to allow users to manage their to-do list


## Goals
 - The skills you will learn from this project include:
   - User authentication
   - Schema design and Databases
   - RESTful API design
   - CRUD operations
   - Error handling
   - Security

## Features
 - User registration to create a new user
 - Login endpoint to authenticate the user and generate a token
 - CRUD operations for managing the to-do list
 - Implement user authentication to allow only authorized users to access the to-do list
 - Implement error handling and security measures
 - Use a database to store the user and to-do list data (you can use any database of your choice)
 - Implement proper data validation
 - Implement pagination and filtering for the to-do list

## What I installed to this app

1. npm install express mongoose redis express-rate-limit dotenv nodemon
2. npm install moment-timezone bcrypt express-async-handler jsonwebtoken
3. Install testing tools :
   - npm install --save-dev jest supertest
   - npm install babel-jest @babel/core @babel/preset-env



## Installation

1. Make sure you have [Node.js](https://nodejs.org) installed.

2. Clone or download this project.

3. First you need to install using **`npm i`** in terminal.

4. To run use this command : **`npm i && npm start`**
    - Usage:  `http://localhost:4000/users/add_user`
      - Search via Web: 
          - ## USER
          - **POST** - **`http://localhost:4000/users/add_user`** to add new user.
          - **POST** - **`http://localhost:4000/users/login_user`** to login the user.
          - **PUT** - **`http://localhost:4000/users/update_user/:id`** to update the user.
          - **PUT** - **`http://localhost:4000/users/update_user_password/:id`**  to update the user password.
          - **GET** - **`http://localhost:4000/users/get_all_user`** to get all users.
          - **GET** - **`http://localhost:4000/users/get_specific_user/:id`** to get the specific user.
          - **DELETE** - **`http://localhost:4000/users/delete_user/:id`** to delete the user.
          - **POST** - **`http://localhost:4000/users/token/`** to get the untokenized data from the user.

          - ## TODO LIST
          - **GET** - **`http://localhost:4000/todos/get_specific_todo_list/:id`** to get specific todo list.
          - **GET** - **`http://localhost:4000/todos/get_all_todo_list`** to get all todo lists.
          - **POST** - **`http://localhost:4000/todos/add_todo_list`** to add new todo list.
          - **PUT** - **`http://localhost:4000/todos/update_todo_list/:id/`** to update the todo list.
          - **DELETE** - **`http://localhost:4000/todos/delete_todo_list/:id`** to delete the todo list.

5. https://roadmap.sh/projects/todo-list-api


