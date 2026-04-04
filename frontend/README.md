# Banking Management Dashboard

A full-stack banking application built using React (frontend) and Flask (backend).
This project simulates basic banking operations with a clean dashboard UI.

---

## Features

* Create Bank Account
* Deposit Money
* Withdraw Money
* Check Account Balance
* Transaction History
* Dashboard with Summary Cards
* Transaction Chart (Recharts)

---

## Tech Stack

Frontend:

* React.js
* CSS (Custom UI)
* Recharts (Charts)

Backend:

* Python (Flask)
* MySQL
* Flask-CORS
* Gunicorn (for deployment)

---

## Project Structure

banking-app/
│
├── backend/
│   ├── app.py
│   ├── db.py
│   ├── bank.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md

---

## How to Run Locally

### 1. Clone Repository

git clone https://github.com/amulyabashetty-source/bank-management-dashboard.git
cd bank-management-dashboard

---

### 2. Backend Setup

cd backend

Create virtual environment:

python -m venv venv

Activate:

Windows:
venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run server:

python app.py

Server runs on:
http://127.0.0.1:5000

---

### 3. Frontend Setup

cd frontend

Install dependencies:

npm install

Run app:

npm start

App runs on:
http://localhost:3000

---

## API Endpoints

* GET /transactions/<account_number>
* GET /balance/<account_number>
* POST /deposit
* POST /withdraw
* POST /create-account

---

## Screenshots

(Add your screenshots here)

---

## Deployment

Frontend:

* Vercel

Backend:

* Render

---

## Future Improvements

* User Authentication (Login / Signup)
* JWT Security
* Mobile Responsive UI Enhancements
* Payment Gateway Integration

---

## Author

Amulya Bashetty
GitHub: https://github.com/amulyabashetty-source

---

## Note

This is a learning project created to demonstrate full-stack development skills.
