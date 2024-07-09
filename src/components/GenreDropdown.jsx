import React from 'react';

const GenreDropdown = ({ onGenreChange, genres }) => {
  const handleChange = (event) => {
    onGenreChange(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">All Genres</option>
      {genres.map(genre => (
        <option key={genre.id} value={genre.slug}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;