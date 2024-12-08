import PropTypes from "prop-types";
import { Card, CardBody, Button } from "react-bootstrap";

const MovieView = ({movie, onBackClick}) => {
    console.log(movie);
    return (
        <>
            <Card>
                <img className="movie-cover-img" src={movie.Image_url} alt={movie.Title} />
                <CardBody>
                    <h1>{movie.Title}</h1>
                    <p>{movie.Description}</p>
                    <p>{movie.Genre.Name}</p>
                    <p>{movie.Director.Name}</p>
                    <Button onClick={onBackClick} variant="dark" className="mt-3">Back</Button>
                </CardBody>
            </Card>
        </>
    )
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Image_url: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}

export default MovieView;