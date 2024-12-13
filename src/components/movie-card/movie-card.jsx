import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";

const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite }) => {

  return (
    <Card className="h100">
      <Card.Img variant="top" style={{height: "300px", objectFit: "cover"}} src={movie.Image_url} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Link to ={`/movies/${encodeURIComponent(movie._id)}`}>
        <Button variant="link">Open</Button>
        </Link> 

        {/* favorite button */}
        <Button 
          variant="primary"
          onClick={onAddFavorite}>
            Add to Favorites 
          </Button>

          {/* Remove Favorite Button */}
          <Button 
          variant="danger"
          onClick={onRemoveFavorite}>
            Remove from Favorites
          </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Image_url: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }).isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
};

export default MovieCard;