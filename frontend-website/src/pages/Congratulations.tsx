import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameLogo from "@/components/GameLogo";
import NeuroButton from "@/components/NeuroButton";
import Confetti from "@/components/Confetti";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const Congratulations = () => {
  const navigate = useNavigate();
  const { attempts, resetGame, mode } = useGame();

  useEffect(() => {
    if (!mode) {
      navigate("/");
    }
  }, [mode, navigate]);

  const handlePlayAgain = () => {
    resetGame(); // Reset the game state
    navigate("/mode-select"); // Redirect to the Mode Select page
  };

  const handleExitGame = () => {
    resetGame(); // Reset the game state
    navigate("/"); // Redirect to the Start page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Confetti />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
        className="text-center mb-12"
      >
        <GameLogo size="md" className="mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1
            className="text-2xl md:text-4xl font-bold mb-2 text-glow-sm"
            style={
              {
                "--glow-color": "rgba(34, 211, 238, 0.7)",
              } as React.CSSProperties
            }
          >
            Congratulations!
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8">
            You guessed the correct {mode === "word" ? "word" : "code"} in{" "}
            <span className="text-accent font-bold">{attempts}</span> attempts!
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <NeuroButton
          variant="primary"
          size="lg"
          onClick={handlePlayAgain} // Redirect to Mode Select page
          className="min-w-40"
        >
          Play Again
        </NeuroButton>

        <NeuroButton
          variant="minimal"
          size="lg"
          onClick={handleExitGame} // Redirect to Start page
          className="min-w-40"
        >
          Exit Game
        </NeuroButton>
      </motion.div>
    </div>
  );
};

export default Congratulations;
