// components/Categories.jsx
import React from 'react';

function Categories({ selectCategory }) {
  const handleCategoryClick = (category) => {
    selectCategory(category);
  };

  return (
    <div className='filters'>
      <button onClick={() => handleCategoryClick('new')}>New Releases</button>
      <button onClick={() => handleCategoryClick('nextWeek')}>Next Week Releases</button>
      <button onClick={() => handleCategoryClick('popular')}>Popular Games</button>
    </div>
  );
}

export default Categories;