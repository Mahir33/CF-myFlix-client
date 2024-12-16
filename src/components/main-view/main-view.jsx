import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Col, Row, Container } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import ProfileView from '../profile-view/profile-view';
import SearchBar from '../search-bar/search-bar';
import NavigationBar from '../navigation-bar/navigation-bar';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-api-mahir-941afb3e93ba.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((moviesFromApi) => {
      setMovies(moviesFromApi);
      setFilteredMovies(moviesFromApi);
    });
  }, [token]);

  const handleSearch = (searchTerm) => {
    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route 
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }} /> 
                    </Col>
                  )}
                </>
              }
            />
            <Route 
              path="/users"
              element={
                <>
                  {user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
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
                      <SearchBar onSearch={handleSearch} />
                      <MovieView movies={movies} user={user} token={token} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <>
                      <Row className="justify-content-center">
                        <Col md={6}>
                          <SearchBar onSearch={handleSearch} />
                        </Col>
                      </Row>
                      <Row>
                        {filteredMovies.length === 0 ? (
                          <Col>The list is empty!</Col>
                        ) : (
                          filteredMovies.map((movie) => (
                            <Col md={3} key={movie._id}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))
                        )}
                      </Row>
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={8}>
                      <ProfileView movies={movies} user={user} token={token} onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }} />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;