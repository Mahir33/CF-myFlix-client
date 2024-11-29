const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div>
            <p onClick={onMovieClick}>{movie.Title}</p>
        </div>
    )
}

export default MovieCard;