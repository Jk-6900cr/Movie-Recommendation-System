import pandas as pd
import os
import re

MOVIE_FILE = "ml/data/movie_metadata/recommendation_movies.csv"
OUTPUT_DIR = "ml/data/profile_options"

os.makedirs(OUTPUT_DIR, exist_ok=True)

movies = pd.read_csv(MOVIE_FILE)


# ==========================================
# MOVIE OPTIONS
# ==========================================

movie_options = movies[
    ["id", "title", "original_language"]
].dropna(subset=["title"])

movie_options = movie_options[
    movie_options["original_language"] == "en"
]

movie_options = movie_options.drop_duplicates(
    subset=["title"]
)

movie_options.to_csv(
    f"{OUTPUT_DIR}/movies.csv",
    index=False
)


# ==========================================
# CAST OPTIONS
# ==========================================

cast_names = set()

for cast in movies["top_cast"].dropna():

    names = re.split(
        r",\s*",
        str(cast)
    )

    for name in names:

        name = name.strip()

        if name:
            cast_names.add(name)


cast_options = pd.DataFrame(
    sorted(cast_names),
    columns=["name"]
)

cast_options.to_csv(
    f"{OUTPUT_DIR}/cast.csv",
    index=False
)


print("================================")
print(" PROFILE OPTIONS CREATED")
print("================================")

print(
    f"Movies: {len(movie_options)}"
)

print(
    f"Cast members: {len(cast_options)}"
)

print(
    "\nSaved to:"
)

print(
    f"{OUTPUT_DIR}/movies.csv"
)

print(
    f"{OUTPUT_DIR}/cast.csv"
)
