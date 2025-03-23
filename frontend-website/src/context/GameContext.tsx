import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

export type GameMode = "word" | "code" | null;

interface GameContextProps {
  mode: GameMode;
  attempts: number;
  maxAttempts: number; // Reintroduce maxAttempts
  guesses: string[];
  guessResults: number[]; // Store the number of correct positions for each guess
  answer: string;
  gameOver: boolean;
  success: boolean;
  setMode: (mode: GameMode) => void;
  startGame: (mode: GameMode) => Promise<void>;
  makeGuess: (guess: string) => Promise<void>;
  resetGame: () => Promise<void>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<GameMode>(null);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(10); // Default max attempts
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<number[]>([]); // Track correct positions
  const [answer, setAnswer] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  // Start game with a specific mode
  const startGame = async (selectedMode: GameMode) => {
    if (!selectedMode) return;

    try {
      // Call the backend to start a new game
      const response = await axios.get("http://localhost:8000/mode-select", {
        params: { mode: selectedMode === "word" ? 1 : 2 },
      });

      // Update state with backend response
      setMode(selectedMode);
      setAnswer(response.data.answer || "");
      setAttempts(0);
      setGuesses([]);
      setGuessResults([]);
      setGameOver(false);
      setSuccess(false);
      setMaxAttempts(selectedMode === "word" ? 20 : 20); // Set max attempts based on mode
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  // Make a guess
  const makeGuess = async (guess: string) => {
    if (gameOver) return;

    try {
      // Call the backend to process the guess
      const response = await axios.post("http://localhost:8000/guess", {
        guess: guess,
      });

      // Update state with backend response
      setGuesses((prev) => [guess, ...prev]);
      setGuessResults((prev) => [response.data.correct_positions, ...prev]); // Store correct positions
      setAttempts((prev) => prev + 1);

      if (response.data.win) {
        setSuccess(true);
        setGameOver(true);
        setAnswer(response.data.answer || "");
      } else if (attempts + 1 >= maxAttempts) {
        // Check if max attempts reached
        setGameOver(true);
      }
    } catch (error) {
      console.error("Failed to make guess:", error);
    }
  };

  // Reset the game
  const resetGame = async () => {
    try {
      // Call the backend to restart the game
      const response = await axios.get("http://localhost:8000/restart");

      // Update state with backend response
      setAnswer(response.data.answer || "");
      setAttempts(0);
      setGuesses([]);
      setGuessResults([]);
      setGameOver(false);
      setSuccess(false);
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        mode,
        attempts,
        maxAttempts, // Pass maxAttempts to the context
        guesses,
        guessResults, // Pass guessResults to the context
        answer,
        gameOver,
        success,
        setMode,
        startGame,
        makeGuess,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
