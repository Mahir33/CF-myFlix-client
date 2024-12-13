import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import { Row, Col, Button } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  // Function to handle user logout
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-api-mahir-941afb3e93ba.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          ImagePath: movie.Image_url,
          Director: movie.Director?.Name || "Unknown Director",
          Genre: movie.Genre?.Name || "Unknown Genre",
          Description: movie.Description,
          Featured: movie.Featured,
          Actors: movie.Actors,
          ReleaseYear: movie.Year,
          Rating: movie.Rating,
        }));
        setMovies(moviesFromApi);
        console.log(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
      });
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center mt-5">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                  <Col md={12} className="text-center my-3">
                    <span>
                      <Link to="/signup">Click here to Signup</Link>
                    </span>
                  </Col>
                </Col>
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                  <Col md={12} className="text-center my-3">
                    <span>
                      <Link to="/login">Return to Login</Link>
                    </span>
                  </Col>
                </Col>
              )
            }
          />
<Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              user ? ( // Check if the user is logged in
                movies.length === 0 ? ( // Check if there are any movies
                  <div>The list is empty!</div> // Show a message if no movies are available
                ) : (
                  <>
                    <Row className="justify-content-md-center mt-5">
                      <Col xs={12} className="text-center">
                        <h1>Movie List</h1>
                      </Col>
                    </Row>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) =>
                            setSelectedMovie(newSelectedMovie)
                          }
                        />
                      </Col>
                    ))}
                  </>
                )
              ) : (
                <Navigate to="/login" /> // Redirect to login if user is not logged in
              )
            }
          />
        </Routes>
        {user && (
          <Col xs={12} className="text-left mt-3 mb-3">
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </Col>
        )}
      </Row>
    </BrowserRouter>
  );
};

export default MainView;