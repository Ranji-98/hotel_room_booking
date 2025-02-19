
# Hotel Booking API

## Overview
This is a RESTful API for a simple Hotel Booking System, built using Node.js, Express, and Sequelize (MySQL). The API allows users to:

- List all hotels with filtering by location
- Book rooms in a hotel
- View user bookings
- Modify bookings (check-in/check-out dates, number of rooms)
- Cancel bookings

## Technologies Used
- Node.js (v20+)
- Express.js (REST API framework)
- Sequelize (ORM for MySQL)
- MySQL (Relational database)
- dotenv (Environment variables)

---

## Project Structure
```
hotel_booking/
│── config/
│   ├── database.js     # Database connection setup
│── rest/
│   ├── hotel/
│   │   ├── model.js    # Hotel model
│   │   ├── controller.js  # Hotel business logic
│   │   ├── routes.js   # Hotel API routes
│   ├── booking/
│   │   ├── model.js    # Booking model
│   │   ├── controller.js  # Booking business logic
│   │   ├── routes.js   # Booking API routes
│── server.js           # Entry point
│── .env                # Environment variables
│── package.json        # Dependencies and scripts
│── README.md           # Documentation
```

---

## Installation & Setup
1. Clone the Repository

git clone https: https://github.com/Ranji-98/hotel_room_booking.git

2.Install Dependencies
npm install
```
### 3. Configure Environment Variables (.env)
Create a `.env` file in the root directory and add:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=my-secret-pw
DB_NAME=hotel_booking
PORT=3000

### 4.Start the Server
npm start


## API Endpoints

### Hotels Module
1. List All Hotels (with Location Filter)

URL:  http://localhost:3000/api/hotels?location=New York

Response:
[
    {
        "id": "24d16423-0810-490c-a7d7-d78468478d60",
        "name": "Luxury Inn",
        "location": "New York",
        "rooms_available": 8,
        "createdAt": "2025-02-19T11:08:07.000Z",
        "updatedAt": "2025-02-19T11:55:42.000Z"
    }
]

---

### 🔹 Booking Module
2. Create a Booking

URL: http://localhost:3000/api/bookings

Request Body:
{
    "hotel_id": "24d16423-0810-490c-a7d7-d78468478d60",
    "rooms_booked": 2,
    "check_in": "2024-02-20",
    "check_out": "2024-02-25"
}


Response:
{
    "message": "Booking successful",
    "booking": {
        "id": "b6532c86-f222-47f4-8242-ec8a54df6200",
        "user_id": "123e4567-e89b-12d3-a456-426614174000",
        "hotel_id": "24d16423-0810-490c-a7d7-d78468478d60",
        "rooms_booked": 2,
        "check_in": "2024-02-20T00:00:00.000Z",
        "check_out": "2024-02-25T00:00:00.000Z",
        "updatedAt": "2025-02-19T12:38:07.597Z",
        "createdAt": "2025-02-19T12:38:07.597Z"
    }
}

3.Get All Bookings for a User

URL: http://localhost:3000/api/bookings

Response:
[
    {
        "id": "b6532c86-f222-47f4-8242-ec8a54df6200",
        "user_id": "123e4567-e89b-12d3-a456-426614174000",
        "hotel_id": "24d16423-0810-490c-a7d7-d78468478d60",
        "rooms_booked": 2,
        "check_in": "2024-02-20T00:00:00.000Z",
        "check_out": "2024-02-25T00:00:00.000Z",
        "createdAt": "2025-02-19T12:38:07.000Z",
        "updatedAt": "2025-02-19T12:38:07.000Z"
    }
]

4. Modify a Booking

PUT /api/bookings/{bookingId}
URL: http://localhost:3000/api/bookings/b6532c86-f222-47f4-8242-ec8a54df6200

Request Body:
{
    "check_in": "2024-02-21",
    "check_out": "2024-02-26",
    "rooms_booked": 2
}


Response:
{
    "message": "Booking updated successfully",
    "booking": {
        "id": "b6532c86-f222-47f4-8242-ec8a54df6200",
        "user_id": "123e4567-e89b-12d3-a456-426614174000",
        "hotel_id": "24d16423-0810-490c-a7d7-d78468478d60",
        "rooms_booked": 2,
        "check_in": "2024-02-21T00:00:00.000Z",
        "check_out": "2024-02-26T00:00:00.000Z",
        "createdAt": "2025-02-19T12:38:07.000Z",
        "updatedAt": "2025-02-19T12:41:21.676Z"
    }
}

5.Cancel a Booking

DELETE /api/bookings/{bookingId}
URL: http://localhost:3000/api/bookings/b6532c86-f222-47f4-8242-ec8a54df6200

Response:
{
    "message": "Booking cancelled successfully"
}


I have attached the screenshot in the Screenshots folder for your reference.



