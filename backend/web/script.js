// =================================================
// STUDENT SUCCESS AI
// =================================================

// Prevent number input scroll
document.querySelectorAll('input[type="number"]').forEach(function (input) {
    input.addEventListener("wheel", function (event) {
        event.preventDefault();
        this.blur();
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
});


// =================================================
// PREDICT STUDENT SUCCESS
// =================================================

function predictSuccess() {

    var attendanceInput = document.getElementById("attendance");
    var assignmentInput = document.getElementById("assignment");
    var quizInput = document.getElementById("quiz");
    var midtermInput = document.getElementById("midterm");
    var studyHoursInput = document.getElementById("study_hours");
    var gpaInput = document.getElementById("previous_gpa");
    var participationInput = document.getElementById("participation");

    var errorMessage = document.getElementById("errorMessage");

    // Check empty fields
    if (
        attendanceInput.value === "" ||
        assignmentInput.value === "" ||
        quizInput.value === "" ||
        midtermInput.value === "" ||
        studyHoursInput.value === "" ||
        gpaInput.value === "" ||
        participationInput.value === ""
    ) {
        errorMessage.textContent =
            "Please fill in all student performance fields.";
        return;
    }

    // Get values
    var attendance = Number(attendanceInput.value);
    var assignment = Number(assignmentInput.value);
    var quiz = Number(quizInput.value);
    var midterm = Number(midtermInput.value);
    var studyHours = Number(studyHoursInput.value);
    var previousGPA = Number(gpaInput.value);
    var participation = Number(participationInput.value);


    // =================================================
    // GPA CONVERSION
    // GPA / 10 × 100
    // =================================================

    var gpaPercentage = (previousGPA / 10) * 100;


    // =================================================
    // FINAL SCORE
    //
    // 7 VALUES
    // ADD THEM
    // DIVIDE BY 700
    // MULTIPLY BY 100
    // =================================================

    var totalScore =
        attendance +
        assignment +
        quiz +
        midterm +
        studyHours +
        gpaPercentage +
        participation;

    var finalScore = (totalScore / 700) * 100;

    finalScore = Number(finalScore.toFixed(2));


    console.log("Attendance:", attendance);
    console.log("Assignment:", assignment);
    console.log("Quiz:", quiz);
    console.log("Midterm:", midterm);
    console.log("Study Hours:", studyHours);
    console.log("Previous GPA:", previousGPA);
    console.log("GPA Percentage:", gpaPercentage);
    console.log("Participation:", participation);
    console.log("Total:", totalScore);
    console.log("Final Score:", finalScore);


    // =================================================
    // STATUS & RISK
    // =================================================

    var status;
    var risk;
    var message;

    if (finalScore >= 75) {

        status = "High Success Probability";
        risk = "Low Risk";
        message =
            "Your academic performance indicates a strong likelihood of success.";

    } else if (finalScore >= 50) {

        status = "Moderate Success Probability";
        risk = "Medium Risk";
        message =
            "Your performance is moderate. Improving weaker areas can increase your success probability.";

    } else {

        status = "Low Success Probability";
        risk = "High Risk";
        message =
            "Your current performance needs improvement. Focus on the recommended areas.";

    }


    // =================================================
    // DISPLAY RESULT
    // =================================================

    document.getElementById("score").textContent =
        finalScore + "%";

    document.getElementById("status").textContent =
        status;

    document.getElementById("message").textContent =
        message;


    var riskElement = document.getElementById("risk");

    riskElement.textContent = risk;
    riskElement.className = "";

    if (risk === "Low Risk") {
        riskElement.classList.add("low-risk");
    } else if (risk === "Medium Risk") {
        riskElement.classList.add("medium-risk");
    } else {
        riskElement.classList.add("high-risk");
    }


    // =================================================
    // PERFORMANCE ANALYSIS
    // =================================================

    var performanceAnalysis =
        document.getElementById("performanceAnalysis");

    performanceAnalysis.style.display = "block";


    // Attendance
    document.getElementById("attendanceResult").textContent =
        attendance + "%";

    document.getElementById("attendanceBar").style.width =
        Math.min(attendance, 100) + "%";


    // Assignment
    document.getElementById("assignmentResult").textContent =
        assignment + "%";

    document.getElementById("assignmentBar").style.width =
        Math.min(assignment, 100) + "%";


    // Quiz
    document.getElementById("quizResult").textContent =
        quiz + "%";

    document.getElementById("quizBar").style.width =
        Math.min(quiz, 100) + "%";


    // Midterm
    document.getElementById("midtermResult").textContent =
        midterm + "%";

    document.getElementById("midtermBar").style.width =
        Math.min(midterm, 100) + "%";


    // Study hours
    document.getElementById("studyResult").textContent =
        studyHours + " hrs";

    document.getElementById("studyBar").style.width =
        Math.min(studyHours * 10, 100) + "%";


    // Participation
    document.getElementById("participationResult").textContent =
        participation + "%";

    document.getElementById("participationBar").style.width =
        Math.min(participation, 100) + "%";


    // =================================================
    // STRONG / IMPROVE AREAS
    // =================================================

    var strongAreas =
        document.getElementById("strongAreas");

    var improveAreas =
        document.getElementById("improveAreas");

    strongAreas.innerHTML = "";
    improveAreas.innerHTML = "";


    // Attendance
    if (attendance >= 85) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Attendance (" +
            attendance +
            "%)</div>";
    } else if (attendance < 75) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Attendance (" +
            attendance +
            "%)</div>";
    }


    // Assignment
    if (assignment >= 85) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Assignment (" +
            assignment +
            "%)</div>";
    } else if (assignment < 75) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Assignment (" +
            assignment +
            "%)</div>";
    }


    // Quiz
    if (quiz >= 85) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Quiz (" +
            quiz +
            "%)</div>";
    } else if (quiz < 75) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Quiz (" +
            quiz +
            "%)</div>";
    }


    // Midterm
    if (midterm >= 85) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Midterm (" +
            midterm +
            "%)</div>";
    } else if (midterm < 75) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Midterm (" +
            midterm +
            "%)</div>";
    }


    // Participation
    if (participation >= 85) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Participation (" +
            participation +
            "%)</div>";
    } else if (participation < 75) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Participation (" +
            participation +
            "%)</div>";
    }


    // Study hours
    if (studyHours >= 10) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Study Routine (" +
            studyHours +
            " hrs)</div>";
    } else if (studyHours < 7) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Study Routine (" +
            studyHours +
            " hrs)</div>";
    }


    // GPA
    if (previousGPA >= 3.5) {
        strongAreas.innerHTML +=
            "<div class='area-item'>✓ Previous GPA (" +
            previousGPA +
            ")</div>";
    } else if (previousGPA < 2.5) {
        improveAreas.innerHTML +=
            "<div class='area-item'>→ Previous GPA (" +
            previousGPA +
            ")</div>";
    }


    if (improveAreas.innerHTML === "") {
        improveAreas.innerHTML =
            "<div class='area-item'>✓ No major weaknesses detected</div>";
    }


    // =================================================
    // EXPLAINABLE AI
    // =================================================

    var explanationsList =
        document.getElementById("explanationsList");

    explanationsList.innerHTML = "";


    addExplanation(
        explanationsList,
        "Attendance",
        attendance >= 85,
        "Your strong attendance is positively supporting your predicted score.",
        "Improving attendance could positively affect your academic performance."
    );

    addExplanation(
        explanationsList,
        "Assignment",
        assignment >= 85,
        "Your assignment performance is positively supporting your prediction.",
        "Improving assignment performance could increase your predicted score."
    );

    addExplanation(
        explanationsList,
        "Quiz",
        quiz >= 85,
        "Your quiz performance is positively supporting your prediction.",
        "Improving quiz performance could increase your predicted score."
    );

    addExplanation(
        explanationsList,
        "Midterm",
        midterm >= 85,
        "Your strong midterm performance is positively supporting the prediction.",
        "Improving midterm performance could improve your predicted result."
    );

    addExplanation(
        explanationsList,
        "Study Hours",
        studyHours >= 10,
        "Your focused study time is positively supporting your performance.",
        "Increasing focused study time could improve your result."
    );

    addExplanation(
        explanationsList,
        "Previous GPA",
        previousGPA >= 3.5,
        "Your previous GPA is positively supporting the prediction.",
        "Improving your academic performance can strengthen future GPA results."
    );

    addExplanation(
        explanationsList,
        "Participation",
        participation >= 85,
        "Your strong classroom participation is positively supporting your prediction.",
        "Increasing classroom participation could improve your prediction."
    );


    // =================================================
    // RECOMMENDATIONS
    // =================================================

    var recommendationsList =
        document.getElementById("recommendationsList");

    recommendationsList.innerHTML = "";


    addRecommendation(
        recommendationsList,
        attendance >= 85
            ? "Maintain your strong attendance."
            : "Try to maintain attendance above 85%."
    );


    if (assignment < 85) {
        addRecommendation(
            recommendationsList,
            "Try to improve assignment performance above 85%."
        );
    }


    if (quiz < 85) {
        addRecommendation(
            recommendationsList,
            "Improve quiz preparation to reach above 85%."
        );
    }


    if (midterm < 85) {
        addRecommendation(
            recommendationsList,
            "Continue revising regularly to improve exam performance."
        );
    }


    if (studyHours < 10) {
        addRecommendation(
            recommendationsList,
            "Aim for around 10 focused study hours per week."
        );
    }


    if (previousGPA >= 3.5) {
        addRecommendation(
            recommendationsList,
            "Your previous GPA shows strong academic progress."
        );
    } else {
        addRecommendation(
            recommendationsList,
            "Focus on improving your academic performance to strengthen your GPA."
        );
    }


    if (participation < 85) {
        addRecommendation(
            recommendationsList,
            "Increase classroom participation."
        );
    }


    // =================================================
    // SHOW RESULT
    // =================================================

    var resultCard =
        document.getElementById("resultCard");

    resultCard.style.display = "block";

    resultCard.scrollIntoView({
        behavior: "smooth"
    });
}


// =================================================
// EXPLANATION HELPER
// =================================================

function addExplanation(
    container,
    factor,
    positive,
    positiveMessage,
    moderateMessage
) {

    var item =
        document.createElement("div");

    item.className =
        "explanation-item";

    var icon = positive ? "🟢" : "🟡";

    var impact = positive
        ? "Positive"
        : "Moderate";

    item.innerHTML =
        "<div class='explanation-header'>" +
        "<span class='explanation-icon'>" +
        icon +
        "</span>" +
        "<strong>" +
        factor +
        "</strong>" +
        "<span class='impact'>" +
        impact +
        "</span>" +
        "</div>" +
        "<p>" +
        (positive ? positiveMessage : moderateMessage) +
        "</p>";

    container.appendChild(item);
}


// =================================================
// RECOMMENDATION HELPER
// =================================================

function addRecommendation(
    container,
    text
) {

    var item =
        document.createElement("div");

    item.className =
        "recommendation-item";

    item.innerHTML =
        "<span class='recommendation-icon'>💡</span>" +
        "<span>" +
        text +
        "</span>";

    container.appendChild(item);
}


// =================================================
// AI IMPROVEMENT SIMULATOR
// =================================================

function simulateImprovement() {

    var targetAttendance =
        Number(
            document.getElementById("targetAttendance").value
        );

    var targetAssignment =
        Number(
            document.getElementById("targetAssignment").value
        );

    var targetQuiz =
        Number(
            document.getElementById("targetQuiz").value
        );

    var targetStudyHours =
        Number(
            document.getElementById("targetStudyHours").value
        );


    // Validate
    if (
        targetAttendance <= 0 ||
        targetAssignment <= 0 ||
        targetQuiz <= 0 ||
        targetStudyHours <= 0
    ) {

        alert("Please enter all target values.");
        return;
    }


    // Current values
    var midterm =
        Number(
            document.getElementById("midterm").value
        );

    var previousGPA =
        Number(
            document.getElementById("previous_gpa").value
        );

    var participation =
        Number(
            document.getElementById("participation").value
        );


    if (
        document.getElementById("midterm").value === "" ||
        document.getElementById("previous_gpa").value === "" ||
        document.getElementById("participation").value === ""
    ) {

        alert(
            "Please enter your main student data first."
        );

        return;
    }


    // GPA conversion
    var gpaPercentage =
        (previousGPA / 10) * 100;


    // =================================================
    // FUTURE SCORE
    // 7 VALUES
    // SUM / 700 × 100
    // =================================================

    var totalScore =
        targetAttendance +
        targetAssignment +
        targetQuiz +
        midterm +
        targetStudyHours +
        gpaPercentage +
        participation;

    var futureScore =
        Number(
            ((totalScore / 700) * 100).toFixed(2)
        );


    console.log(
        "Future Score:",
        futureScore
    );


    // Display future score
    document.getElementById("futureScore").textContent =
        futureScore + "%";


    document.getElementById("improvementMessage").textContent =
        "🚀 With these improvements, your predicted score could reach " +
        futureScore +
        "%. Keep working consistently!";


    // Show result
    var simulationResult =
        document.getElementById("simulationResult");

    simulationResult.style.display = "block";

    simulationResult.scrollIntoView({
        behavior: "smooth"
    });
}