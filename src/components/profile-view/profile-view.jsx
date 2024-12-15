import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";

const ProfileView = ({ movies, user, token, onLoggedOut }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      fetch(`https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users/${user.Username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("User not found");
      })
      .then((data) => {
        setUserData(data);
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birthday);
        setFavoriteMovies(data.FavoriteMovies || []);
      })
      .catch((error) => console.error("Error fetching user data", error));
    }
  }, [user, token]);

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      }),
    })
    .then((response) => {
      if(response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    })
    .catch((error) => console.error("Error updating profile", error));
  };

  const handleDelete = () => {
    fetch(`https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.ok) {
        onLoggedOut();
        navigate("/");
        alert("Profile deleted successfully");
      } else {
        alert("Failed to delete the profile");
      }
    })
    .catch((error) => console.error("Error deleting profile:", error));
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      setFavoriteMovies(data.FavoriteMovies);
    })
    .catch((error) => console.error("Error removing from favorites", error));
  };

  if (!userData) return <div>Loading profile...</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="profile-view">
      <h2>Profile Details</h2>
      <hr />
      <h4>Current Data:</h4>
      <div>
        <p>Username:</p>
        <span>{userData.Username}</span>
      </div>
      <div>
        <p>Email:</p>
        <span>{userData.Email}</span>
      </div>
      <div>
        <p>Birthday:</p>
        <span>{formatDate(userData.Birthday)}</span>
      </div>
      <hr />
      <h4>Update Your Profile</h4>
      <Form onSubmit={handleUpdate} className="update-form">
        <Form.Group controlId="updateUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="updatePassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
      
        <Form.Group controlId="updateEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </Form.Group>
      
        <Form.Group controlId="updateBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control 
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required 
          />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>

      <hr />

      <h4>Delete Profile</h4>

      <Button className="delete-btn" variant="danger" onClick={handleDelete}>
        Delete Profile
      </Button>

      <hr />

      <h3>Favorite Movies</h3>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <ul className="list-unstyled">
          {favoriteMovies.map((movieId) => {
            const movie = movies.find((m) => m._id === movieId);
            return (
              <li key={movie._id} className="d-flex align-items-left fav-movie">
                <button className="remove-favorite-btn" onClick={() => handleRemoveFavorite(movie._id)}>
                    X
                </button>
                <Link to={`/movies/${movie._id}`} className="link">
                  <span>{movie.Title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProfileView;