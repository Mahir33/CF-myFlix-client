export const MovieView = ({movie, onBackClick}) => {
    console.log(movie);
    return (
        <>
            <div>
                <img className="movie-cover-img" src={movie.ImagePath} />
                <h1>{movie.Title}</h1>
                <div>{movie.Description}</div>
                <div>{movie.Genre}</div>
                <div>{movie.Director}</div>
            </div>
            <button onClick={onBackClick}>Back</button>
        </>
    )
}