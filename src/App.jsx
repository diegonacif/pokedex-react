import { useEffect, useState } from 'react'
import { Card } from './components/Card/Card';
import api from './services/api';

import Dropdown from 'react-dropdown';
import searchInputImg from './assets/input-search.png';

import whitePokeball from './assets/white-pokeball-icon.png';
import whiteReload from './assets/reload-icon.svg';

import './css/App.css';
import 'react-dropdown/style.css';


export const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonNames, setPokemonNames] = useState(null);
  const [pokemonSearchInput, setPokemonSearchInput] = useState("");
  const [pokemonSearchResult, setPokemonSearchResult] = useState([{}])
  

  // Get Pokemon names list
  useEffect(() => {
    //?limit=1279
    // api.get("?limit=1279").then(({ data }) => {
    api.get("?limit=250").then(({ data }) => {
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
    // api.get("?limit=1279").then(({data}) => {
    api.get("?limit=250").then(({data}) => {
      setPokemon(data.results);
    })
      .catch(() => {
        console.log("error on get pokemon data")
      });
  }, []);

  function handlePokemonSearch(e) {
    setPokemonSearchInput(e.target.value.toLowerCase());
  }

  async function fetchResult() {
    const searchResult = await pokemon?.filter(poke => poke.name.includes(pokemonSearchInput));

    setPokemonSearchResult([]);

    const search = await searchResult?.map(data => data.url);

    search?.map((data) => {
      fetch(data)
      .then(response => response.json())
      .then((pokeData) => {
        setPokemonSearchResult(oldArray => [...oldArray, pokeData]);
      })
    })
  }

  useEffect(() => {
    // console.log(pokemon)

    fetchResult();
  }, [pokemon])
  
  // Dropdown config
  const options = [
    'Menor número primeiro', 'Maior número primeiro', 'A-Z', 'Z-A'
  ];
  const dropdownDefaultOption = options[0];

  // Focused Input
  const [isFocusedInput, setIsFocusedInput] = useState(false);

  // Suggester Data
  const [suggesterData, setSuggesterData] = useState([]);
  useEffect(() => {
    setSuggesterData(pokemonNames?.filter(poke => poke.includes(pokemonSearchInput)))
  }, [pokemonSearchInput])

  return (
    <div className="app-body">
      <main>
        <header>
          <div className="header-content">
            <div className="header-primary">
              <label htmlFor="name-search">Nome ou número</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  onChange={(e) => handlePokemonSearch(e)} 
                  onFocus={() => setIsFocusedInput(true)}
                  onBlur={() => setIsFocusedInput(false)}
                  name="name-search" 
                  id="name-search"
                />
                {
                  isFocusedInput && pokemonSearchInput?
                  <div className="input-suggester">
                    {
                      suggesterData.map(names => 
                        <span>{names}</span>
                      )
                    }
                    {/* <span>Teste</span>
                    <span>Teste</span>
                    <span>Teste</span> */}
                  </div> :
                  null
                }
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
        <div className="advanced-search-container">
          <div className="advanced-search-wrapper">
            <span>Mostrar busca avançada</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="body-content">
          <div className="main-content">
            <div className="buttons-wrapper">
              <button id="surprise-button">
                <img src={whiteReload} alt="" />
                <span>Surpreenda-me</span>
              </button>
              <div className="sort-wrapper">
                <span>Organizar por</span>
                <div className="dropdown-wrapper">
                  <img src={whitePokeball} alt="" />
                  <Dropdown 
                    className='sort-root'
                    controlClassName='sort-control'
                    menuClassName='sort-menu'
                    options={options} 
                    value={dropdownDefaultOption} 
                    placeholder="Select an option"
                    id="sort-button"
                  />
                </div>
                {/* <select id="sort-button">
                  <option>Menor número primeiro</option>
                </select> */}
              </div>
            </div>
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
