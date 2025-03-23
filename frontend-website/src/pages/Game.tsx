import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GameLogo from "@/components/GameLogo";
import NeuroButton from "@/components/NeuroButton";
import NeuroCard from "@/components/NeuroCard";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Check, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const {
    mode,
    attempts,
    maxAttempts,
    guesses,
    guessResults,
    makeGuess,
    resetGame,
    gameOver,
    success,
    answer,
  } = useGame();
  const [guess, setGuess] = useState(""); // Initialize as an empty string
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Redirect if no game mode is selected
  useEffect(() => {
    if (!mode) {
      navigate("/mode-select");
    }
  }, [mode, navigate]);

  // Handle game over state
  useEffect(() => {
    if (gameOver) {
      if (success) {
        navigate("/congratulations");
      } else {
        toast.error(`Game Over! The answer was: ${answer}`);
      }
    }
  }, [gameOver, success, navigate, answer]);

  // Handle guess submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guess.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Please enter a guess!");
      return;
    }

    if (guess.length !== 4) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Guess must be exactly 4 characters!");
      return;
    }

    // Validate guess based on mode
    if (mode === "word" && !/^[a-zA-Z]+$/.test(guess)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Words can only contain letters!");
      return;
    }

    if (mode === "code" && !/^\d+$/.test(guess)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Codes can only contain numbers!");
      return;
    }

    // Make the guess via the backend
    await makeGuess(guess);
    setGuess("");

    // Focus input after submitting
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure the value is a string of length 4
    if (value.length <= 4) {
      setGuess(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GameLogo size="sm" className="mb-8" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-full"
      >
        <NeuroCard className="mb-8 p-4 md:p-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-white/70 text-sm">Mode:</span>
                <span className="ml-2 font-medium text-gradient">
                  {mode === "word" ? "Word Guessing" : "Code Breaker"}
                </span>
              </div>
              <div>
                <span className="text-white/70 text-sm">Attempts:</span>
                <span className="ml-2 font-medium">
                  {attempts}/{maxAttempts}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div
                className={`flex flex-col md:flex-row gap-3 ${
                  shake ? "animate-shake" : ""
                }`}
              >
                <div className="flex-grow flex justify-center">
                  <input
                    type="text"
                    value={guess}
                    onChange={handleInputChange}
                    maxLength={4}
                    ref={inputRef}
                    className="w-full p-2 rounded-md border border-white/20 bg-black/30 backdrop-blur-sm text-xl font-medium text-center"
                    placeholder="Enter your guess"
                  />
                </div>
                <div className="flex gap-2 justify-center md:justify-start">
                  <NeuroButton
                    type="submit"
                    className="flex-shrink-0"
                    variant="primary"
                  >
                    <Check size={18} className="mr-1" /> Submit
                  </NeuroButton>
                </div>
              </div>
            </form>
          </div>
        </NeuroCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-full flex-grow mb-6"
      >
        <NeuroCard className="h-full">
          <h3 className="text-lg font-medium mb-4">Previous Guesses</h3>
          {guesses.length === 0 ? (
            <div className="text-white/50 h-40 flex items-center justify-center">
              No guesses yet. Start guessing!
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {guesses.map((g, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="glass p-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-medium mr-3">{g}</span>
                    <span className="text-emerald-400 font-medium">
                      {guessResults[index]} correct
                    </span>
                  </div>
                  <span className="text-white/60 text-sm">
                    Attempt {attempts - index}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </NeuroCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="flex gap-4"
      >
        <NeuroButton variant="secondary" onClick={resetGame}>
          <RefreshCw size={16} className="mr-1" /> Restart
        </NeuroButton>

        <NeuroButton
          variant="destructive"
          onClick={() => navigate("/mode-select")}
        >
          <X size={16} className="mr-1" /> Quit
        </NeuroButton>
      </motion.div>
    </div>
  );
};

export default Game;
