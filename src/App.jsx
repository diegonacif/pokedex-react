import { useEffect, useState } from 'react'
import api from './services/api';

import './css/App.css';
import { Card } from './components/Card/Card';


export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonNames, setPokemonNames] = useState(null);
  const [pokemonSearchInput, setPokemonSearchInput] = useState("");
  const [pokemonSearchResult, setPokemonSearchResult] = useState([])

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
    api.get("?limit=1279").then(({data}) => {
      setPokemon(data.results);
    })
      .catch(() => {
        console.log("error on get pokemon data")
      });
  }, [pokemonSearchInput]);

  function handlePokemonSearch(e) {
    setPokemonSearchInput(e.target.value);
  }

  // const searchResult = pokemonNames?.filter(name => name.includes(pokemonSearchInput))
  const searchResult = pokemon?.filter(poke => poke.name.includes(pokemonSearchInput))

  async function fetchResult() {
    setPokemonSearchResult([]);
    const search = await searchResult?.map(data => data.url);

    search.map((data) => {
      fetch(data)
      .then(response => response.json())
      .then((pokeData) => {
        setPokemonSearchResult(oldArray => [...oldArray, pokeData]);
      })
      // .then(function(pokeData){ console.log(pokeData) })
    })
  }

  console.log(pokemonSearchResult)
    
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
        <button onClick={() => fetchResult()}>button</button>
    </div>
  )
}
