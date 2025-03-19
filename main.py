import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import nltk
from nltk.corpus import words

nltk.download("words")

app = FastAPI()

# Allow frontend requests
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

games = {}  # Store game states (session-based)

def generate_word():
    word_list = [word.upper() for word in words.words() if len(word) == 4]
    return random.choice(word_list)

def generate_number():
    return str(random.randint(1000, 9999))

@app.get("/start")
def start_game(mode: int):
    """ Start a new game (mode: 1 for word, 2 for number) """
    answer = generate_word() if mode == 1 else generate_number()
    game_id = str(random.randint(1000, 9999))  # Simple game session ID
    games[game_id] = {"answer": answer, "attempts": 0, "mode": mode}
    return {"game_id": game_id, "message": "Game started!", "mode": mode}

@app.post("/guess")
def guess(game_id: str, guess: str):
    """ Process the user's guess """
    if game_id not in games:
        return {"error": "Game not found!"}

    game = games[game_id]
    game["attempts"] += 1
    answer = game["answer"]
    
    if guess.upper() == answer:
        del games[game_id]  # Remove game if won
        return {"message": f"Correct! You guessed in {game['attempts']} attempts.", "win": True}
    
    correct_positions = sum(1 for i in range(len(guess)) if guess[i] == answer[i])
    return {"message": f"{correct_positions} letters/digits are correct.", "win": False}

@app.get("/restart")
def restart_game(game_id: str):
    """ Restart the game with a new word/number """
    if game_id not in games:
        return {"error": "Game not found!"}

    mode = games[game_id]["mode"]
    answer = generate_word() if mode == 1 else generate_number()
    games[game_id] = {"answer": answer, "attempts": 0, "mode": mode}
    return {"message": "Game restarted!", "game_id": game_id}

@app.get("/quit")
def quit_game(game_id: str):
    """ Quit the game session """
    if game_id in games:
        del games[game_id]
        return {"message": "Game quit successfully!"}
    return {"error": "Game not found!"}
