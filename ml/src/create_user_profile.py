import pandas as pd
import os


# ==========================================
# FILE PATHS
# ==========================================

MOVIE_FILE = "ml/data/profile_options/movies.csv"
CAST_FILE = "ml/data/profile_options/cast.csv"

PROFILE_FILE = "ml/data/user_profiles.csv"


# ==========================================
# LOAD OPTIONS
# ==========================================

movies = pd.read_csv(MOVIE_FILE)
cast = pd.read_csv(CAST_FILE)


# ==========================================
# HELPER FUNCTIONS
# ==========================================

def choose_multiple(options, label, max_choices):

    print(f"\n{label}")
    print("Type names separated by commas.")
    print(f"Maximum {max_choices} selections.")

    value = input("> ").strip()

    selected = [
        item.strip()
        for item in value.split(",")
        if item.strip()
    ]

    return selected[:max_choices]


# ==========================================
# CREATE PROFILE
# ==========================================

print("================================")
print("       CREATE YOUR PROFILE")
print("================================")


# ------------------------------------------
# NAME
# ------------------------------------------

name = input(
    "\nEnter your name: "
).strip()


# ------------------------------------------
# GENRES
# ------------------------------------------

genres = [
    "action",
    "adventure",
    "animation",
    "children",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "fantasy",
    "horror",
    "musical",
    "mystery",
    "romance",
    "science fiction",
    "thriller",
    "war",
    "western"
]

print("\nAvailable genres:")

print(
    ", ".join(genres)
)

favorite_genres = choose_multiple(
    genres,
    "Enter your favorite genres:",
    5
)


# ------------------------------------------
# FAVORITE CAST
# ------------------------------------------

print(
    "\n========== FAVORITE CAST =========="
)

print(
    "We will use cast members from our"
)

print(
    "Hollywood movie database."
)

print(
    "Examples:"
)

print(
    ", ".join(
        cast["name"].head(10).tolist()
    )
)

favorite_cast = choose_multiple(
    cast["name"].tolist(),
    "Enter your favorite actors/actresses:",
    5
)


# ------------------------------------------
# FAVORITE MOVIES
# ------------------------------------------

print(
    "\n========== FAVORITE MOVIES =========="
)

print(
    "Examples:"
)

print(
    ", ".join(
        movies["title"].head(10).tolist()
    )
)

favorite_movies = choose_multiple(
    movies["title"].tolist(),
    "Enter your favorite movies:",
    5
)


# ------------------------------------------
# RECOMMENDATION PRIORITIES
# ------------------------------------------

print(
    "\n========== WHAT MATTERS MOST? =========="
)

print(
    "1. Similar movies"
)

print(
    "2. Favorite actors/actresses"
)

print(
    "3. Favorite genres"
)

print(
    "4. Highly rated movies"
)

print(
    "5. Popular movies"
)


preferences = input(
    "\nEnter your top 3 choices "
    "(example: 1,2,3): "
).strip()


# ==========================================
# SAVE PROFILE
# ==========================================

profile = {

    "name": name,

    "favorite_genres":
        ", ".join(favorite_genres),

    "favorite_cast":
        ", ".join(favorite_cast),

    "favorite_movies":
        ", ".join(favorite_movies),

    "recommendation_preferences":
        preferences
}


os.makedirs(
    os.path.dirname(PROFILE_FILE),
    exist_ok=True
)


if os.path.exists(PROFILE_FILE):

    existing = pd.read_csv(
        PROFILE_FILE
    )

    # Remove previous profile
    # with same name

    existing = existing[
        existing["name"].str.lower()
        != name.lower()
    ]

    existing = pd.concat(
        [
            existing,
            pd.DataFrame([profile])
        ],
        ignore_index=True
    )

    existing.to_csv(
        PROFILE_FILE,
        index=False
    )

else:

    pd.DataFrame(
        [profile]
    ).to_csv(
        PROFILE_FILE,
        index=False
    )


# ==========================================
# DISPLAY PROFILE
# ==========================================

print(
    "\n================================"
)

print(
    "       PROFILE SAVED"
)

print(
    "================================"
)

print(
    f"Name: {name}"
)

print(
    "Favorite Genres:",
    ", ".join(favorite_genres)
)

print(
    "Favorite Cast:",
    ", ".join(favorite_cast)
)

print(
    "Favorite Movies:",
    ", ".join(favorite_movies)
)

print(
    "Recommendation Preferences:",
    preferences
)

print(
    f"\nSaved to: {PROFILE_FILE}"
)