import { useEffect, useState } from 'react'
import { Card } from './components/Card/Card';
import api from './services/api';

import searchInputImg from './assets/input-search.png';
import './css/App.css';


export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonNames, setPokemonNames] = useState(null);
  const [pokemonSearchInput, setPokemonSearchInput] = useState("");
  const [pokemonSearchResult, setPokemonSearchResult] = useState([{}])

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
    })
  }

  // console.log(pokemonSearchResult?.map((data) => (data)))
    
  return (
    <div className="app-body">
      <main>
        <header>
          <div className="header-content">
            <div className="header-primary">
              <label htmlFor="name-search">Nome ou número</label>
              <div className="input-wrapper">
                <input type="text" onChange={(e) => handlePokemonSearch(e)} name="name-search" />
                <button onClick={() => fetchResult()}>
                  <img src={searchInputImg} alt="" />
                </button>
              </div>
              <span>Use a pesquisa avançada para explorar Pokémon por tipo, fraqueza, habilidade e mais!</span>
            </div>
            <div className="header-secondary">
              <div className="green-tip">
                Realize a busca por Pokémon pelo nome ou usando o número do Pokédex Nacional.
              </div>
            </div>
          </div>
        </header>
        <div className="body-content">
          <div className="main-content">
            <div className="search-result">
              {
                pokemonSearchResult?.map((pokemon) => 
                  <Card
                    key={pokemon?.id}
                    id={pokemon?.id}
                    name={pokemon?.name}
                    types={pokemon?.types}
                  />
                )
              }
            </div>
          </div>
        </div>
      </main>
        
    </div>
  )
}
