import { useParams } from "react-router";
import { Link } from "react-router";
import { useState } from "react";

const MovieView = ({ movies, user, token, onFavoriteAdded }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movieId));

  const handleAddFavorite = () => {
    fetch(`https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users/${user.Username}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FavoriteMovies: movieId }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setIsFavorite(true);
      onFavoriteAdded(data.FavoriteMovies);
    })
    .catch((error) => console.error("Error adding to favorites", error));
  };

  return (
    <div>
      <div>
        <img className="w-100" src={movie.Image_url} alt={movie.Title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <button onClick={handleAddFavorite} disabled={isFavorite}>
        {isFavorite ? "Added to Favorites" : "Add to Favorites"}
      </button>
      <Link to={'/'}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

export default MovieView;