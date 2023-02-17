import { useEffect, useState } from 'react'
import api from './services/api';

import './css/App.css';
import { Card } from './components/Card/Card';


export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonNames, setPokemonNames] = useState(null);
  const [pokemonSearchInput, setPokemonSearchInput] = useState("");
  const [pokemonShownList, setPokemonShownList] = useState(null);

  // Get Pokemon names list
  useEffect(() => {
    //?limit=1279
    api.get("?limit=1279").then(({ data }) => {
      setPokemonNames(
        data?.results.map(data => data.name)
      );
    })
      .catch(() => {
        console.log("error on getting names")
      });
  }, []);

  // Get all Pokemon
  useEffect(() => {
    api.get("?limit=1279").then(({ data }) => {
      setPokemon(data);
    })
      .catch(() => {
        console.log("error on get pokemon data")
      });
  }, [pokemonSearchInput]);

  function handlePokemonSearch(e) {
    setPokemonSearchInput(e.target.value);
  }

  // function matchName(name) {
  //   if (name === pokemonSearchInput) {
  //     return name;
  //   }
  // }

  // const searchResult = pokemonNames?.filter(name => name.includes(pokemonSearchInput))

  console.log(pokemon?.results.map(data => data.name.indexOf("ivysaur")))

  return (
    <div className="app-body">
      <main>
        <div className="main-content">
          <input type="text" onChange={(e) => handlePokemonSearch(e)} />
          {
            pokemon?.results.map(pokemon => {
              <Card
                // id={pokemon?.id}
                name={pokemon?.name}
                types={pokemon?.types}
              />
            })
          }
          {/* <Card 
            id={pokemon?.id}
            name={pokemon?.name}
            types={pokemon?.types}
          /> */}
        </div>
      </main>
    </div>
  )
}
