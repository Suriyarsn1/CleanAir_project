Clean Air Healthcare - Lung Cancer Prediction System
Tech Stack
Frontend: React.js (Vite) + Tailwind CSS

Backend: Node.js + Express.js

Machine Learning API: Python (Flask)

Database: MongoDB (Mongoose)

Authentication: JWT-based for User and Admin roles

Email Verification: OTP via SMTP (nodemailer)

Environment Configuration: .env for secrets & keys

Security: API instance, protected routes, role-based access

Project Overview
Clean Air Healthcare is a full-stack web application that uses a Machine Learning model to help predict the risk of lung cancer. It provides a secure, role-based system for users and admins, with features like OTP-based email verification, prediction history, and a dynamic admin dashboard.

Security Highlights
API Instance: Axios instance with token headers used in frontend to communicate securely with the backend.

Protected Endpoints:

JWT token required for all user and admin API routes.

Middleware ensures only authenticated users can access prediction routes.

Admin routes protected by role-based access (isAdmin check).

Ports Configuration
Frontend (Vite): http://localhost:5173

Backend (Express): http://localhost:5000

Python ML API (Flask): http://127.0.0.1:6000

User Flow
Sign In / Register

Click "Don't have an account?" to register.

Enter a valid email to receive OTP and complete registration.

Use credentials to log in after verification.

Cancer Prediction

Click on "Try Prediction".

Answer lung-health related questions in the form.

Submit to see your prediction result.

Option to make multiple predictions.

All previous predictions are saved and viewable when logged in.

Logout

User can securely log out to end the session.

Admin Flow
Admin Login

Admin credentials (predefined):

Username: Admin

Password: 12345

Role verification ensures only admin access.

Admin Dashboard Access

Change website images (static/dynamic).

Update healthcare center and doctor suggestions.

View all user details and their prediction records (fetched dynamically from MongoDB).

Admin has full access to all dashboard content and logic.

Environment Configuration
We use .env files to securely store all configuration and secrets.

Backend .env Example:
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email
SMTP_PASS=your_password
PYTHON_API_URL=http://127.0.0.1:6000
Frontend .env Example:
env
Copy
Edit
VITE_BACKEND_URL=http://localhost:5000
How to Run
1. Backend (Node.js + Express)
bash
Copy
Edit
cd backend
npm install
npm run dev
Runs on: http://localhost:5000

2. Frontend (React + Vite + Tailwind CSS)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

3. Python ML API (Flask)
bash
Copy
Edit
cd python-ML
pip install -r requirements.txt
python api.py
Runs on: http://127.0.0.1:6000

Database (MongoDB)
User data, login info, and cancer prediction results are stored in MongoDB.

Admin dashboard dynamically fetches data from the database.
