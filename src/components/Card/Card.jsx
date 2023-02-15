import pokeImg from '../../assets/001.png';

export const Card = () => {
  return (
    <div className="card-container">
      <div className="img-wrapper">
        <img src={pokeImg} alt="" />
      </div>
      <div className="card-info">
        <p>Nº 0001</p>
        <h3>Bulbasaur</h3>
      </div>
      <div className="type-wrapper">
        <span className="type-pill">Grass</span>
        <span className="type-pill">Poison</span>
      </div>
    </div>
  )
}