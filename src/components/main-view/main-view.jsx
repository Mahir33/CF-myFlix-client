import { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {

        if(!token) return;

        fetch("https://myflix-api-mahir-941afb3e93ba.herokuapp.com/movies", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(movies => {
            setMovies(movies)})
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
    }, [token]);

    const onBackClick = () => {
        setSelectedMovie(null);
    }

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }


    if (!user) {
        return (
            <>
                <LoginView 
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                    }}
                />
                or
                <SignupView />  
        </>
    );
    }

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
    
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
    return (
        <>
            <div>
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onMovieClick={() => {
                        setSelectedMovie(movie);
                    }} />
                ))}
            </div>
            <button onClick={handleLogout}>Logout
            </button>
        </>
    );
}

export default MainView;