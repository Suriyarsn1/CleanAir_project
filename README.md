Clean Air Healthcare - Lung Cancer Prediction System


Tech Stack

Frontend: React.js (Vite) + Tailwind CSS

Backend: Node.js + Express.js

Authentication: JWT for Users and Admin

Machine Learning: Python (Flask API)

Database: MongoDB

Email Verification: SMTP with OTP

Environment Configuration: .env file for secrets and API keys

Project Overview
Clean Air Healthcare is a lung cancer prediction platform that allows users to assess their lung cancer risk via a machine learning model. Admins have complete visibility and control over users, predictions, and static content.

User Flow
Sign In / Register

If the user doesn’t have an account, click "Don't have account?" to register.

During registration, the user must enter a valid email and verify it using OTP sent via email.

Once verified, the user can log in.

Cancer Prediction

After login, click the "Try Prediction" button.

A prediction form opens with lung health-related questions.

Submit answers to receive the prediction result.

Users can make multiple predictions.

Users can view previous predictions in their dashboard.

Logout

Once done, click logout to exit securely.

Admin Flow
Admin Login

Admin credentials are predefined:

Username: Admin

Password: 12345

Role-based verification ensures only admin can access the admin dashboard.

Admin Dashboard Features

Update website content including images, healthcare center suggestions, and doctor suggestions (static/dynamic).

View all registered users and their prediction results (fetched dynamically from MongoDB).

Full access to content management.

Environment Configuration
All API URLs, email credentials, database URIs, and JWT secrets are stored using .env files in both frontend and backend.

Example:

env
Copy
Edit
# Backend .env
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email
SMTP_PASS=your_password
PYTHON_API_URL=http://127.0.0.1:6000

# Frontend .env
VITE_BACKEND_URL=http://localhost:5000
Run Instructions
Backend (Node.js + Express.js)
bash
Copy
Edit
cd backend
npm install
npm run dev
Runs on: http://localhost:5000

Frontend (React + Vite + Tailwind CSS)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

Python ML API (Flask)
bash
Copy
Edit
cd python-ML
pip install flask pandas numpy scikit-learn joblib
python api.py
Runs on: http://127.0.0.1:6000

Database
All user data, cancer prediction results, and admin-edited content are stored and retrieved from MongoDB. Predictions are saved automatically and available for review in the user dashboard.
