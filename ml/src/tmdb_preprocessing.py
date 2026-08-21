import pandas as pd
import ast
import os


# -----------------------------------
# File paths
# -----------------------------------

MOVIES_FILE = "ml/data/movie_metadata/tmdb_5000_movies.csv"
CREDITS_FILE = "ml/data/movie_metadata/tmdb_5000_credits.csv"

OUTPUT_FILE = "ml/data/movie_metadata/cleaned_movies.csv"


# -----------------------------------
# Load datasets
# -----------------------------------

movies = pd.read_csv(MOVIES_FILE)
credits = pd.read_csv(CREDITS_FILE)

print("Movies loaded:", movies.shape)
print("Credits loaded:", credits.shape)


# -----------------------------------
# Merge datasets
# -----------------------------------

credits = credits.rename(
    columns={"movie_id": "id"}
)

df = movies.merge(
    credits[["id", "cast", "crew"]],
    on="id",
    how="left"
)

print("Merged dataset:", df.shape)


# -----------------------------------
# Extract names from JSON-like data
# -----------------------------------

def extract_names(value):

    if pd.isna(value):
        return ""

    try:
        data = ast.literal_eval(value)

        names = []

        for item in data:
            if "name" in item:
                names.append(
                    item["name"]
                )

        return ", ".join(names)

    except Exception:
        return ""


# -----------------------------------
# Extract genres
# -----------------------------------

def extract_genres(value):

    if pd.isna(value):
        return ""

    try:
        data = ast.literal_eval(value)

        genres = []

        for item in data:
            if "name" in item:
                genres.append(
                    item["name"]
                )

        return ", ".join(genres)

    except Exception:
        return ""


# -----------------------------------
# Process columns
# -----------------------------------

df["genres_clean"] = df[
    "genres"
].apply(extract_genres)

df["cast_clean"] = df[
    "cast"
].apply(extract_names)

df["crew_clean"] = df[
    "crew"
].apply(extract_names)


# -----------------------------------
# Select useful columns
# -----------------------------------

cleaned = df[
    [
        "id",
        "title",
        "original_title",
        "original_language",
        "genres_clean",
        "cast_clean",
        "overview",
        "release_date",
        "popularity",
        "vote_average",
        "vote_count"
    ]
].copy()


# -----------------------------------
# Remove missing titles
# -----------------------------------

cleaned = cleaned.dropna(
    subset=["title"]
)


# -----------------------------------
# Fill missing values
# -----------------------------------

cleaned["original_language"] = (
    cleaned["original_language"]
    .fillna("unknown")
)

cleaned["genres_clean"] = (
    cleaned["genres_clean"]
    .fillna("")
)

cleaned["cast_clean"] = (
    cleaned["cast_clean"]
    .fillna("")
)

cleaned["overview"] = (
    cleaned["overview"]
    .fillna("")
)


# -----------------------------------
# Save
# -----------------------------------

os.makedirs(
    os.path.dirname(OUTPUT_FILE),
    exist_ok=True
)

cleaned.to_csv(
    OUTPUT_FILE,
    index=False
)


print("\n========== PREPROCESSING COMPLETE ==========")

print(
    "Final dataset shape:",
    cleaned.shape
)

print(
    "\nColumns:"
)

print(
    cleaned.columns.tolist()
)

print(
    "\nSaved to:"
)

print(OUTPUT_FILE)