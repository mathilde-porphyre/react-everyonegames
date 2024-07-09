// components/Home.jsx

import { useEffect, useState, useRef, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GameCard from './GameCard';
import Header from './Header';
import Categories from './Categories';
import FeaturedGame from './FeaturedGame';
import GenreDropdown from './GenreDropdown';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function Home() {
    const [games, setGames] = useState([]);
    const [featuredGame, setFeaturedGame] = useState(null);
    const [page, setPage] = useState(1);
    const [ordering, setOrdering] = useState('');
    const [dates, setDates] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const observer = useRef();
    const [allGames, setAllGames] = useState([]);
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const [loading, setLoading] = useState(false);
  
    const lastGameElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
            setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
        }, [loading]);


    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01`;
    const endOfYear = `${currentYear}-12-31`;

    useEffect(() => {
        setDates(`${startOfYear},${endOfYear}`);
    }, []);

    const handleSearchChange = (newSearchQuery) => {
        setSearchQuery(newSearchQuery);
        setPage(1);
    }

    const resetState = () => {
        setSearchQuery('');
        setPage(1);
    }


    useEffect(() => {
        fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&page_size=40`)
          .then(response => response.json())
          .then(data => {
            setGenres(data.results);
          });
      }, []);


    const handleGenreChange = (newGenre) => {
        setGenre(newGenre);
        setGames([]);
        setPage(1);
    }


    useEffect(() => {
    setLoading(true);
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=20&ordering=${ordering}&dates=${dates}&search=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
        if (data.results && Array.isArray(data.results)) {
            const uniqueGames = data.results.filter(newGame => 
            !games.some(game => game.id === newGame.id) && 
            newGame.background_image
            );
            const newGames = [...games, ...uniqueGames];
            newGames.sort((a, b) => new Date(b.released) - new Date(a.released));
            setGames(newGames);
            setFeaturedGame(newGames[0]);

            const featuredGameId = newGames[0].id;
            fetch(`https://api.rawg.io/api/games/${featuredGameId}?key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setFeaturedGame(data);
            });
        }
        setLoading(false);
        });
    }, [page, ordering, dates, searchQuery]);


    const nextPage = () => {
        if (!loading) {
        setPage(prevPage => prevPage + 1);
        }
    };
  const prevPage = () => setPage(page > 1 ? page - 1 : page);


  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);


  const selectCategory = (category) => {
    switch (category) {
      case 'new':
        setOrdering('-released');
        setDates(`${startOfYear},${endOfYear}`);
        break;
      case 'nextWeek':
        setOrdering('-released');
        setDates(`${today.toISOString().split('T')[0]},${nextWeek.toISOString().split('T')[0]}`);
        break;
      case 'popular':
        setOrdering('-rating');
        setDates('');
        break;
      default:
        setOrdering('-released');
        setDates('');
    }
    setGames([]);
    setPage(1);
  };


  return (
    <div>
      <Header onSearchChange={handleSearchChange} onLogoClick={resetState} />
      {featuredGame && <FeaturedGame game={featuredGame} />}
      <div className="container">
        <div className="category">
            <Categories selectCategory={selectCategory} />
            <GenreDropdown onGenreChange={handleGenreChange} genres={genres} />
        </div>
        <InfiniteScroll
        dataLength={games.length}
        next={nextPage}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className='game-card-container'>
          {games.map((game, index) => <GameCard key={`${game.id}-${index}`} game={game} />)}
        </div>
      </InfiniteScroll>
    </div>
  </div>
);
  
}

export default Home;