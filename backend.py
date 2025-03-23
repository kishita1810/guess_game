from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import nltk
from nltk.corpus import words

nltk.download("words")

app = FastAPI()

# Allow frontend requests
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Store the current game state
current_game = {
    "answer": "",
    "attempts": 0,
    "mode": None,  # 1 for word, 2 for code
}

def generate_word():
    word_list = [word.upper() for word in words.words() if len(word) == 4]
    return random.choice(word_list)

def generate_number():
    return str(random.randint(1000, 9999))

# Pydantic model for the guess request
class GuessRequest(BaseModel):
    guess: str

@app.get("/mode-select")
def mode_select(mode: int):
    """Handle mode selection and initialize the game."""
    if mode not in [1, 2]:
        raise HTTPException(status_code=400, detail="Invalid mode. Use 1 for word or 2 for code.")
    
    # Generate a new answer based on the mode
    answer = generate_word() if mode == 1 else generate_number()
    
    # Reset the game state
    current_game["answer"] = answer
    current_game["attempts"] = 0
    current_game["mode"] = mode
    
    return {
        "message": "Game mode selected!",
        "mode": mode,
        "answer": answer,  # For debugging purposes (remove in production)
    }

@app.post("/guess")
def guess(request: GuessRequest):
    """Process the user's guess and return the number of correct positions."""
    guess = request.guess.upper()

    if not current_game["answer"]:
        raise HTTPException(status_code=404, detail="Game not started! Please select a mode first.")

    current_game["attempts"] += 1
    answer = current_game["answer"]
    
    if guess.upper() == answer:
        # Reset the game state after a win
        current_game["answer"] = ""
        current_game["attempts"] = 0
        current_game["mode"] = None
        
        return {
            "message": f"Correct! You guessed in {current_game['attempts']} attempts.",
            "win": True,
            "correct_positions": len(answer),  # All correct
            "answer": answer,
        }
    
    correct_positions = sum(1 for i in range(len(guess)) if guess[i] == answer[i])
    return {
        "message": f"{correct_positions} letters/digits are correct.",
        "win": False,
        "correct_positions": correct_positions,
        "answer": answer,
    }

@app.get("/restart")
def restart_game():
    """Restart the game with a new word/number."""
    if not current_game["mode"]:
        raise HTTPException(status_code=404, detail="Game not started! Please select a mode first.")

    # Generate a new answer based on the current mode
    answer = generate_word() if current_game["mode"] == 1 else generate_number()
    
    # Reset the game state
    current_game["answer"] = answer
    current_game["attempts"] = 0
    
    return {
        "message": "Game restarted!",
        "answer": answer,
    }

@app.get("/quit")
def quit_game():
    """Quit the game session."""
    # Reset the game state
    current_game["answer"] = ""
    current_game["attempts"] = 0
    current_game["mode"] = None
    
    return {"message": "Game quit successfully!"}