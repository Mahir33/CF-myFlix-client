import { useParams } from "react-router";
import { Link } from "react-router"

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
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
      <Link to={'/'}>
      <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

export default MovieView;