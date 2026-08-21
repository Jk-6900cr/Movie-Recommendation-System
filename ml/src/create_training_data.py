import pandas as pd

# -----------------------------------
# 1. Load ratings data
# -----------------------------------

ratings = pd.read_csv(
    "ml/data/ml-100k/ml-100k/u.data",
    sep="\t",
    names=["user_id", "movie_id", "rating", "timestamp"]
)

# -----------------------------------
# 2. Load movie data
# -----------------------------------

movie_columns = [
    "movie_id",
    "title",
    "release_date",
    "video_release_date",
    "imdb_url",
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

movies = pd.read_csv(
    "ml/data/ml-100k/ml-100k/u.item",
    sep="|",
    encoding="latin-1",
    header=None,
    names=movie_columns
)

# -----------------------------------
# 3. Merge ratings + movies
# -----------------------------------

training_data = pd.merge(
    ratings,
    movies,
    on="movie_id",
    how="inner"
)

# -----------------------------------
# 4. Create target variable
# -----------------------------------
# Rating 4 or 5 = liked
# Rating 1, 2 or 3 = not liked

training_data["liked"] = (
    training_data["rating"] >= 4
).astype(int)

# -----------------------------------
# 5. Remove unnecessary columns
# -----------------------------------

training_data = training_data.drop(
    columns=[
        "timestamp",
        "video_release_date",
        "imdb_url"
    ]
)

# -----------------------------------
# 6. Display information
# -----------------------------------

print("Training Data Shape:", training_data.shape)

print("\nColumns:")
print(training_data.columns.tolist())

print("\nFirst 5 Rows:")
print(training_data.head())

print("\nLiked Distribution:")
print(training_data["liked"].value_counts())

# -----------------------------------
# 7. Save training dataset
# -----------------------------------

output_file = "ml/data/movie_training_data.csv"

training_data.to_csv(
    output_file,
    index=False
)

print("\nTraining dataset saved to:")
print(output_file)