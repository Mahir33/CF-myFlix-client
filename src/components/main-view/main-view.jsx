import { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
    const [storedUser , setStoredUser] = useState(localStorage.getItem("user"));
    const [storedToken , setStoredToken] = useState(localStorage.getItem("token"));
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

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
        
    }, [token]);

    const onBackClick = () => {
        setSelectedMovie(null);
    }

    if (!user) {
        return (
            <>
                <LoginView 
                    onLogin={(user, token) => {
                    setUser(user)
                    setToken(token)
                    localStorage.setItem('user', user);
                    localStorage.setItem('token', JSON.stringify(token));
                    }
                } 
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
            <button onClick={() => {
                    setUser(null)
                    setToken(null)
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }}>Logout
            </button>
        </>
    );
}

export default MainView;