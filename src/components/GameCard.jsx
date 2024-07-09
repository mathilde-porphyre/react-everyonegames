// components/GameCard.jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const GameCard = forwardRef(({ game }, ref) => {
  return (
    <motion.div ref={ref} whileHover={{ scale: 1.1 }} className='game-card'>
      <Link to={`/game/${game.id}`}>
        <img src={game.background_image} alt={game.name} />
        <div className='game-card-info'>
          <h2 className='game-card-title'>{game.name}</h2>
          <ReactStars
            count={5}
            value={game.rating}
            size={15}
            activeColor="#ffd700"
            isHalf={true}
            edit={false}
          />
          {/* Other game details #FEE3F9 */}
        </div>
      </Link>
    </motion.div>
  );
});

export default GameCard;