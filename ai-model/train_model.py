import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Load dataset
data = pd.read_csv("dataset.csv")

# Features
features = [
    "attendance",
    "assignment",
    "quiz",
    "midterm",
    "study_hours",
    "previous_gpa",
    "participation"
]

X = data[features]
y = data["final_score"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create AI model
model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Test model
predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("===================================")
print("   STUDENT SUCCESS AI MODEL")
print("===================================")

print(f"Mean Absolute Error: {mae:.2f}")
print(f"R2 Score: {r2:.2f}")

# Save model
joblib.dump(model, "student_success_model.pkl")

print("-----------------------------------")
print("AI model trained successfully!")
print("Model saved as:")
print("student_success_model.pkl")