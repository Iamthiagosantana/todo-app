# todo-app

# Introduction:

Welcome to the documentation for my to-do list application. 
This user-friendly application simplifies the organizination and management of your tasks.
This documentation will guide you through setting up, running and using the application.

# Functionality:

The application sends requests to the server when users log in, log off, or register, and whenever a task is added, changed or deleted.
It uses JSON Web Tokens and Cookies to verify if the user is authenticated before proceeding with the requests.
The passwords are hashed and compared using BCrypt.
The MongoDB Cloud database is accessed through Mongoose.

# Tests (Only available through the online access to the application):

A few users publicly available to understand how the application works:

-  Username: TestUser1

   Password: TestUser1

-  Username: TestUser2

   Password: TestUser2


# Setting up the Development Environment:

To set up the development environment, follow those steps:

- [ ] Clone the repository:
```git clone https://github.com/Iamthiagosantana/todo-app.git```

- [ ] Move to the repository directory:
```cd todo-app```

## Setting up the Frontend:

- [ ] Move to the frontend-todo-app directory:
```cd frontend-todo-app```

- [ ] Create a .env file, and add the desired server URL:
```REACT_APP_SERVER_URL=desired_url```

- [ ] Build the application:
```npm run build```

## Setting up the Backend:

- [ ] Move to the server-todo-app directory:
```cd server-todo-app```
- [ ] In the server-todo-app directory, configure the following in the .env file:
  - JSON Web Token secret key,
  - MongoDB connection string, 
  - PORT (Default is 4000), 
  - HTTPS Configuration (true or false)

  Example:
  ```
  PORT=3000
  IS_HTTPS=false
  MONGODB_URL='mongodb://localhost:27017/todo-app'
  SECRET='jforgkpo314139410dkdowqd12312'
  ```

  Please note that if you are using the local machine to host the application (i.e. localhost), set IS_HTTPS to false. Localhost uses HTTP, not HTTPS.

- [ ] Build the server application:
```npm i```

# Executing the Application:

## Online Access:

[To-Do List App](https://thiagosantana-todo-app.onrender.com/)

## Local Execution:

### Frontend:

- Execute the application in a new terminal:
```npm run start```

### Backend:

- Execute the application in a new terminal:
    - Development Execution:
      ```npm run dev```
    - Production Execution:
      ```npm run start```

# Interacting with the Application:

- Guide for Authentication:
  
  The username should be unique and 6-20 characters long, only numbers and letters are allowed.
  
  The password should be 8-20 characters long, only numbers and letters are allowed.
  
- Guide for Tasks:

  Tasks should be 1-49 characters long.
  
  Click the check button to complete or uncomplete the task.

  Click the trash button to delete the task.

  Click the edit button to enable or disable editing.

  
