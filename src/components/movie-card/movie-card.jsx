import PropTypes from "prop-types";

const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div>
            <p onClick={onMovieClick}>{movie.Title}</p>
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}

export default MovieCard;