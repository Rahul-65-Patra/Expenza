# Expenza (Expense Management System using MERN Stack)

#Project Description : 
The Expense Management System is a robust web-based application designed to help users efficiently track and manage their daily expenses. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), this scalable, responsive, and user-friendly system empowers individuals and organizations to gain insights into their financial habits and make informed decisions.

#Objectives:
1. Simplify expense tracking for individuals and organizations.

2. Provide detailed insights into spending patterns to enable better financial management.

3. Offer a platform for users to create, update, and delete expenses and categories.

4. Generate comprehensive reports based on user-defined time periods and categories.

#Features :

##User Authentication and Authorization

  1. Secure sign-up and login for personal accounts.

  2. Role-based access control for administrative tasks.

##Expense and Category Management

  1. Create, update, and delete expense entries and categories.

  2. Track expenses by date, category, and description.

  3. Attach receipts or relevant documents to expense entries.

##Dashboard and Reporting

 1. Visual dashboard displaying:

    a. Total expenses.

    b. Expenses by category.

    c. Recent transactions.

2. Generate reports based on selected date ranges and categories.

   a. Use pie charts and bar graphs for detailed insights into spending patterns.

##Responsive User Interface

 1. Clean, responsive design that works seamlessly across desktops, tablets, and mobile devices.

 2. Reusable UI components built with React.js.

 3. Background effects powered by the tsparticles library.


#Technical Architecture:

##Frontend:

Utilize React.js for building the user interface, tsparticle library for awesome background effect and used other libraries like unique-names-generator, react-datepicker, moment

Implement responsive design using CSS frameworks like Bootstrap and Material-Icons.

##Backend:

Use Node.js and Express.js to build a RESTful API for handling client requests and serving as the application's backend.

Implement authentication and authorization using JSON Web Tokens (JWT) and middleware to protect endpoints.

##Database:

Store all data, including user information, expense entries, and categories, in MongoDB, a NoSQL database.

Implement Mongoose ORM for schema definition and validation.

##Deployment:

Deploy the application to a cloud provider like AWS and render. frontend has deployed on AWS and backend on Render.

Set up Continuous Integration and Continuous Deployment (CI/CD) pipelines for automated builds and deployments.


#Run Locally

###Clone the project

  git clone https://github.com/Rahul-65-Patra/Expenza
  
###Go to the project directory

  cd Expenza
  
###Go to the frontend directory and Install dependencies

  cd frontend
  npm install
  
###Go to the backend directory and Install dependencies

  cd backend
  npm install
  
###Start the frontend server

  npm start
  
###Start the backend server

  npm run dev
  
#Environment Variables

To run this project, you will need to add the following environment variables to your .env file in backend folder

create config folder and add config.env file in it and all all env variables there.

MONGO_URL : Your MongoDB Connection String

PORT: PORT number

#Tech Stack
Client: React, Redux, react-bootstrap, Material Icons, tsparticles

Server: Node, Express

Database: MongoDB
