<h1>Dashboard for IoT</h1>
A comprehensive dashboard solution for visualizing and managing data from IoT devices.

<h2>Getting Started</h2>
These instructions will guide you through setting up your instance of the project for development and testing purposes.

<h2>Prerequisites</h2>
Before you begin, ensure you have the following installed:

Node.js
MongoDB (using Docker for MongoDB deployment is recommended)
npm (Node Package Manager)
Installing
Follow these steps to set up your development environment:

Setting Up the Backend
Clone the repository.
Navigate to the root directory (where the backend is located).
Run npm install to install backend dependencies.
Setting Up MongoDB with Docker
Start a MongoDB instance using Docker.
In the .env file, replace DB_URI='mongodb://localhost:27017' with your MongoDB connection string.
Launching the Backend Server
From the root directory, run node server.js to start the backend server.
Open a separate terminal and execute simulate.js to simulate data input for the dashboard.
Setting Up the Frontend
Open a new terminal and navigate to the client directory within the root folder.
Run npm install to install frontend dependencies.
Start the React application by running npm start.
User Registration Process
Users select their company from a dropdown menu.
Users are assigned permissions, which include:
dashboard
alerts:list
alerts:manage
access-control:list
access-control:manage
Note:

The dashboard permission is required for access to and signing in to the dashboard.
After creating an alert, run simulate.js to mimic device data being sent.
Security Note
The .env file is included in the repository for simplicity, although it is generally not recommended for security reasons.
