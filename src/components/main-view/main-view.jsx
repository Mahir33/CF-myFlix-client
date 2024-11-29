import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: 1,
            Title: 'Inception',
            Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            Genre: 'Science Fiction',
            Director: 'Christopher Nolan',
            ImagePath: 'https://play-lh.googleusercontent.com/kSeBtvMBvS9P9jSwP-bVNmrH8yANJeKZrbxUIiw6zSOpRibxBn1IP7PEHrDeoIz0AmQPddbRPMEgh8KL8ohd=w240-h480-rw'
        },
        {
            _id: 2,
            Title: 'The Shawshank Redemption',
            Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            Genre: 'Drama',
            Director: 'Frank Darabont',
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
        },
        {
            _id: 3,
            Title: 'Gladiator',
            Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
            Genre: 'Action',
            Director: 'Ridley Scott',
            ImagePath: 'https://dvvy6louqcr7j.cloudfront.net/vista/HO00015229/heroPoster/gladiator-ii.png'
        }
    ])
    const [selectedMovie, setSelectedMovie] = useState(null);

    const onMovieClick = (movie) => {
        setSelectedMovie(movie);
        
    }

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