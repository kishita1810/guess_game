import React from "react";
import { useNavigate } from "react-router-dom";
import GameLogo from "@/components/GameLogo";
import NeuroCard from "@/components/NeuroCard";
import NeuroButton from "@/components/NeuroButton";
import { useGame } from "@/context/GameContext";
import { Book, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

const ModeSelect = () => {
  const navigate = useNavigate();
  const { startGame } = useGame();

  const handleModeSelect = (mode: "word" | "code") => {
    startGame(mode);
    navigate("/game");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GameLogo size="md" className="mb-10" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-xl md:text-2xl font-medium mb-10 text-center"
      >
        Choose Your Game Mode
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <NeuroCard
            interactive
            glowColor="rgba(155, 135, 245, 0.5)"
            className="h-full flex flex-col items-center justify-center p-8"
            onClick={() => handleModeSelect("word")}
          >
            <Book size={48} className="text-secondary mb-4" />
            <h3 className="text-xl font-medium mb-3">Word Guessing</h3>
            <p className="text-white/70 text-center mb-4">
              Guess the hidden word with limited attempts
            </p>
            <NeuroButton
              variant="secondary"
              onClick={() => handleModeSelect("word")}
              className="mt-4"
            >
              Select
            </NeuroButton>
          </NeuroCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <NeuroCard
            interactive
            glowColor="rgba(34, 211, 238, 0.5)"
            className="h-full flex flex-col items-center justify-center p-8"
            onClick={() => handleModeSelect("code")}
          >
            <KeyRound size={48} className="text-accent mb-4" />
            <h3 className="text-xl font-medium mb-3">Code Guessing</h3>
            <p className="text-white/70 text-center mb-4">
              Decrypt the secret code within the time limit
            </p>
            <NeuroButton
              variant="accent"
              onClick={() => handleModeSelect("code")}
              className="mt-4"
            >
              Select
            </NeuroButton>
          </NeuroCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-10"
      >
        <NeuroButton variant="minimal" onClick={() => navigate("/")}>
          Back to Start
        </NeuroButton>
      </motion.div>
    </div>
  );
};

export default ModeSelect;
