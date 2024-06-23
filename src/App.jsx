import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Card } from './components/Card';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isClicked, setIsClicked] = useState([]);

  useEffect(() => {
    const fetchCharacters = async (url) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, { mode: 'cors' });
        const json = await response.json();
        const data = await json.data.results;
        setCharacters(data);
        const isClicked = data.map((item) => {
          return { id: item.id, clicked: false };
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters(
      'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2e91b5a077f2178de00a9e2b528d8a44&hash=e23dc9bad7df8f86dac8aa7095f1dcae',
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  function shuffleArray() {
    let shuffled = [...characters];
    if (characters.length) {
      for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    }
    setCharacters(shuffled);
  }

  function handleClick(id) {
    let currentCardClick;
    for (const obj of isClicked) {
      if (obj.id === id) {
        currentCardClick = obj;
        break;
      }
    }
    if (!currentCardClick) {
      currentCardClick = { id: id, clicked: false };
    }
    if (!currentCardClick.clicked) {
      setIsClicked([
        ...isClicked,
        {
          id: id,
          clicked: true,
        },
      ]);
      setScore((prevScore) => prevScore + 1);
    } else if (currentCardClick.clicked === true) {
      setScore(0);
      const updatedIsClicked = isClicked.map((item) => ({
        ...item,
        clicked: false,
      }));
      setIsClicked(updatedIsClicked);
    }
    shuffleArray();
  }

  if (isLoading) {
    return (
      <div className="App">
        <div>Loading...</div>
      </div>
    );
  } else if (error) {
    return <div className="error">Error: {error}</div>;
  } else {
    return (
      <div className="App">
        <Header
          score={score}
          bestScore={bestScore}
        />
        <main className="cards">
          {characters.map((character) => {
            return (
              <Card
                key={character.id}
                handleClick={() => handleClick(character.id)}
                score={score}
                bestScore={bestScore}
                title={character.name}
                url={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              />
            );
          })}
        </main>
        <footer>
          <p>
            Data provided by <a href="https://marvel.com">Marvel</a>. &copy;
            2014 Marvel
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
