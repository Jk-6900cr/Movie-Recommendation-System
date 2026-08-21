import pandas as pd

# Load cleaned dataset
file_path = "ml/data/cleaned_user_preferences.csv"
df = pd.read_csv(file_path)

print("Original shape:", df.shape)

# -----------------------------------
# 1. Encode interest levels
# -----------------------------------

interest_mapping = {
    "Not interested": 0,
    "Somewhat interested": 1,
    "Very interested": 2
}

interest_columns = [
    "How would you rate your interest in the following movie-related content? [Behind-the-scenes footage]",
    "How would you rate your interest in the following movie-related content? [Director commentary]",
    "How would you rate your interest in the following movie-related content? [Film reviews and analysis]",
    "How would you rate your interest in the following movie-related content? [Movie soundtracks]"
]

for column in interest_columns:
    if column in df.columns:
        df[column] = df[column].map(interest_mapping).fillna(0)

# -----------------------------------
# 2. Clean age
# -----------------------------------

df["What is your age?"] = pd.to_numeric(
    df["What is your age?"],
    errors="coerce"
)

df["What is your age?"] = df["What is your age?"].fillna(
    df["What is your age?"].median()
)

# -----------------------------------
# 3. Clean text columns
# -----------------------------------

text_columns = [
    "Gender",
    "Which languages do you prefer?",
    "genres",
    "favorite_actors",
    "List your favourite actresses (one per line) ",
    "top_movies",
    "recommended_movie"
]

for column in text_columns:
    if column in df.columns:
        df[column] = df[column].fillna("Unknown").astype(str).str.strip()

# -----------------------------------
# 4. Display result
# -----------------------------------

print("\nFeature engineered data:")
print(df.head())

print("\nData types:")
print(df.dtypes)

# -----------------------------------
# 5. Save feature dataset
# -----------------------------------

output_file = "ml/data/feature_engineered_users.csv"

df.to_csv(output_file, index=False)

print("\nFeature engineered dataset saved to:")
print(output_file)