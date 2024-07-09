// components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-1.svg';

function Header(props) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    props.onSearchChange(searchValue);
  };

  return (
    <header>
      <div className='container'>
      <Link to="/" onClick={props.onLogoClick} >
        <h1 className='logo'><img className='logo-picto' src={logo} alt="Logo" />CyberGames</h1>
      </Link>
        <form onSubmit={handleSearchSubmit}>
          <input className='search-bar' type="search" placeholder="Search..." value={searchValue} onChange={handleSearchChange} />
        </form>
      </div>
    </header>
  );
}

export default Header;