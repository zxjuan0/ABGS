# train_compare_models.py

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib

# ===============================
# CONFIG
# ===============================

DATASETS = {
    "200": r"C:\Users\juanc\OneDrive\Documents\Capstone Project\ABGS\data\habit_data_200.csv",
    "20k": r"C:\Users\juanc\OneDrive\Documents\Capstone Project\ABGS\data\habit_data_20k.csv",
    "200k": r"C:\Users\juanc\OneDrive\Documents\Capstone Project\ABGS\data\habit_data_200k.csv"
}

FEATURES = [
    "streak_length",
    "missed_days_last_7",
    "checkin_hour_avg",
    "engagement_freq",
    "days_since_last",
    "goal_age_days"
]

TARGET = "label"


# ===============================
# TRAIN + EVALUATE FUNCTION
# ===============================

def train_and_evaluate(name, path):
    print(f"\n===== {name.upper()} ROWS =====")

    # Load data
    df = pd.read_csv(path)

    X = df[FEATURES]
    y = df[TARGET]

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Predictions
    y_pred = model.predict(X_test)

    # Metrics
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)

    print(f"Accuracy:  {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1 Score:  {f1:.4f}")

    # Feature importance (optional but included)
    print("\nFeature Importance:")
    importances = model.feature_importances_
    for feat, val in zip(FEATURES, importances):
        print(f"{feat}: {val:.4f}")

    # Save model
    model_filename = f"model_{name}.pkl"
    joblib.dump(model, model_filename)
    print(f"\nSaved model as: {model_filename}")


# ===============================
# RUN ALL DATASETS
# ===============================

def main():
    for name, path in DATASETS.items():
        train_and_evaluate(name, path)


if __name__ == "__main__":
    main()