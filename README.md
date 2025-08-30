# Coding-Factory-Final-Project
The final project for Coding Factory Seminar (October 2024-July 2025).
Project was developed in August 2025.

# Project Overview:
  A web application for an Eclass Platform where the Admin creates Classes and registers Students. The Students are then able to enroll in the Classes they want. The application offers basic CRUD operations to create a Student/Class, update a Student/Class, delete a Student/Class, and get a Student/Class or multiple. Students and Classes are saved in a NoSQL Database using MongoDB. The application supports JWT-based authentication.

# Tech Stack:
  - Frontend: Angular, Bootstrap
  - Backend: Nodejs
  - Database: MongoDB

# Prerequisites:
  ### Environment variables:
  - JWT_TOKEN: The secret key that will be used to sign and verify JSON Web Tokens. Should be kept secret and random.
  - MONGODB_URI: The connection string that will be used to connect the application to MongoDB. Example: MONGODB_URI=mongodb+srv://example_username:example_password@cluster0.dshzf.mongodb.net/school?retryWrites=true&w=majority

  ### Login Required:
   - The application requires a logged in user to showcase its operations. A user can login if they already exist on the Database, using their username and password.
   - Only the Admin User, who must have the "ADMIN" role, can perform critical actions, like creating Students/ Classes, updating Students/ Classes or deleting Students/Classes.
   - For testing purposes, an Admin user must be created in the Database, with the role "ADMIN" in their user roles. For example, create a document in MongoDB as: username: admin, password: admin_password, email: admin@aueb.gr, roles: ["ADMIN"]
   - The Admin can create the Students, who will later be able to login using their credentials.

# Instructions for Deployment (Local Deployment):

### Clone Repository:
```
 git clone https://github.com/despinamos/Coding-Factory-Final-Project.git
```

### Run local server (backend) on port 3000:
```
 cd nodejs-backend
 npm install
 npm run start
```

### Run Angular frontend (on a second terminal):
```
 cd angular-eclass-frontend
 npm install
 ng serve
```

To confirm the app is running, visit [localhost:4200](http://localhost:4200) on browser.

Swagger API documentation for the backend can be accessed on http://localhost:3000/api-docs/ .