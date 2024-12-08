import { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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



    
    return (
        <Row className='d-flex justify-content-center align-items-center min-vh-100'>
            {!user ? (
                <>
                    <Col md={5} className='"d-flex flex-column justify-content-center align-items-center'>
                            <LoginView 
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                    localStorage.setItem("user", JSON.stringify(user));
                                    localStorage.setItem("token", token);
                                }}/>
                        <div className='text-center my-3 uppercase-text'>OR</div>                                
                    
                        <SignupView />
                    </Col>  
            </>
            ) : selectedMovie ? (
                <>
                <Row className="d-flex justify-content-center align-items-center h-100 g-0 p-1">
                    <Col xs={12} sm={12} md={10} lg={6} className="custom-height">
                        <MovieView movie={selectedMovie} onBackClick={onBackClick} />
                    </Col>
                </Row>
                </>
            ) : movies.length === 0 ? (
                <div className="main-view">The list is empty!</div>
            ) : (
                <>
                <Row className="justify-content-md-center g-0">
                        {movies.map(movie => (
                            <Col key={movie._id} md={3} className='mb-4 g-2'>
                                <MovieCard movie={movie} onMovieClick={() => {
                                    setSelectedMovie(movie);
                                }} />
                            </Col>
                        ))}
                    
                </Row>
                <Button onClick={handleLogout} variant="primary" className='mx-auto w-auto mt-3 mb-4'>Logout</Button>
                </>
            )}
            
        
        </Row>
    );
}

export default MainView;