import pandas as pd
import numpy as np
import re

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# ============================================================
# FILES
# ============================================================

PROFILE_FILE = "ml/data/user_profiles.csv"

MOVIE_FILE = "ml/data/movie_metadata/recommendation_movies.csv"


# ============================================================
# LOAD DATA
# ============================================================

users = pd.read_csv(PROFILE_FILE)

movies = pd.read_csv(MOVIE_FILE)

# Only English movies
movies = movies[
    movies["original_language"].fillna("").str.lower() == "en"
].copy()

movies.reset_index(drop=True, inplace=True)


# ============================================================
# MOOD → GENRES
# ============================================================

MOOD_GENRES = {

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


# ============================================================
# TEXT CLEANING
# ============================================================

def clean_text(text):

    if pd.isna(text):
        return ""

    text = str(text).lower()

    text = re.sub(
        r"[^a-z0-9\s]",
        " ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# ============================================================
# FIND USER
# ============================================================

def get_user_profile(name):

    name = clean_text(name)

    users["name_clean"] = users[
        "name"
    ].apply(clean_text)

    matches = users[
        users["name_clean"] == name
    ]

    if matches.empty:
        return None

    return matches.iloc[0]


# ============================================================
# CONVERT COMMA LIST TO PYTHON LIST
# ============================================================

def split_values(value):

    if pd.isna(value):
        return []

    return [
        clean_text(x)
        for x in str(value).split(",")
        if clean_text(x)
    ]


# ============================================================
# GENRE MATCH
# ============================================================

def genre_match(movie_genres, user_genres):

    movie_genres = clean_text(movie_genres)

    if not movie_genres:
        return 0

    matches = 0

    for genre in user_genres:

        if genre in movie_genres:
            matches += 1

    if not user_genres:
        return 0

    return matches / len(user_genres)


# ============================================================
# CAST MATCH
# ============================================================

def cast_match(movie_cast, favorite_cast):

    movie_cast = clean_text(movie_cast)

    if not movie_cast or not favorite_cast:
        return 0

    matches = 0

    for person in favorite_cast:

        person = clean_text(person)

        # Full name match
        if person in movie_cast:
            matches += 1

            continue

        # Match individual name parts
        name_parts = [
            part
            for part in person.split()
            if len(part) > 2
        ]

        if name_parts:

            matched_parts = sum(
                1
                for part in name_parts
                if part in movie_cast
            )

            if matched_parts == len(name_parts):
                matches += 1

    return min(
        matches / len(favorite_cast),
        1.0
    )


# ============================================================
# MOOD MATCH
# ============================================================

def mood_match(movie_genres, mood):

    if mood not in MOOD_GENRES:

        return 0

    movie_genres = clean_text(movie_genres)

    preferred = MOOD_GENRES[mood]

    matches = 0

    for genre in preferred:

        if genre in movie_genres:
            matches += 1

    return matches / len(preferred)


# ============================================================
# FAVORITE MOVIE SIMILARITY
# ============================================================

def calculate_movie_similarity(favorite_movies):

    # --------------------------------------------------------
    # Create rich movie text
    # --------------------------------------------------------

    movies["movie_text"] = (
        movies["title"].fillna("")
        + " "
        + movies["genres_clean"].fillna("")
        + " "
        + movies["overview"].fillna("")
        + " "
        + movies["top_cast"].fillna("")
    )

    movies["movie_text"] = movies[
        "movie_text"
    ].apply(clean_text)

    # --------------------------------------------------------
    # TF-IDF
    # --------------------------------------------------------

    vectorizer = TfidfVectorizer(
        stop_words="english",
        max_features=15000
    )

    tfidf_matrix = vectorizer.fit_transform(
        movies["movie_text"]
    )

    similarity_scores = np.zeros(
        len(movies)
    )

    # --------------------------------------------------------
    # Find each favorite movie
    # --------------------------------------------------------

    for favorite in favorite_movies:

        favorite_clean = clean_text(
            favorite
        )

        if not favorite_clean:
            continue

        # Exact title match
        exact_match = movies[
            movies["title"]
            .apply(clean_text)
            == favorite_clean
        ]

        if not exact_match.empty:

            favorite_index = (
                exact_match.index[0]
            )

            favorite_vector = tfidf_matrix[
                favorite_index
            ]

            scores = cosine_similarity(
                tfidf_matrix,
                favorite_vector
            ).flatten()

            similarity_scores = np.maximum(
                similarity_scores,
                scores
            )

            continue

        # ----------------------------------------------------
        # If exact movie doesn't exist,
        # search using individual words from title
        # ----------------------------------------------------

        title_words = [
            word
            for word in favorite_clean.split()
            if len(word) > 2
        ]

        if not title_words:
            continue

        title_mask = movies[
            "title"
        ].apply(
            lambda title:
            any(
                word in clean_text(title)
                for word in title_words
            )
        )

        possible_matches = movies[
            title_mask
        ]

        # If related title exists, use its content
        if not possible_matches.empty:

            for index in possible_matches.index:

                favorite_vector = tfidf_matrix[
                    index
                ]

                scores = cosine_similarity(
                    tfidf_matrix,
                    favorite_vector
                ).flatten()

                similarity_scores = np.maximum(
                    similarity_scores,
                    scores
                )

        # ----------------------------------------------------
        # No movie found
        # Give a small content-based signal
        # from the favorite movie name
        # ----------------------------------------------------

        else:

            favorite_vector = vectorizer.transform(
                [favorite_clean]
            )

            scores = cosine_similarity(
                tfidf_matrix,
                favorite_vector
            ).flatten()

            similarity_scores = np.maximum(
                similarity_scores,
                scores
            )

    return similarity_scores


# ============================================================
# NORMALIZE SCORE
# ============================================================

def normalize(series):

    minimum = series.min()

    maximum = series.max()

    if maximum == minimum:

        return pd.Series(
            np.zeros(len(series)),
            index=series.index
        )

    return (
        (series - minimum)
        / (maximum - minimum)
    )


# ============================================================
# RECOMMEND MOVIES
# ============================================================

def recommend_movies(
    profile,
    movie_df,
    mood,
    preferred_genre,
    top_n=5
):
    movies = movie_df.copy()

    favorite_genres = split_values(
        profile["favorite_genres"]
    )

    favorite_cast = split_values(
        profile["favorite_cast"]
    )

    favorite_movies = split_values(
        profile["favorite_movies"]
    )

    # --------------------------------------------------------
    # Similarity
    # --------------------------------------------------------

    similarity = calculate_movie_similarity(
        favorite_movies
    )

    movies["similarity_score"] = similarity


    # --------------------------------------------------------
    # Genre
    # --------------------------------------------------------

    movies["genre_score"] = movies[
        "genres_clean"
    ].apply(
        lambda x:
        genre_match(
            x,
            favorite_genres
        )
    )


    # --------------------------------------------------------
    # Cast
    # --------------------------------------------------------

    movies["cast_score"] = movies[
        "top_cast"
    ].apply(
        lambda x:
        cast_match(
            x,
            favorite_cast
        )
    )


    # --------------------------------------------------------
    # Mood
    # --------------------------------------------------------

    movies["mood_score"] = movies[
        "genres_clean"
    ].apply(
        lambda x:
        mood_match(
            x,
            mood
        )
    )


    # --------------------------------------------------------
    # Current genre
    # --------------------------------------------------------

    preferred_genre = clean_text(
        preferred_genre
    )

    movies["current_genre_score"] = movies[
        "genres_clean"
    ].apply(
        lambda x:
        1 if preferred_genre
        and preferred_genre in clean_text(x)
        else 0
    )


    # --------------------------------------------------------
    # Rating
    # --------------------------------------------------------

    movies["rating_normalized"] = normalize(
        movies["vote_average"]
    )


    # --------------------------------------------------------
    # Popularity
    # --------------------------------------------------------

    movies["popularity_normalized"] = normalize(
        movies["popularity"]
    )


    # ========================================================
    # FINAL SCORE
    # ========================================================

    movies["personalized_score"] = (

        movies["similarity_score"] * 0.30

        + movies["cast_score"] * 0.30

        + movies["genre_score"] * 0.20

        + movies["mood_score"] * 0.10

        + movies["rating_normalized"] * 0.07

        + movies["popularity_normalized"] * 0.03
    )


    # --------------------------------------------------------
    # Current genre boost
    # --------------------------------------------------------

    movies.loc[
        movies["current_genre_score"] == 1,
        "personalized_score"
    ] += 0.10


    # --------------------------------------------------------
    # Remove user's exact favorite movies
    # --------------------------------------------------------

    favorite_clean = [
        clean_text(movie)
        for movie in favorite_movies
    ]

    movies = movies[
        ~movies["title"]
        .apply(clean_text)
        .isin(favorite_clean)
    ]


    # --------------------------------------------------------
    # Sort
    # --------------------------------------------------------

    recommendations = movies.sort_values(
        "personalized_score",
        ascending=False
    ).head(top_n)


    return recommendations


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    print("================================")
    print(" PERSONALIZED MOVIE SYSTEM")
    print("================================")


    # --------------------------------------------------------
    # USER
    # --------------------------------------------------------

    name = input(
        "\nEnter your name: "
    )


    profile = get_user_profile(
        name
    )


    if profile is None:

        print(
            "\nUser not found."
        )

        exit()


    # --------------------------------------------------------
    # PROFILE
    # --------------------------------------------------------

    print(
        "\n========== USER PROFILE =========="
    )

    print(
        "Name:",
        profile["name"]
    )

    print(
        "Favorite Genres:",
        profile["favorite_genres"]
    )

    print(
        "Favorite Cast:",
        profile["favorite_cast"]
    )

    print(
        "Favorite Movies:",
        profile["favorite_movies"]
    )

    print(
        "Preferences:",
        profile["recommendation_preferences"]
    )


    # --------------------------------------------------------
    # MOOD
    # --------------------------------------------------------

    print(
        "\nAvailable moods:"
    )

    print(
        ", ".join(
            MOOD_GENRES.keys()
        )
    )

    mood = input(
        "\nEnter your current mood: "
    ).lower().strip()


    # --------------------------------------------------------
    # GENRE
    # --------------------------------------------------------

    print(
        "\nAvailable genres:"
    )

    print(
        "action, adventure, animation, comedy,"
        " crime, drama, fantasy, horror, mystery,"
        " romance, science fiction, thriller, war"
    )

    preferred_genre = input(
        "\nEnter your preferred genre: "
    ).strip()


    # --------------------------------------------------------
    # RECOMMEND
    # --------------------------------------------------------

    recommendations = recommend_movies(
        profile,
        movies,
        mood,
        preferred_genre,
        top_n=5
    )


    # --------------------------------------------------------
    # DISPLAY
    # --------------------------------------------------------

    print(
        "\n========== PERSONALIZED RECOMMENDATIONS =========="
    )


    for i, (_, movie) in enumerate(
        recommendations.iterrows(),
        start=1
    ):

        print(
            f"\n{i}. {movie['title']}"
        )

        print(
            "Language:",
            movie["original_language"]
        )

        print(
            "Genres:",
            movie["genres_clean"]
        )

        print(
            "Rating:",
            movie["vote_average"]
        )

        print(
            "Release Date:",
            movie["release_date"]
        )

        print(
            "Personalized Score:",
            f"{movie['personalized_score'] * 100:.2f}"
        )