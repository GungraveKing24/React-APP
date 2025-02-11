import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://fastapi-app-production-f08f.up.railway.app/games";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Lista de Juegos</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.name} - {game.platform}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
