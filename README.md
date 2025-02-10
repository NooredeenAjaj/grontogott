# Grönt o' Gott - Fullstack Web Project

## Introduction
This project attempts to rebuild the Grönt o' Gott restaurant using React, MySQL, and Node.js. The goal of the project is to understand and implement a fullstack web application with authentication, database integration, and testing. Through this project, I have deepened my knowledge of modern web development, including backend and frontend technologies as well as database management.

## Technologies
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcrypt
- **Testing**: Jest, supertest

## Features
- **User Authentication**: Registration, login, and logout with JWT-based authentication.
- **Database Management**: Storing user data and order details in MySQL.
- **Security**: Password hashing with bcrypt and secure token handling.
- **API Structure**: RESTful API with Express.js for managing users and orders.

## Installation and Configuration
Follow these steps to install and run the project locally:

### 1. Clone the repository
```sh
 git clone <git@github.com:NooredeenAjaj/grontogott.git>
 cd gront-o-gott
```

### 2. Install dependencies
```sh

cd grontogott
pip install -r requirements.txt
```


### 3. Environment Variables
Create a `.env` file in the backend directory and add:
```sh
 DB_HOST=your_host
 DB_USER=your_user
 DB_PASSWORD=your_password
 DB_NAME=your_database
 JWT_SECRET=your_secret_key
```

### 4. Start the backend
```sh
 npm start
```

### 5. Navigate to the frontend and start it
```sh
 cd frontend
 npm run dev
```



## What I Have Learned
Through this project, I have:
- Developed a complete fullstack application using React.js and Node.js.
- Implemented authentication with JWT and secure user management with bcrypt.
- Created and managed a MySQL database using Express.js and SQL queries.
- Learned how to structure RESTful APIs and handle HTTP requests.
- Used Jest and supertest to test backend logic and APIs.

## Future Development
- Implementation of a full order management system with receipt and payment integration.
- Improved UI/UX design and responsiveness.
- Enhanced security and API optimization.



