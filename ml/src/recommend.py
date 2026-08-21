import pandas as pd
import joblib
import re


# -----------------------------------
# 1. Load MovieLens movie data
# -----------------------------------

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


# -----------------------------------
# 2. Load ML model
# -----------------------------------

model = joblib.load(
    "ml/models/movie_recommendation_model.pkl"
)


# -----------------------------------
# 3. Load user profiles
# -----------------------------------

users = pd.read_csv(
    "ml/data/feature_engineered_users.csv"
)


# -----------------------------------
# 4. Genre columns
# -----------------------------------

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


# -----------------------------------
# 5. Mood → genres
# -----------------------------------

mood_genres = {

    "happy": [
        "comedy",
        "animation",
        "musical"
    ],

    "sad": [
        "drama",
        "romance"
    ],

    "excited": [
        "action",
        "adventure",
        "thriller"
    ],

    "romantic": [
        "romance",
        "comedy"
    ],

    "scared": [
        "horror",
        "thriller",
        "mystery"
    ],

    "relaxed": [
        "comedy",
        "drama",
        "romance"
    ]
}


# -----------------------------------
# 6. Clean text
# -----------------------------------

def clean_text(text):

    if pd.isna(text):
        return ""

    text = str(text).lower()

    text = re.sub(
        r"[\n\r]+",
        " ",
        text
    )

    return text.strip()


# -----------------------------------
# 7. Find user
# -----------------------------------

def get_user_profile(name):

    name = clean_text(name)

    users["name_clean"] = users[
        "What is your name?"
    ].apply(clean_text)

    matches = users[
        users["name_clean"] == name
    ]

    if matches.empty:
        return None

    return matches.iloc[0]


# -----------------------------------
# 8. Personalized recommendation
# -----------------------------------

def recommend_movies(
    user_profile,
    mood,
    genre,
    top_n=5
):

    mood = mood.lower().strip()
    genre = genre.lower().strip()

    # Validate mood
    if mood not in mood_genres:

        print("\nInvalid mood.")

        return None

    # Validate genre
    if genre not in genre_columns:

        print("\nInvalid genre.")

        return None


    # -----------------------------------
    # Filter selected genre
    # -----------------------------------

    candidates = movies[
        movies[genre] == 1
    ].copy()


    if candidates.empty:

        print(
            "\nNo movies found."
        )

        return None


    # -----------------------------------
    # ML prediction
    # -----------------------------------

    probabilities = model.predict_proba(
        candidates[genre_columns]
    )

    candidates["ml_score"] = probabilities[:, 1]


    # -----------------------------------
    # Mood score
    # -----------------------------------

    preferred_moods = mood_genres[mood]

    candidates["mood_score"] = 0.0

    for preferred_genre in preferred_moods:

        candidates["mood_score"] += (
            candidates[preferred_genre]
            * 0.10
        )


    # -----------------------------------
    # User genre preference
    # -----------------------------------

    user_genres = clean_text(
        user_profile["genres"]
    )

    candidates["profile_score"] = 0.0


    if genre in user_genres:

        candidates["profile_score"] += 0.20


    # -----------------------------------
    # Final score
    # -----------------------------------

    candidates["recommendation_score"] = (

        candidates["ml_score"] * 0.60

        +

        candidates["mood_score"] * 0.20

        +

        candidates["profile_score"] * 0.20
    )


    # -----------------------------------
    # Sort
    # -----------------------------------

    recommendations = candidates.sort_values(
        "recommendation_score",
        ascending=False
    )


    recommendations = recommendations.drop_duplicates(
        subset=["title"]
    )


    recommendations = recommendations.head(
        top_n
    )


    return recommendations[
        [
            "movie_id",
            "title",
            "release_date",
            "recommendation_score"
        ]
    ]


# -----------------------------------
# 9. Main program
# -----------------------------------

if __name__ == "__main__":

    print(
        "================================"
    )

    print(
        " PERSONALIZED MOVIE SYSTEM"
    )

    print(
        "================================"
    )


    # User

    name = input(
        "\nEnter your name: "
    )


    user_profile = get_user_profile(
        name
    )


    if user_profile is None:

        print(
            "\nUser not found."
        )

        exit()


    print(
        "\nUser found:",
        user_profile[
            "What is your name?"
        ]
    )


    # Mood

    print(
        "\nAvailable moods:"
    )

    print(
        ", ".join(
            mood_genres.keys()
        )
    )


    mood = input(
        "\nEnter your current mood: "
    )


    # Genre

    print(
        "\nAvailable genres:"
    )

    print(
        ", ".join(
            genre_columns
        )
    )


    genre = input(
        "\nEnter your preferred genre: "
    )


    # Recommendation

    recommendations = recommend_movies(
        user_profile,
        mood,
        genre,
        top_n=5
    )


    if recommendations is not None:

        print(
            "\n========== PERSONALIZED RECOMMENDATIONS =========="
        )


        for _, movie in recommendations.iterrows():

            print(
                f"\n{movie['title']}"
            )

            print(
                f"Release Date: "
                f"{movie['release_date']}"
            )

            print(
                f"Personalized Score: "
                f"{movie['recommendation_score']:.2f}"
            )