import { useEffect, useState } from 'react'
import api from './services/api';

import './css/App.css';
import { Card } from './components/Card/Card';


export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const official = "official-artwork";

  useEffect(() => {
    api.get("nidoqueen").then(({data}) => {
      setPokemon(data);
    })
    .catch(() => {
      console.log("error")
    });
  }, []);
  console.log(pokemon?.sprites.other.official)
  
  return (
    <div className="app-body">
      <main>
        <div className="main-content">
          <Card 
            id={pokemon?.id}
            name={pokemon?.name}
            types={pokemon?.types}
            // img={pokemon?.other}
          />
        </div>
      </main>
    </div>
  )
}
