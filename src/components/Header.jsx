import '../styles/Header.css';

export default function Header({ score, bestScore }) {
  return (
    <div className="header">
      <h1>Marvel Memory Card</h1>
      <div className="score-container">
        <span className="score">Score: {score}</span>
        <span className="best-score">Best score: {bestScore}</span>
      </div>
    </div>
  );
}
