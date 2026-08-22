/**
 * Mock data for the profile-setup flow.
 *
 * This mirrors the shape of ml/data/profile_options/cast.csv and
 * ml/data/profile_options/movies.csv (id + display fields) so this list can
 * later be swapped for a real API call without changing any component code —
 * just replace the array below with fetched data of the same shape.
 *
 * Nothing inside ml/ is read or modified here.
 */

export const GENRES = [
  { id: 'action', label: 'Action', icon: '⚔️' },
  { id: 'comedy', label: 'Comedy', icon: '😂' },
  { id: 'sci-fi', label: 'Sci-Fi', icon: '🚀' },
  { id: 'drama', label: 'Drama', icon: '🎭' },
  { id: 'romance', label: 'Romance', icon: '💘' },
  { id: 'horror', label: 'Horror', icon: '🔪' },
  { id: 'thriller', label: 'Thriller', icon: '🕵️' },
  { id: 'animation', label: 'Animation', icon: '🎨' },
  { id: 'fantasy', label: 'Fantasy', icon: '🧙' },
  { id: 'adventure', label: 'Adventure', icon: '🗺️' },
  { id: 'mystery', label: 'Mystery', icon: '🔍' },
  { id: 'crime', label: 'Crime', icon: '🕶️' },
  { id: 'documentary', label: 'Documentary', icon: '🎥' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'musical', label: 'Musical', icon: '🎵' },
]

export const POPULAR_ACTORS = [
  { id: 'rdj', name: 'Robert Downey Jr.' },
  { id: 'tom-holland', name: 'Tom Holland' },
  { id: 'chris-evans', name: 'Chris Evans' },
  { id: 'ryan-reynolds', name: 'Ryan Reynolds' },
  { id: 'leo-dicaprio', name: 'Leonardo DiCaprio' },
  { id: 'brad-pitt', name: 'Brad Pitt' },
  { id: 'denzel-washington', name: 'Denzel Washington' },
  { id: 'tom-hanks', name: 'Tom Hanks' },
  { id: 'dwayne-johnson', name: 'Dwayne Johnson' },
  { id: 'keanu-reeves', name: 'Keanu Reeves' },
  { id: 'christian-bale', name: 'Christian Bale' },
  { id: 'will-smith', name: 'Will Smith' },
  { id: 'morgan-freeman', name: 'Morgan Freeman' },
  { id: 'hugh-jackman', name: 'Hugh Jackman' },
]

export const POPULAR_ACTRESSES = [
  { id: 'scarlett-johansson', name: 'Scarlett Johansson' },
  { id: 'zendaya', name: 'Zendaya' },
  { id: 'emma-stone', name: 'Emma Stone' },
  { id: 'jennifer-lawrence', name: 'Jennifer Lawrence' },
  { id: 'margot-robbie', name: 'Margot Robbie' },
  { id: 'meryl-streep', name: 'Meryl Streep' },
  { id: 'natalie-portman', name: 'Natalie Portman' },
  { id: 'anne-hathaway', name: 'Anne Hathaway' },
  { id: 'emma-watson', name: 'Emma Watson' },
  { id: 'gal-gadot', name: 'Gal Gadot' },
  { id: 'viola-davis', name: 'Viola Davis' },
  { id: 'charlize-theron', name: 'Charlize Theron' },
  { id: 'florence-pugh', name: 'Florence Pugh' },
  { id: 'sandra-bullock', name: 'Sandra Bullock' },
]

export const POPULAR_MOVIES = [
  { id: 'interstellar', title: 'Interstellar', year: 2014, rating: 8.6, genre: 'Sci-Fi • Drama' },
  { id: 'dark-knight', title: 'The Dark Knight', year: 2008, rating: 9.0, genre: 'Action • Crime' },
  { id: 'inception', title: 'Inception', year: 2010, rating: 8.8, genre: 'Sci-Fi • Thriller' },
  { id: 'avengers', title: 'The Avengers', year: 2012, rating: 7.4, genre: 'Action • Sci-Fi' },
  { id: 'parasite', title: 'Parasite', year: 2019, rating: 8.5, genre: 'Thriller • Drama' },
  { id: 'la-la-land', title: 'La La Land', year: 2016, rating: 8.0, genre: 'Romance • Musical' },
  { id: 'shawshank', title: 'The Shawshank Redemption', year: 1994, rating: 9.3, genre: 'Drama' },
  { id: 'spiderman-nwh', title: 'Spider-Man: No Way Home', year: 2021, rating: 8.2, genre: 'Action • Adventure' },
  { id: 'whiplash', title: 'Whiplash', year: 2014, rating: 8.5, genre: 'Drama • Music' },
  { id: 'grand-budapest', title: 'The Grand Budapest Hotel', year: 2014, rating: 8.1, genre: 'Comedy • Adventure' },
  { id: 'get-out', title: 'Get Out', year: 2017, rating: 7.7, genre: 'Horror • Mystery' },
  { id: 'dune', title: 'Dune', year: 2021, rating: 8.0, genre: 'Sci-Fi • Adventure' },
  { id: 'coco', title: 'Coco', year: 2017, rating: 8.4, genre: 'Animation • Family' },
  { id: 'mad-max-fury-road', title: 'Mad Max: Fury Road', year: 2015, rating: 8.1, genre: 'Action • Adventure' },
]

export const PREFERENCE_OPTIONS = [
  { id: 'similar', label: 'Similar Movies', icon: '🎬' },
  { id: 'actors', label: 'Favorite Actors', icon: '👨' },
  { id: 'actresses', label: 'Favorite Actresses', icon: '👩' },
  { id: 'genre', label: 'Genre', icon: '🎭' },
  { id: 'ratings', label: 'Ratings', icon: '⭐' },
  { id: 'popularity', label: 'Popularity', icon: '🔥' },
]