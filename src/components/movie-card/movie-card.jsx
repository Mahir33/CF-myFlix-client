import PropTypes from "prop-types";
import { Card, Button, CardBody } from 'react-bootstrap';

const MovieCard = ({movie, onMovieClick}) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.Image_url} className="movie-card-img"/>
            <CardBody>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Button onClick={onMovieClick} variant="link">Open</Button>
            </CardBody> 
        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}

export default MovieCard;