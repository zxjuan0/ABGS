ABGS | Adaptive Behavior Goal System

An AI-powered habit tracking platform that predicts user dropout risk and provides behavior-aware, interpretable insights.

Overview

Most habit tracking applications are reactive. They display past progress but fail to anticipate when users may disengage or explain why behaviors change.

ABGS (Adaptive Behavior Goal System) addresses this gap by combining synthetic behavioral data, machine learning prediction, and structured, habit-aware features.

The system not only predicts dropout risk, but connects predictions to specific behavioral patterns, allowing for more meaningful and actionable insights.

Experiment Goal

This project explores two core questions.

Does increasing dataset size improve model performance?

Does structured behavioral data improve interpretability?

To evaluate this, four models were trained and compared using synthetic datasets of increasing size and complexity.

Key Findings

Model performance improves significantly as dataset size increases, particularly when moving from small to large datasets.

However, performance gains begin to stabilize at higher scales.

The structured ABGS model achieves the strongest performance and, more importantly, provides behavior-specific insights rather than generic predictions.

More data improves performance, but better data structure improves understanding.

Key Features

Daily Check-In System
Users log completed habits through a clean, interactive interface.

Model Comparison Dashboard
Displays performance across four models using F1 score and evaluation metrics.

Machine Learning Prediction
Models analyze behavioral features to estimate dropout probability.

Risk Classification
Users are categorized into Low, Medium, or High risk levels.

Client A Simulation
A simulated user scenario demonstrates how models behave over time, including engagement trends and risk progression.

Adaptive Insights
Structured model outputs allow recommendations tied to specific habits and behaviors.

System Architecture

Frontend (React + Vite)
↓
API Layer (Axios)
↓
Backend (FastAPI)
↓
ML Models (Random Forest)
↓
Prediction Engine
↓
Dashboard Output

Machine Learning Model

Model Type: Random Forest Classifier
Training Data: Synthetic behavioral dataset

Models 1–3 use a shared feature set to evaluate the effect of dataset size on performance.

Model 4 (ABGS) introduces structured features, including habit type, activity context, difficulty level, and engagement patterns.

Output

Dropout probability (0–1)
Risk classification (Low / Medium / High)
(Model 4) Behavior-specific interpretation

Features Used

streak_length
missed_days_last_7
checkin_hour_avg
engagement_freq
days_since_last
goal_age_days

Key Insight

Increasing dataset size improves prediction performance, but does not fully explain user behavior.

The ABGS model introduces structured data that allows predictions to reflect how and why behaviors change, improving interpretability and usefulness.

Tech Stack

Frontend:
React (Vite)
Tailwind CSS
Recharts
Axios

Backend:
FastAPI
Python

Machine Learning:
Scikit-learn
Pandas
NumPy
Joblib

Deployment:
Vercel (Frontend)
Railway (Backend)

Project Structure

ABGS/
├── app/
├── ml/
│ ├── models/
│ ├── data/
│ └── train_all_models.py
├── frontend/
├── data/
└── README.md

Setup Instructions

Backend:

cd ABGS
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Run backend:

uvicorn app.main:app --reload

Frontend:

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

API Endpoints

POST /predict

POST /predict/client-a

Used for model comparison and Client A simulation.

Demo Flow

User completes daily check-in

Behavioral data is captured

Data is sent to backend API

Models generate predictions

Dashboard displays model comparison, risk classification, and behavioral insights

Simulation Note

All datasets used in this project are synthetic and were generated to simulate realistic habit-tracking behavior.

This allows controlled experimentation on dataset scaling, feature structure, and model interpretability.

Academic Context

This project was developed as a Capstone Project for Applied AI, demonstrating full-stack development, machine learning integration, and behavior-aware system design.

Author

Juan Pulido
Applied AI
Miami Dade College

Final Note

ABGS demonstrates how predictive systems can move beyond accuracy to become more interpretable and behavior-aware.

By combining structured data with machine learning, the system transforms risk prediction into a tool for understanding and improving user behavior.