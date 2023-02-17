import pokeImg from '../../assets/001.png';

export const Card = ({ id, name, types }) => {
  return (
    <div className="card-container">
      <div className="img-wrapper">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" />
      </div>
      <div className="card-info">
        <p>Nº {id}</p>
        <h3>{name}</h3>
      </div>
      <div className="type-wrapper">
        {/* <span className="type-pill">Grass</span>
        <span className="type-pill">Poison</span> */}
        {
          types?.map((data) =>
            <span className="type-pill">{data.type.name}</span>
          )
        }
      </div>
    </div>
  )
}