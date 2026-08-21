import pandas as pd
import ast
import os


INPUT_FILE = "ml/data/movie_metadata/cleaned_movies.csv"

OUTPUT_FILE = "ml/data/movie_metadata/recommendation_movies.csv"


# -----------------------------------
# Load cleaned TMDB data
# -----------------------------------

df = pd.read_csv(INPUT_FILE)

print("Loaded movies:", df.shape)


# -----------------------------------
# Get top 10 cast members
# -----------------------------------

def get_top_cast(cast):

    if pd.isna(cast):
        return ""

    names = [
        name.strip()
        for name in str(cast).split(",")
        if name.strip()
    ]

    return ", ".join(names[:10])


df["top_cast"] = df["cast_clean"].apply(
    get_top_cast
)


# -----------------------------------
# Clean genres
# -----------------------------------

df["genres_clean"] = (
    df["genres_clean"]
    .fillna("")
    .str.lower()
)


# -----------------------------------
# Clean language
# -----------------------------------

df["original_language"] = (
    df["original_language"]
    .fillna("unknown")
    .str.lower()
)


# -----------------------------------
# Clean text
# -----------------------------------

df["overview"] = (
    df["overview"]
    .fillna("")
)


df["title"] = (
    df["title"]
    .fillna("")
)


# -----------------------------------
# Normalize ratings
# -----------------------------------

df["vote_average"] = pd.to_numeric(
    df["vote_average"],
    errors="coerce"
).fillna(0)


df["vote_count"] = pd.to_numeric(
    df["vote_count"],
    errors="coerce"
).fillna(0)


df["popularity"] = pd.to_numeric(
    df["popularity"],
    errors="coerce"
).fillna(0)


# -----------------------------------
# Create normalized rating score
# -----------------------------------

df["rating_score"] = (
    df["vote_average"] / 10
)


# -----------------------------------
# Create popularity score
# -----------------------------------

max_popularity = df["popularity"].max()

if max_popularity > 0:

    df["popularity_score"] = (
        df["popularity"] /
        max_popularity
    )

else:

    df["popularity_score"] = 0


# -----------------------------------
# Select final features
# -----------------------------------

recommendation_df = df[
    [
        "id",
        "title",
        "original_title",
        "original_language",
        "genres_clean",
        "top_cast",
        "overview",
        "release_date",
        "vote_average",
        "vote_count",
        "popularity",
        "rating_score",
        "popularity_score"
    ]
].copy()


# -----------------------------------
# Remove duplicate movies
# -----------------------------------

recommendation_df = (
    recommendation_df
    .drop_duplicates(
        subset=["title"]
    )
)


# -----------------------------------
# Save
# -----------------------------------

os.makedirs(
    os.path.dirname(OUTPUT_FILE),
    exist_ok=True
)


recommendation_df.to_csv(
    OUTPUT_FILE,
    index=False
)


print("\n================================")
print(" RECOMMENDATION DATASET CREATED")
print("================================")

print(
    "Final shape:",
    recommendation_df.shape
)

print("\nColumns:")

print(
    recommendation_df.columns.tolist()
)

print("\nSaved to:")

print(OUTPUT_FILE)


print("\nSample:")

print(
    recommendation_df[
        [
            "title",
            "original_language",
            "genres_clean",
            "top_cast",
            "vote_average"
        ]
    ].head().to_string()
)