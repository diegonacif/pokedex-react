import { useEffect, useState } from 'react';
import pokeImg from '../../assets/001.png';

export const Card = ({ id, name, types }) => {

  //Formatting Id numbers
  const [formatedId, setFormatedId] = useState(0);
  useEffect(() => {
    if(id < 10) {
      setFormatedId(`000${id}`)
    } else if(id < 100) {
      setFormatedId(`00${id}`)
    } else if(id < 1000) {
      setFormatedId(`0${id}`)
    } else {
      setFormatedId(id)
    }
  }, [])

  return (
    <div className="card-container" key={`card-${id}`}>
      <div className="img-wrapper">
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
          alt={`${name?.charAt(0).toUpperCase() + name?.slice(1)} image`} 
          loading="lazy"
        />
      </div>
      <div className="card-info">
        <p>Nº {formatedId}</p>
        <h5>{name?.charAt(0).toUpperCase() + name?.slice(1)}</h5>
      </div>
      <div className="type-wrapper">
        {
          types?.map((data) =>
            <span className={`type-pill ${data.type.name}-type`} key={`${data.type.name}-${id}`}>{data.type.name?.charAt(0).toUpperCase() + data.type.name?.slice(1)}</span>
          )
        }
      </div>
    </div>
  )
}