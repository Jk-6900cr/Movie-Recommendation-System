import pandas as pd

# -----------------------------------
# 1. Load raw Google Forms data
# -----------------------------------

file_path = "ml/data/Movie Recommendation Profile.csv"

df = pd.read_csv(file_path)

print("Original Dataset Shape:", df.shape)

# -----------------------------------
# 2. Remove Timestamp
# -----------------------------------

if "Timestamp" in df.columns:
    df = df.drop(columns=["Timestamp"])

# -----------------------------------
# 3. Rename important columns
# -----------------------------------

df = df.rename(columns={
    "Which genres do you enjoy?": "genres",
    "List your favourite actors (one per line)": "favorite_actors",
    "List your favourite actresses (one per line)": "favorite_actresses",
    "List your top 3 favourite movies (one per line)": "top_movies",
    "Which movie would you recommend to everyone?": "recommended_movie"
})

# -----------------------------------
# 4. Handle missing text values
# -----------------------------------

text_columns = [
    "genres",
    "favorite_actors",
    "favorite_actresses",
    "top_movies",
    "recommended_movie"
]

for column in text_columns:
    if column in df.columns:
        df[column] = df[column].fillna("Unknown")

# -----------------------------------
# 5. Handle missing numeric values
# -----------------------------------

for column in df.columns:

    # Try to convert column to numeric
    numeric_values = pd.to_numeric(df[column], errors="coerce")

    # If most values are numeric, treat it as numeric
    if numeric_values.notna().sum() > 0:
        df[column] = numeric_values.fillna(numeric_values.median())

# -----------------------------------
# 6. Remove duplicate responses
# -----------------------------------

df = df.drop_duplicates()

# -----------------------------------
# 7. Display cleaned data
# -----------------------------------

print("\nCleaned Dataset Shape:", df.shape)

print("\nCleaned Columns:")
print(df.columns.tolist())

print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

print("\nFirst 5 Rows:")
print(df.head())

# -----------------------------------
# 8. Save cleaned dataset
# -----------------------------------

output_file = "ml/data/cleaned_user_preferences.csv"

df.to_csv(output_file, index=False)

print("\nCleaned dataset saved to:")
print(output_file)