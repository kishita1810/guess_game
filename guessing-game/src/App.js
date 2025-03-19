import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000"; // Change to deployed URL

function App() {
  const [gameId, setGameId] = useState(null);
  const [mode, setMode] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const startGame = async (selectedMode) => {
    const response = await axios.get(`${API_URL}/start?mode=${selectedMode}`);
    setGameId(response.data.game_id);
    setMode(selectedMode);
    setMessage(response.data.message);
  };

  const submitGuess = async () => {
    if (!gameId) return;
    const response = await axios.post(`${API_URL}/guess`, { game_id: gameId, guess });
    setMessage(response.data.message);
    if (response.data.win) setGameId(null); // Reset on win
  };

  const restartGame = async () => {
    if (!gameId) return;
    const response = await axios.get(`${API_URL}/restart?game_id=${gameId}`);
    setMessage(response.data.message);
  };

  const quitGame = async () => {
    if (!gameId) return;
    await axios.get(`${API_URL}/quit?game_id=${gameId}`);
    setGameId(null);
    setMessage("Game quit.");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Guessing Game</h1>
      {!gameId ? (
        <div>
          <h3>Select Mode</h3>
          <button onClick={() => startGame(1)}>Word Guessing</button>
          <button onClick={() => startGame(2)}>Number Guessing</button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <button onClick={submitGuess}>Submit Guess</button>
          <button onClick={restartGame}>Restart</button>
          <button onClick={quitGame}>Quit</button>
        </div>
      )}
    </div>
  );
}

export default App;
