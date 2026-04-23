# ABGS
Building an experimental ML system that happens to be accessible through a browser


🧠 ABGS | Adaptive Behavior Goal System | 

An AI-powered habit tracking platform that predicts user dropout risk and provides adaptive behavioral insights.

🚀 Overview

Most habit tracking applications are reactive — they show past progress but fail to anticipate future failure.

ABGS (Adaptive Behavior Goal System) addresses this gap by combining:

Behavioral data collection
Machine learning prediction
Real-time user feedback

The system analyzes user engagement patterns and predicts the likelihood of habit dropout before it happens, enabling proactive intervention.

🧩 Key Features
✅ Daily Check-In System
Users log completed habits through a clean, interactive interface.
📊 Behavior Tracking Dashboard
Displays streaks, progress, and weekly trends.
🤖 Machine Learning Prediction
A trained model analyzes behavioral features to estimate dropout probability.
⚠️ Risk Classification
Users are categorized into Low, Medium, or High risk levels.
💡 Adaptive Insights Panel
Provides recommendations based on predicted user behavior.
🏗️ System Architecture
Frontend (React)
        ↓
API Layer (Axios)
        ↓
Backend (FastAPI)
        ↓
ML Model (Random Forest)
        ↓
Prediction Output → UI Dashboard
🧠 Machine Learning Model
Model Type: Random Forest Classifier
Training Data: Simulated user habit behavior dataset
Output:
Dropout probability (0–1)
Risk level classification (Low / Medium / High)
Features Used:
streak_length
missed_days_last_7
checkin_hour_avg
engagement_freq
days_since_last
goal_age_days
🖥️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Recharts
Axios
Backend
FastAPI
Python
Machine Learning
Scikit-learn
Pandas
NumPy
Joblib
📂 Project Structure
ABGS/
├── app/                # FastAPI backend
│   └── main.py
├── ml/                 # ML model + training
│   ├── predict.py
│   ├── train.py
│   └── models/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
├── data/               # Dataset
└── README.md
⚙️ Setup Instructions
1. Backend
cd ABGS
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Run the server:

uvicorn app.main:app --reload
2. Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔌 API Endpoints
POST /predict

Returns ML prediction.

Request:

{
  "streak_length": 7,
  "missed_days_last_7": 2,
  "checkin_hour_avg": 18,
  "engagement_freq": 0.65,
  "days_since_last": 1,
  "goal_age_days": 30
}

Response:

{
  "dropout_probability": 0.62,
  "risk_level": "medium"
}
🎥 Demo Flow
User completes daily check-in
Behavioral data is captured
Data is sent to backend API
ML model predicts dropout risk
Dashboard displays:
Risk badge
Probability
Adaptive insight
🧪 Future Improvements
Real-time data persistence (database integration)
LLM-powered personalized coaching
User authentication and profiles
Mobile responsiveness and deployment
🎓 Academic Context

This project was developed as a Capstone Project for Applied AI, demonstrating:

Full-stack development
Machine learning integration
Human-centered UX design
Data-driven decision systems
👤 Author

Juan Pulido
Applied AI
Miami Dade College