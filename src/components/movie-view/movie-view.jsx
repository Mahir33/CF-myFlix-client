import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const MovieView = ({movie, onBackClick}) => {
    console.log(movie);
    return (
        <>
            <Card>
                <img className="movie-cover-img" src={movie.ImagePath} alt={movie.Title} />
                <Card.Body>
                    <h1>{movie.Title}</h1>
                    <p>{movie.Description}</p>
                    <p>{movie.Genre}</p>
                    <p>{movie.Director}</p>
                    <Button onClick={onBackClick} variant="dark" className="mt-3">Back</Button>
                </Card.Body>
            </Card>
        </>
    )
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}

export default MovieView;