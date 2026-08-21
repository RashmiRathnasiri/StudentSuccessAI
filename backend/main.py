from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# ============================================================
# STUDENT SUCCESS AI
# ============================================================

app = FastAPI(
    title="Student Success AI",
    description="AI-powered student success prediction and personalized academic advisor",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# STUDENT DATA
# ============================================================

class StudentData(BaseModel):

    attendance: float
    assignment: float
    quiz: float
    midterm: float
    study_hours: float
    previous_gpa: float
    participation: float


# ============================================================
# HOME
# ============================================================

@app.get("/")
def root():

    return {
        "message": "Student Success AI Backend is running!"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# ============================================================
# PREDICTION
# ============================================================

@app.post("/predict")
def predict_student(data: StudentData):

    # ========================================================
    # GPA CONVERSION
    # GPA / 10 × 100
    # ========================================================

    gpa_percentage = (data.previous_gpa / 10) * 100


    # ========================================================
    # ADD ALL 7 VALUES
    # ========================================================

    total_score = (
        data.attendance
        + data.assignment
        + data.quiz
        + data.midterm
        + data.study_hours
        + gpa_percentage
        + data.participation
    )


    # ========================================================
    # FINAL SCORE
    # TOTAL / 700 × 100
    # ========================================================

    prediction = (total_score / 700) * 100

    prediction = max(0, min(100, prediction))

    prediction = round(prediction, 2)


    # ========================================================
    # SUCCESS STATUS + RISK
    # ========================================================

    if prediction >= 75:

        status = "High Success Probability"
        risk = "Low Risk"

    elif prediction >= 50:

        status = "Moderate Success Probability"
        risk = "Medium Risk"

    else:

        status = "Low Success Probability"
        risk = "High Risk"


    # ========================================================
    # EXPLAINABLE AI
    # ========================================================

    explanations = []


    # ========================================================
    # ATTENDANCE
    # ========================================================

    if data.attendance >= 85:

        explanations.append({
            "factor": "Attendance",
            "impact": "Positive",
            "message":
                "Your strong attendance is positively supporting your predicted score."
        })

    elif data.attendance >= 75:

        explanations.append({
            "factor": "Attendance",
            "impact": "Moderate",
            "message":
                "Your attendance is supporting your prediction, but further improvement could help."
        })

    else:

        explanations.append({
            "factor": "Attendance",
            "impact": "Negative",
            "message":
                "Low attendance is negatively affecting your predicted academic performance."
        })


    # ========================================================
    # ASSIGNMENT
    # ========================================================

    if data.assignment >= 85:

        explanations.append({
            "factor": "Assignment",
            "impact": "Positive",
            "message":
                "Your strong assignment performance is positively supporting your prediction."
        })

    elif data.assignment >= 70:

        explanations.append({
            "factor": "Assignment",
            "impact": "Moderate",
            "message":
                "Your assignment performance is moderate and could be improved further."
        })

    else:

        explanations.append({
            "factor": "Assignment",
            "impact": "Negative",
            "message":
                "Low assignment performance is reducing your predicted score."
        })


    # ========================================================
    # QUIZ
    # ========================================================

    if data.quiz >= 85:

        explanations.append({
            "factor": "Quiz",
            "impact": "Positive",
            "message":
                "Your strong quiz performance is positively contributing to your prediction."
        })

    elif data.quiz >= 70:

        explanations.append({
            "factor": "Quiz",
            "impact": "Moderate",
            "message":
                "Your quiz performance has a moderate effect on your predicted score."
        })

    else:

        explanations.append({
            "factor": "Quiz",
            "impact": "Negative",
            "message":
                "Your quiz performance is below the recommended level and is affecting your prediction."
        })


    # ========================================================
    # MIDTERM
    # ========================================================

    if data.midterm >= 85:

        explanations.append({
            "factor": "Midterm",
            "impact": "Positive",
            "message":
                "Your strong midterm performance is positively supporting your predicted score."
        })

    elif data.midterm >= 70:

        explanations.append({
            "factor": "Midterm",
            "impact": "Moderate",
            "message":
                "Your midterm performance has a moderate effect on the prediction."
        })

    else:

        explanations.append({
            "factor": "Midterm",
            "impact": "Negative",
            "message":
                "Your midterm performance is reducing your predicted academic outcome."
        })


    # ========================================================
    # STUDY HOURS
    # ========================================================

    if data.study_hours >= 10:

        explanations.append({
            "factor": "Study Hours",
            "impact": "Positive",
            "message":
                "Your strong study routine is positively supporting your prediction."
        })

    elif data.study_hours >= 5:

        explanations.append({
            "factor": "Study Hours",
            "impact": "Moderate",
            "message":
                "Your study time is reasonable, but additional focused study could improve your result."
        })

    else:

        explanations.append({
            "factor": "Study Hours",
            "impact": "Negative",
            "message":
                "Low study time may be limiting your predicted academic performance."
        })


    # ========================================================
    # PREVIOUS GPA
    # ========================================================

    if data.previous_gpa >= 3.2:

        explanations.append({
            "factor": "Previous GPA",
            "impact": "Positive",
            "message":
                "Your strong previous GPA is positively supporting your prediction."
        })

    elif data.previous_gpa >= 2.5:

        explanations.append({
            "factor": "Previous GPA",
            "impact": "Moderate",
            "message":
                "Your previous GPA provides a moderate contribution to your prediction."
        })

    else:

        explanations.append({
            "factor": "Previous GPA",
            "impact": "Negative",
            "message":
                "Your previous GPA indicates an area that could be improved for stronger future performance."
        })


    # ========================================================
    # PARTICIPATION
    # ========================================================

    if data.participation >= 85:

        explanations.append({
            "factor": "Participation",
            "impact": "Positive",
            "message":
                "Your active classroom participation is positively supporting your prediction."
        })

    elif data.participation >= 70:

        explanations.append({
            "factor": "Participation",
            "impact": "Moderate",
            "message":
                "Your classroom participation is moderate and could be improved."
        })

    else:

        explanations.append({
            "factor": "Participation",
            "impact": "Negative",
            "message":
                "Low classroom participation is affecting your predicted academic performance."
        })


    # ========================================================
    # RECOMMENDATIONS
    # ========================================================

    recommendations = []


    # Attendance
    if data.attendance < 75:

        recommendations.append(
            "Improve class attendance to at least 75%."
        )

    elif data.attendance < 85:

        recommendations.append(
            "Try to increase attendance above 85%."
        )

    else:

        recommendations.append(
            "Maintain your strong attendance."
        )


    # Assignment
    if data.assignment < 70:

        recommendations.append(
            "Focus more on completing and improving assignments."
        )

    elif data.assignment < 85:

        recommendations.append(
            "Try to improve assignment performance above 85%."
        )

    else:

        recommendations.append(
            "Keep maintaining your strong assignment performance."
        )


    # Quiz
    if data.quiz < 70:

        recommendations.append(
            "Spend more time reviewing topics before quizzes."
        )

    elif data.quiz < 85:

        recommendations.append(
            "Improve quiz preparation to reach above 85%."
        )

    else:

        recommendations.append(
            "Excellent quiz performance. Keep it up."
        )


    # Midterm
    if data.midterm < 70:

        recommendations.append(
            "Create a focused study plan for upcoming exams."
        )

    elif data.midterm < 85:

        recommendations.append(
            "Continue revising regularly to improve exam performance."
        )

    else:

        recommendations.append(
            "Your exam performance is strong."
        )


    # Study Hours
    if data.study_hours < 5:

        recommendations.append(
            "Increase weekly study time to at least 5 hours."
        )

    elif data.study_hours < 10:

        recommendations.append(
            "Aim for around 10 focused study hours per week."
        )

    else:

        recommendations.append(
            "Your study time is excellent. Maintain this routine."
        )


    # GPA
    if data.previous_gpa < 2.5:

        recommendations.append(
            "Work on improving your GPA through consistent study."
        )

    elif data.previous_gpa < 3.2:

        recommendations.append(
            "Try to gradually increase your GPA above 3.2."
        )

    else:

        recommendations.append(
            "Your previous GPA shows strong academic progress."
        )


    # Participation
    if data.participation < 70:

        recommendations.append(
            "Participate more actively in classes and discussions."
        )

    elif data.participation < 85:

        recommendations.append(
            "Increase classroom participation."
        )

    else:

        recommendations.append(
            "Excellent classroom participation."
        )


    # ========================================================
    # RESPONSE
    # ========================================================

    return {

        "predicted_score": prediction,

        "status": status,

        "risk": risk,

        "explanations": explanations,

        "recommendations": recommendations,

        "message":
            "Student success score calculated successfully."

    }