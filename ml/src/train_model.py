import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib


# -----------------------------------
# 1. Load training data
# -----------------------------------

df = pd.read_csv("ml/data/movie_training_data.csv")

print("Dataset Shape:", df.shape)


# -----------------------------------
# 2. Select features
# -----------------------------------
# Movie genre information will be used
# as input features.

genre_columns = [
    "unknown",
    "action",
    "adventure",
    "animation",
    "children",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "fantasy",
    "film_noir",
    "horror",
    "musical",
    "mystery",
    "romance",
    "sci_fi",
    "thriller",
    "war",
    "western"
]

X = df[genre_columns]

# Target
y = df["liked"]


# -----------------------------------
# 3. Split data
# -----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# -----------------------------------
# 4. Create ML model
# -----------------------------------

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    class_weight="balanced"
)


# -----------------------------------
# 5. Train model
# -----------------------------------

print("\nTraining Random Forest model...")

model.fit(X_train, y_train)

print("Training completed!")


# -----------------------------------
# 6. Make predictions
# -----------------------------------

y_pred = model.predict(X_test)


# -----------------------------------
# 7. Evaluate model
# -----------------------------------

accuracy = accuracy_score(y_test, y_pred)

precision = precision_score(
    y_test,
    y_pred,
    zero_division=0
)

recall = recall_score(
    y_test,
    y_pred,
    zero_division=0
)

f1 = f1_score(
    y_test,
    y_pred,
    zero_division=0
)

print("\n========== MODEL RESULTS ==========")

print(f"Accuracy  : {accuracy:.4f}")
print(f"Precision : {precision:.4f}")
print(f"Recall    : {recall:.4f}")
print(f"F1 Score  : {f1:.4f}")


# -----------------------------------
# 8. Feature importance
# -----------------------------------

print("\n========== FEATURE IMPORTANCE ==========")

importance = pd.DataFrame({
    "genre": genre_columns,
    "importance": model.feature_importances_
})

importance = importance.sort_values(
    by="importance",
    ascending=False
)

print(importance)


# -----------------------------------
# 9. Save trained model
# -----------------------------------

model_path = "ml/models/movie_recommendation_model.pkl"

joblib.dump(model, model_path)

print("\nModel saved successfully!")
print("Location:", model_path)