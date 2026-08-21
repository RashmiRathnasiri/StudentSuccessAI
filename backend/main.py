from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Student Success AI",
    description="AI-powered student success prediction and personalized academic advisor",
    version="1.0.0"
)

# ==============================
# CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# STUDENT DATA
# ==============================

class StudentData(BaseModel):

    attendance: float
    assignment: float
    quiz: float
    midterm: float
    study_hours: float
    previous_gpa: float
    participation: float


# ==============================
# HOME
# ==============================

@app.get("/")
def root():

    return {
        "message": "Student Success AI Backend is running!"
    }


# ==============================
# HEALTH
# ==============================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# ==============================
# PREDICTION
# ==============================

@app.post("/predict")
def predict_student(data: StudentData):

    # ==============================
    # GPA → PERCENTAGE
    # ==============================

    gpa_percentage = (
        data.previous_gpa / 10
    ) * 100


    # ==============================
    # STUDY HOURS
    # 100 HOURS = 100%
    # ==============================

    study_percentage = data.study_hours


    # ==============================
    # FINAL SCORE
    # ==============================

    total_score = (

        data.attendance
        + data.assignment
        + data.quiz
        + data.midterm
        + study_percentage
        + gpa_percentage
        + data.participation

    )


    prediction = (
        total_score / 700
    ) * 100


    # Keep score between 0 and 100

    prediction = max(
        0,
        min(100, prediction)
    )


    # ==============================
    # SUCCESS STATUS
    # ==============================

    if prediction >= 75:

        status = "High Success Probability"

        risk = "Low Risk"


    elif prediction >= 50:

        status = "Moderate Success Probability"

        risk = "Medium Risk"


    else:

        status = "Low Success Probability"

        risk = "High Risk"


    # ==============================
    # RECOMMENDATIONS
    # ==============================

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


    # ==============================
    # RESPONSE
    # ==============================

    return {

        "predicted_score":
            round(
                float(prediction),
                2
            ),

        "status":
            status,

        "risk":
            risk,

        "recommendations":
            recommendations,

        "message":
            "Student success score calculated successfully."

    }