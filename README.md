# Car Rental System API

## Overview

The Car Rental System API allows users to manage car rentals, including booking, returning, and tracking cars. This API is designed to be a backend service for a car rental application, providing endpoints for CRUD operations on cars, customers, rentals, and more.

## Features

- **Car Management**: Add, update, delete, and list available cars.
- **Customer Management**: Register new customers.
- **Authentication**: Secure endpoints with user authentication.

## Technologies Used

- **Backend Framework**: Express.js 
- **Database**: PostgreSQL 
- **Authentication**: JWT (JSON Web Token)
- **Documentation**: Postman

## Installation

### Prerequisites

- Node.js 
- PostgreSQL 
- Git

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SarvariHarshitha/car-rental-api.git
    cd car-rental-api
    ```

2. **Install dependencies:**

      ```bash
      npm install
      ```

4. **Configure environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    DATABASE_URL=your_database_url
    JWT_SECRET=your_secret_key
    ```

5. **Set up the database:**

      ```bash
      npx prisma migrate dev
      ```

6. **Run the application:**

      ```bash
      npm start
      ```

## API Endpoints

### Authentication

- **POST /api/signup**: Register a new user.
- **POST /api/login**: Log in a user and retrieve a JWT.

### Cars
- **POST /api/cars/create**: Add a new car.
- **GET /api/car/get-rides?origin={origin}&destination={dest}&category={cat}&required_hours={rh}**: Get details of a cars for the given information of rides.
- **POST /api/car/rent**: Rent a car.
- **POST  /api/car/update-rent-history**: Update Rent History



## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any feature additions or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this template based on your specific implementation and requirements.
