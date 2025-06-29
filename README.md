# TMS - Task Management System

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## About

TMS (Task Management System) is a full-stack web application that enables users to create, manage, and track tasks efficiently. The system includes real-time updates via WebSockets for task organization.

## Features

- User authentication (JWT-based)
- Task creation, assignment, and tracking
- Real-time updates using Socket.io
- Responsive UI built with Material-UI
- Secure API endpoints

## Tech Stack

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io for real-time communication

**Frontend:**

- React.js
- Redux Toolkit
- RTK Query
- Material-UI
- React Router
- WebSockets with socket.io-client

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 16.x)
- **Yarn** or npm
- MongoDB (Local or Cloud-based, e.g., MongoDB Atlas)

### Clone the Repository

```sh
git clone https://gitlab.com/kannanravindran.work/tms.git
cd tms
```

### Install Backend Dependencies

```sh
cd server
yarn install  # or npm install
```

### Install Frontend Dependencies

```sh
cd client
yarn install  # or npm install
```

## Environment Variables

Create a `.env` file in the `server/` directory and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Usage

### Run the Backend Server

```sh
cd server
yarn dev  # or npm run dev
```

### Run the Frontend

```sh
cd client
yarn start  # or npm start
```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License.

