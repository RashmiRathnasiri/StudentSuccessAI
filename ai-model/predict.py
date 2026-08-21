import joblib
import pandas as pd

# Load trained AI model
model = joblib.load("student_success_model.pkl")

# New student's data
student = pd.DataFrame([{
    "attendance": 88,
    "assignment": 82,
    "quiz": 80,
    "midterm": 85,
    "study_hours": 9,
    "previous_gpa": 3.4,
    "participation": 86
}])

# Predict final score
prediction = model.predict(student)[0]

# Keep score between 0 and 100
prediction = max(0, min(100, prediction))

print("===================================")
print("       STUDENT SUCCESS AI")
print("===================================")

print(f"Predicted Final Score: {prediction:.2f}")

if prediction >= 75:
    status = "High Success Probability"
elif prediction >= 50:
    status = "Moderate Success Probability"
else:
    status = "At Risk"

print(f"Student Status: {status}")

print("-----------------------------------")
print("AI prediction completed!")