import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# =========================================
# LOAD DATASET
# =========================================

data = pd.read_csv("dataset.csv")


# =========================================
# FEATURES
# =========================================

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


# =========================================
# TRAIN / TEST SPLIT
# =========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# =========================================
# CREATE MODELS
# =========================================

models = {

    "Linear Regression":
        LinearRegression(),

    "Random Forest":
        RandomForestRegressor(
            n_estimators=200,
            random_state=42
        ),

    "Gradient Boosting":
        GradientBoostingRegressor(
            n_estimators=200,
            random_state=42
        )
}


# =========================================
# TRAIN + EVALUATE MODELS
# =========================================

results = {}

print()
print("==============================================")
print("       STUDENT SUCCESS AI - MODEL TEST")
print("==============================================")
print()


for name, model in models.items():

    # Train
    model.fit(X_train, y_train)

    # Predict
    predictions = model.predict(X_test)

    # Metrics
    mae = mean_absolute_error(
        y_test,
        predictions
    )

    rmse = mean_squared_error(
        y_test,
        predictions
    ) ** 0.5

    r2 = r2_score(
        y_test,
        predictions
    )

    results[name] = {
        "model": model,
        "MAE": mae,
        "RMSE": rmse,
        "R2": r2
    }

    print("----------------------------------------------")
    print(name)
    print("----------------------------------------------")

    print(f"MAE  : {mae:.2f}")
    print(f"RMSE : {rmse:.2f}")
    print(f"R2   : {r2:.2f}")

    print()


# =========================================
# SELECT BEST MODEL
# =========================================

# Higher R2 is better
best_model_name = max(
    results,
    key=lambda name: results[name]["R2"]
)

best_model = results[
    best_model_name
]["model"]


# =========================================
# BEST MODEL RESULTS
# =========================================

best_mae = results[
    best_model_name
]["MAE"]

best_rmse = results[
    best_model_name
]["RMSE"]

best_r2 = results[
    best_model_name
]["R2"]


print("==============================================")
print("              BEST AI MODEL")
print("==============================================")

print(f"Best Model : {best_model_name}")
print(f"R2 Score   : {best_r2:.2f}")
print(f"MAE        : {best_mae:.2f}")
print(f"RMSE       : {best_rmse:.2f}")

print()


# =========================================
# SAVE BEST MODEL
# =========================================

joblib.dump(
    best_model,
    "student_success_model.pkl"
)


print("----------------------------------------------")
print("Best model saved successfully!")
print("File: student_success_model.pkl")
print("----------------------------------------------")