import PropTypes from "prop-types";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const MovieCard = ({movie}) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} className="movie-card-img"/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button variant="link">
                Open
                </Button>
                </Link>
            </Card.Body> 
        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,

}

export default MovieCard;
