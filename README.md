# RBAC Admin Dashboard

## Overview
The RBAC Admin Dashboard is a web application designed for managing users, roles, and permissions using React and Material-UI. It provides a user-friendly interface for administrators to efficiently manage user accounts and their associated roles and permissions, ensuring a secure and organized access control system.

## URL: https://rbac-vrv-kavin.netlify.app/
## Demo Credentials
For demonstration purposes, you can log in using the following credentials:
- **Email**: admin@gmail.com
- **Password**: 1234

## Features
- **User Management**: 
  - Add, edit, and delete users.
  - Search and filter users based on name, email, role, and status.
  - Perform bulk actions for activating, deactivating, and deleting multiple users at once.
  - View activity logs to track changes made to user accounts.

- **Role Management**: 
  - Create and manage roles.
  - Assign and manage permissions for each role.
  - Easily remove roles and their associated permissions.

- **Permission Management**: 
  - Assign specific permissions (Create, Read, Update, Delete) to roles.
  - View and modify permissions for each role in a straightforward manner.

## Setup Instructions
Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Set up the mock API**:
   - Create a file named `db.json` in the root of your project and populate it with the provided mock data for users and roles.
   - Add the following script to your `package.json` to run the mock API:
     ```json
     "server": "json-server --watch db.json --port 5000"
     ```

4. **Run the mock API**:
   In a terminal, run the following command to start the mock API:
   ```bash
   npm run server
   ```

5. **Start the development server**:
   In another terminal, run the following command to start the React development server:
   ```bash
   npm start
   ```

6. **Open the application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the RBAC Admin Dashboard.


## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework that provides pre-designed components.
- **React Router**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **json-server**: A simple way to create a REST API using a JSON file.
<<<<<<< HEAD
=======

>>>>>>> 09f194df45bd117ca7dc4c34b8ed67034ff923af
