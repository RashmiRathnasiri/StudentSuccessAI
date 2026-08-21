document.getElementById("attendance").addEventListener("input", function () {
    console.log("Typed value:", this.value);
});

async function predictSuccess() {

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = "";

    const attendance =
        document.getElementById("attendance").value;

    const assignment =
        document.getElementById("assignment").value;

    const quiz =
        document.getElementById("quiz").value;

    const midterm =
        document.getElementById("midterm").value;

    const study_hours =
        document.getElementById("study_hours").value;

    const previous_gpa =
        document.getElementById("previous_gpa").value;

    const participation =
        document.getElementById("participation").value;


    // Validate inputs

    if (
        attendance === "" ||
        assignment === "" ||
        quiz === "" ||
        midterm === "" ||
        study_hours === "" ||
        previous_gpa === "" ||
        participation === ""
    ) {

        errorMessage.textContent =
            "Please fill in all student performance fields.";

        return;
    }


    const studentData = {

        attendance: Number(attendance),
        assignment: Number(assignment),
        quiz: Number(quiz),
        midterm: Number(midterm),
        study_hours: Number(study_hours),
        previous_gpa: Number(previous_gpa),
        participation: Number(participation)

    };


    try {

        const button =
            document.querySelector(".predict-button");

        button.textContent =
            "🤖 AI is analyzing...";

        button.disabled = true;


        // Send data to backend

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(studentData)
            }
        );


        if (!response.ok) {

            throw new Error(
                "Server returned status " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "AI RESULT:",
            data
        );


        // =========================
        // DISPLAY AI RESULT
        // =========================

        document.getElementById("score")
            .textContent =
            data.predicted_score + "%";


        document.getElementById("status")
            .textContent =
            data.status;


        const riskElement =
    document.getElementById("risk");

riskElement.textContent = data.risk;

riskElement.className = "";

if (data.risk === "Low Risk") {

    riskElement.classList.add("low-risk");

}

else if (data.risk === "Medium Risk") {

    riskElement.classList.add("medium-risk");

}

else if (data.risk === "High Risk") {

    riskElement.classList.add("high-risk");

}
        
        


        document.getElementById("message")
            .textContent =
            data.message;


        // =========================
        // PERFORMANCE ANALYSIS
        // =========================

        const performanceAnalysis =
            document.getElementById(
                "performanceAnalysis"
            );

        if (performanceAnalysis) {

            performanceAnalysis.style.display =
                "block";
        }


        const performance = [

            {
                name: "Attendance",
                value: Number(attendance),
                result: "attendanceResult",
                bar: "attendanceBar"
            },

            {
                name: "Assignment",
                value: Number(assignment),
                result: "assignmentResult",
                bar: "assignmentBar"
            },

            {
                name: "Quiz",
                value: Number(quiz),
                result: "quizResult",
                bar: "quizBar"
            },

            {
                name: "Midterm",
                value: Number(midterm),
                result: "midtermResult",
                bar: "midtermBar"
            },

            {
                name: "Participation",
                value: Number(participation),
                result: "participationResult",
                bar: "participationBar"
            }

        ];


        performance.forEach(item => {

            const resultElement =
                document.getElementById(
                    item.result
                );

            const barElement =
                document.getElementById(
                    item.bar
                );


            if (resultElement) {

                resultElement.textContent =
                    item.value + "%";
            }


            if (barElement) {

                barElement.style.width =
                    item.value + "%";
            }

        });


        // =========================
        // STUDY HOURS
        // =========================

        const studyPercentage =
            Math.min(
                Number(study_hours) * 10,
                100
            );


        const studyResult =
            document.getElementById(
                "studyResult"
            );

        const studyBar =
            document.getElementById(
                "studyBar"
            );


        if (studyResult) {

            studyResult.textContent =
                study_hours + " hrs";
        }


        if (studyBar) {

            studyBar.style.width =
                studyPercentage + "%";
        }


        // =========================
        // STRONG / IMPROVE AREAS
        // =========================

        const strongAreas =
            document.getElementById(
                "strongAreas"
            );

        const improveAreas =
            document.getElementById(
                "improveAreas"
            );


        if (strongAreas && improveAreas) {

            strongAreas.innerHTML = "";
            improveAreas.innerHTML = "";


            performance.forEach(item => {

                if (item.value >= 85) {

                    strongAreas.innerHTML += `
                        <div class="area-item">
                            ✓ ${item.name} (${item.value}%)
                        </div>
                    `;

                }

                else if (item.value < 75) {

                    improveAreas.innerHTML += `
                        <div class="area-item">
                            → ${item.name} (${item.value}%)
                        </div>
                    `;

                }

            });


            // Study hours

            if (Number(study_hours) >= 10) {

                strongAreas.innerHTML += `
                    <div class="area-item">
                        ✓ Study Routine (${study_hours} hrs)
                    </div>
                `;

            }

            else if (Number(study_hours) < 7) {

                improveAreas.innerHTML += `
                    <div class="area-item">
                        → Study Routine (${study_hours} hrs)
                    </div>
                `;

            }


            if (improveAreas.innerHTML === "") {

                improveAreas.innerHTML = `
                    <div class="area-item">
                        ✓ No major weaknesses detected
                    </div>
                `;

            }

        }


        // =========================
        // AI RECOMMENDATIONS
        // =========================

        const recommendationsList =
            document.getElementById(
                "recommendationsList"
            );


        if (
            recommendationsList &&
            data.recommendations
        ) {

            recommendationsList.innerHTML = "";


            data.recommendations.forEach(
                recommendation => {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "recommendation-item";


                    item.innerHTML = `
                        <span class="recommendation-icon">
                            💡
                        </span>

                        <span>
                            ${recommendation}
                        </span>
                    `;


                    recommendationsList
                        .appendChild(item);

                }
            );

        }


        // =========================
        // SHOW RESULT
        // =========================

        const resultCard =
            document.getElementById(
                "resultCard"
            );


        if (resultCard) {

            resultCard.style.display =
                "block";


            resultCard.scrollIntoView({
                behavior: "smooth"
            });

        }


    }

    catch (error) {

        console.error(
            "AI Error:",
            error
        );


        errorMessage.textContent =
            "Error: " + error.message;

    }


    finally {

        const button =
            document.querySelector(
                ".predict-button"
            );


        if (button) {

            button.textContent =
                "🤖 Predict My Success";

            button.disabled = false;

        }

    }

}


// =================================================
// AI IMPROVEMENT SIMULATOR
// =================================================

async function simulateImprovement() {

    const targetAttendance =
        Number(
            document.getElementById(
                "targetAttendance"
            ).value
        );


    const targetAssignment =
        Number(
            document.getElementById(
                "targetAssignment"
            ).value
        );


    const targetQuiz =
        Number(
            document.getElementById(
                "targetQuiz"
            ).value
        );


    const targetStudyHours =
        Number(
            document.getElementById(
                "targetStudyHours"
            ).value
        );


    if (
        targetAttendance <= 0 ||
        targetAssignment <= 0 ||
        targetQuiz <= 0 ||
        targetStudyHours <= 0
    ) {

        alert(
            "Please enter all target values."
        );

        return;
    }


    const midterm =
        Number(
            document.getElementById(
                "midterm"
            ).value
        );


    const previousGPA =
        Number(
            document.getElementById(
                "previous_gpa"
            ).value
        );


    const participation =
        Number(
            document.getElementById(
                "participation"
            ).value
        );


    try {

        const response =
            await fetch(
                "http://127.0.0.1:8000/predict",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        attendance:
                            targetAttendance,

                        assignment:
                            targetAssignment,

                        quiz:
                            targetQuiz,

                        midterm:
                            midterm,

                        study_hours:
                            targetStudyHours,

                        previous_gpa:
                            previousGPA,

                        participation:
                            participation

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Simulation request failed: " +
                response.status
            );

        }


        const data =
            await response.json();


        const futureScore =
            document.getElementById(
                "futureScore"
            );


        const improvementMessage =
            document.getElementById(
                "improvementMessage"
            );


        const simulationResult =
            document.getElementById(
                "simulationResult"
            );


        if (futureScore) {

            futureScore.textContent =
                data.predicted_score + "%";

        }


        if (improvementMessage) {

            improvementMessage.textContent =
                "🚀 With these improvements, " +
                "your predicted score could reach " +
                data.predicted_score +
                "%. Keep working consistently!";

        }


        if (simulationResult) {

            simulationResult.style.display =
                "block";

        }

    }

    catch (error) {

        console.error(
            "Simulation Error:",
            error
        );


        alert(
            "Unable to connect to the AI server."
        );

    }

}

document.querySelectorAll('input[type="number"]').forEach(input => {

    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
        }

    });

});

document.querySelectorAll('input[type="number"]').forEach(input => {

    input.addEventListener("wheel", function(event) {
        event.preventDefault();
        this.blur();
    });

});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        console.log(this.id, this.value);
    });
});
