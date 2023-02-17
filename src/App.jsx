import { useEffect, useState } from 'react'
import api from './services/api';

import './css/App.css';
import { Card } from './components/Card/Card';


export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonNames, setPokemonNames] = useState(null);
  const [pokemonSearchInput, setPokemonSearchInput] = useState("");

   // Get Pokemon names list
  useEffect(() => {
    //?limit=1279
    api.get("?limit=1279").then(({data}) => {
      setPokemonNames(
        data?.results.map(data => data.name)
      );
    })
    .catch(() => {
      console.log("error on getting names")
    });
  }, []);

  // Get Pokemon By Name
  useEffect(() => {
    api.get("bulbasaur").then(({data}) => {
      setPokemon(data);
    })
    .catch(() => {
      console.log("error on get pokemon data")
    });
  }, []);

  function handlePokemonSearch(e) {
    setPokemonSearchInput(e.target.value);
  }

  function matchName(name) {
    if (name === pokemonSearchInput) {
      return name;
    }
  }

  const searchResult = pokemonNames?.filter(name => name.includes(pokemonSearchInput))

  console.log(searchResult)
    
  return (
    <div className="app-body">
      <main>
        <div className="main-content">
          <input type="text" onChange={(e) => handlePokemonSearch(e)} />
          <Card 
            id={pokemon?.id}
            name={pokemon?.name}
            types={pokemon?.types}
          />
        </div>
      </main>
    </div>
  )
}
