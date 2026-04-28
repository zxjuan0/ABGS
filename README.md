# ABGS | Adaptive Behavior Goal System

ABGS is a full-stack habit tracking and machine learning system that predicts behavioral dropout risk and translates model outputs into interpretable, behavior-aware insights.

---

## Overview

Most habit tracking tools are reactive. They show past behavior but fail to anticipate when users may disengage or explain why behaviors change.

ABGS addresses this by combining synthetic behavioral data, machine learning prediction, and structured, habit-aware features.

The system not only predicts dropout risk, but connects predictions to specific behavioral patterns, allowing for more meaningful and actionable insights.

---

## Problem Statement

Predictive systems often prioritize accuracy without providing enough behavioral context to make predictions useful.

In habit tracking, this leads to outputs that indicate risk but fail to explain what changed, why it changed, or how to respond.

ABGS focuses on improving interpretability by linking predictions directly to behavioral signals and habit-specific context.

---

## Solution

ABGS introduces a structured prediction system that analyzes behavioral signals such as consistency, missed activity, engagement patterns, and recency.

Four models were trained and compared:

- Models 1–3 test the effect of increasing dataset size
- Model 4 introduces structured behavioral features

The ABGS model allows predictions to move beyond a simple risk label and instead reflect how and why behaviors change.

---

## Experiment Design

Four models were trained using synthetic datasets:

- Model 1: 200 records
- Model 2: 20,000 records
- Model 3: 200,000 records
- Model 4: Structured ABGS dataset

The experiment evaluates:

1. Whether dataset size improves model performance  
2. Whether structured data improves interpretability  

---

## Key Findings

Increasing dataset size improves prediction performance, especially from small to large datasets.

However, performance gains begin to stabilize at higher scales.

The structured ABGS model provides the strongest interpretability by connecting predictions to habit-specific context.

More data improves performance, but better data structure improves understanding.

---

## Key Features

Daily Check-In System  
Users log habits through a clean interface.

Model Comparison Dashboard  
Displays performance across four models using F1 score and evaluation metrics.

Dropout Risk Prediction  
Models estimate probability of disengagement and classify risk levels.

Client A Simulation  
A simulated user demonstrates how model predictions evolve over time.

Adaptive Insights  
Structured model outputs allow recommendations tied to specific behaviors.

---

## System Architecture

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

---

## Machine Learning Model

Model Type: Random Forest Classifier  
Training Data: Synthetic behavioral dataset  

Models 1–3 use a shared feature set to evaluate dataset scaling.

Model 4 introduces structured features:

- habit_type  
- activity_type  
- difficulty_level  
- pomodoro_sessions  
- pomodoro_completion_rate  

---

## Model Outputs

- Dropout probability  
- Risk classification (Low / Medium / High)  
- Activity-specific interpretation (Model 4)  

---

## Core Features Used

- streak_length  
- missed_days_last_7  
- checkin_hour_avg  
- engagement_freq  
- days_since_last  
- goal_age_days  

---

## Key Insight

Increasing dataset size improves performance, but does not fully explain behavior.

The ABGS model introduces structure that allows predictions to reflect how and why behaviors change.

---

## Tech Stack

Frontend  
React (Vite)  
Tailwind CSS  
Axios  

Backend  
FastAPI  
Python  

Machine Learning  
Scikit-learn  
Pandas  
NumPy  
Joblib  

Deployment  
Vercel (Frontend)  
Railway (Backend)  

---

## Project Structure

ABGS/  
├── backendABGS/  
│   ├── app/  
│   ├── ml/  
│   │   ├── data/  
│   │   ├── models/  
│   │   └── train_all_models.py  
│   └── requirements.txt  
├── frontend/  
│   ├── src/  
│   └── package.json  
└── README.md  

---

## Setup Instructions

Backend:

cd backendABGS  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  
python -m uvicorn app.main:app --reload  

Frontend:

cd frontend  
npm install  
npm run dev  

---

## API Endpoints

POST /predict  

POST /predict/client-a  

Used for model comparison and simulation.

---

## Demo Flow

User logs habits  
Data is captured  
Data is sent to backend  
Models generate predictions  
Dashboard displays results and insights  

---

## Simulation Note

All datasets are synthetic and generated to simulate realistic behavior patterns.

This allows controlled experimentation on dataset size, feature structure, and interpretability.

---

## Academic Context

This project was developed as an Applied AI Capstone, demonstrating full-stack development, machine learning experimentation, and behavior-aware system design.

---

## Author

Juan Pulido  
Applied AI  
Miami Dade College  

---

## Final Note

ABGS demonstrates how predictive systems can move beyond accuracy and become more interpretable.

By combining structured behavioral data with machine learning, the system transforms risk prediction into a tool for understanding and improving user behavior.