import { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-api-mahir-941afb3e93ba.herokuapp.com/movies")
        .then(response => response.json())
        .then(data => {
            setMovies(data)})
        
    }, []);

    const onBackClick = () => {
        setSelectedMovie(null);
    }

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
    
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={() => {
                    setSelectedMovie(movie);
                }} />
            ))}
        </div>
    );
}

export default MainView;