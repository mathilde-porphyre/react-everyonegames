// components/GamePage.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setGame(data));
  }, [id]);

  return game ? (
    <div>
      <Header />
      <div className='container'>
        <div className='game-page'>
          <h1>{game.name}</h1>
          <img src={game.background_image} alt={game.name} />
          <p>{game.description_raw}</p>
          <p>Platforms: {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
          <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
          <p>Release Date: {game.released}</p>
          <p>Developer: {game.developers[0].name}</p>
          <p>Age Rating: {game.esrb_rating ? game.esrb_rating.name : 'Not rated'}</p>
          <p>Tags: {game.tags.map(tag => tag.name).join(', ')}</p>
          {game.clip && <video src={game.clip.clip} controls />}
          {/* Other game details */}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default GamePage;