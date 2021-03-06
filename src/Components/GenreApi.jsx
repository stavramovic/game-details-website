import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenreCard from './GenreCard.jsx';
import '../sass/main.scss';

  

let date = new Date().toISOString().slice(0,10);
let d = new Date();
d.setFullYear(d.getFullYear()-5);
d.setMonth(d.getMonth() - d.getMonth());
d.setDate(d.getDay() - d.getDay()+1);
let oldDate = d.toISOString().slice(0,10);


function GenreAPI({genre}) {

  const [games, setGames] = useState([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page_size=20&genres=${genre}&ordering=-metacritic&dates=${oldDate},${date}`,
    };
  
      axios.request(options).then(response => {
      console.log(response.data);
      setGames(response.data.results);
    })
    .catch(error => console.error(error));
  }, [genre]);

return ( 
<div className='card-list'>
  {games.map(game => { 
    return (
      <GenreCard 
        key={game.id}
        name={game.name}
        backgroundImage={game.background_image}
        relDate={game.released}
        metacritic={game.metacritic}
        gameId={game.id}
        slug={game.slug}
      />
    );
  })}
  </div>
  )
}


export { GenreAPI };
