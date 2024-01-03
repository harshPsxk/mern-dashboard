# Dashboard for IoT

A comprehensive dashboard solution for visualizing and managing data from IoT devices.

## Getting Started

These instructions will guide you through setting up your own instance of the project for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB (using Docker for MongoDB deployment is recommended)
- npm (Node Package Manager)

### Installing

Follow these steps to set up your development environment:

#### Setting Up the Backend

1. Clone the repository.
2. Navigate to the root directory (where the backend is located).
3. Run `npm install` to install backend dependencies.

#### Setting Up MongoDB with Docker

1. Start a MongoDB instance using Docker.
2. In the `.env` file, replace `DB_URI='mongodb://localhost:27017'` with your MongoDB connection string.

#### Launching the Backend Server

1. From the root directory, run `node server.js` to start the backend server.
2. Open a separate terminal and execute `simulate.js` to simulate data input for the dashboard.

#### Setting Up the Frontend

1. Open a new terminal and navigate to the `client` directory within the root folder.
2. Run `npm install` to install frontend dependencies.
3. Start the React application by running `npm start`.

### User Registration Process

- Users select their company from a dropdown menu.
- Users are assigned permissions, which include:
  - `dashboard`
  - `alerts:list`
  - `alerts:manage`
  - `access-control:list`
  - `access-control:manage`

**Note:** 
- The `dashboard` permission is required for access to and signing in to the dashboard.
- After creating an alert, run `simulate.js` to mimic device data being sent.

### Security Note

- The `.env` file is included in the repository for simplicity, although it is generally not recommended for security reasons.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Authors

- **Harsh Pratap Singh** - *Initial work* - [harshPsxk](https://github.com/harshPsxk)
