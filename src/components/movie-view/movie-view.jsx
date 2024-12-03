import PropTypes from "prop-types";

const MovieView = ({movie, onBackClick}) => {
    console.log(movie);
    return (
        <>
            <div>
                <img className="movie-cover-img" src={movie.Image_url} />
                <h1>{movie.Title}</h1>
                <div>{movie.Description}</div>
                <div>{movie.Genre.Name}</div>
                <div>{movie.Director.Name}</div>
            </div>
            <button onClick={onBackClick}>Back</button>
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