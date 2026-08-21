import pandas as pd

# Load ratings
ratings = pd.read_csv(
    "ml/data/ml-100k/ml-100k/u.data",
    sep="\t",
    names=["user_id", "movie_id", "rating", "timestamp"]
)

# Load movies
movies = pd.read_csv(
    "ml/data/ml-100k/ml-100k/u.item",
    sep="|",
    encoding="latin-1",
    header=None
)

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

movies.columns = movie_columns

# Display information
print("Ratings Shape:", ratings.shape)
print("Movies Shape:", movies.shape)

print("\nFirst 5 Ratings:")
print(ratings.head())

print("\nFirst 5 Movies:")
print(movies[["movie_id", "title", "release_date"]].head())

print("\nRating Statistics:")
print(ratings["rating"].describe())

print("\nUnique Users:", ratings["user_id"].nunique())
print("Unique Movies:", ratings["movie_id"].nunique())