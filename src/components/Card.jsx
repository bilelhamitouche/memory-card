import '../styles/Card.css';

export function Card({ handleClick, score, bestScore, title, url }) {
  return (
    <div
      className="card"
      onClick={handleClick}>
      <img
        className="card-image"
        src={url}
      />
      <p className="card-title">{title}</p>
    </div>
  );
}
