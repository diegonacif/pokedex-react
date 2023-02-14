import { useEffect, useState } from 'react'
import api from './services/api';

import './css/App.css';


export const App = () => {
  const [id, setId] = useState(0);
  const [list, setList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.get(id).then(({data}) => {
      setPokemon(data);
    })
    .catch(() => {
      console.log("error")
    });
  }, [id]);
  console.log(pokemon)

  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="specs">
        <span>ID #{pokemon?.id}</span>
        <span>Altura {pokemon?.height}</span>
        <span>Peso {pokemon?.weight}</span>
        <div className="row-wp">
          <span>Habilidades</span>
          {
            pokemon?.abilities?.map((item) =>
              <span>{item.ability.name}</span>
            )
          }
        </div>
        <div className="row-wp">
        <span>Tipos</span>
          {
            pokemon?.types?.map((item) =>
              <span>{item.type.name}</span>
            )
          }
        </div>
      </div>

      <div className="poke-space">
        <span className="poke-name">{pokemon?.name}</span>
        <img src={pokemon?.sprites?.front_default} alt="" />
        <input type="number" onChange={handleChange} />
      </div>

      <div className="stats">
        {
          pokemon?.stats?.map((item) =>
            <span>{item.stat.name}: {item.base_stat}</span>
          )
        }
      </div>

      
    </div>
  )
}
