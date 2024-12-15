import { useParams } from "react-router";
import { Link } from "react-router";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './movie-view.scss'; // Import custom SCSS

const MovieView = ({ movies, user, token, onFavoriteAdded }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movieId));

  const handleAddFavorite = () => {
    fetch(`https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users/${user.Username}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FavoriteMovies: movieId }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setIsFavorite(true);
      onFavoriteAdded(data.FavoriteMovies);
    })
    .catch((error) => console.error("Error adding to favorites", error));
  };

  return (
    <Container fluid className="vh-75 d-flex justify-content-center align-items-center mt-3 custom-margin-top">
      <Row className="w-100">
        <Col md={6} className="d-flex justify-content-center">
          <img className="movie-image img-fluid" src={movie.Image_url} alt={movie.Title} />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center text-left">
          <div>
            <h2 className="font-weight-bold">Title: <span className="font-weight-normal">{movie.Title}</span></h2>
          </div>
          <div>
            <h4 className="font-weight-bold">Description: <span className="font-weight-normal">{movie.Description}</span></h4>
          </div>
          <div>
            <h4 className="font-weight-bold">Director: <span className="font-weight-normal">{movie.Director.Name}</span></h4>
          </div>
          <div>
            <h4>Genre: <span className="font-weight-normal">{movie.Genre.Name}</span></h4>
          </div>
          <div className="mt-3">
          <div>
            <Button onClick={handleAddFavorite} disabled={isFavorite} variant="primary">
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </Button>
          </div>
          <div className="mt-2">
            <Link to={'/'}>
              <Button className="back-button" variant="dark">Back</Button>
            </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieView;