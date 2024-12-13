import PropTypes from "prop-types";
import { Link, useParams } from "react-router";
import { Card, Button } from "react-bootstrap";

const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies ? movies.find((b) => b.id === movieId) : null;

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <Card>
            <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
            <Card.Body>
                <h1>{movie.Title}</h1>
                <p>{movie.Description}</p>
                <p>{movie.Genre}</p>
                <p>{movie.Director}</p>
                <Link to={`/`}>
                    <Button variant="dark" className="mt-3">Back</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
            Genre: PropTypes.string.isRequired,
            Director: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default MovieView;