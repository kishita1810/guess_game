# Guessing Galaxy Game

Guessing Galaxy Game is an interactive web-based guessing game where players can choose between two game modes:  
1. **Word Guessing Game**  
2. **Code Guessing Game**  

## Game Overview
In the **Word Guessing Game**, players try to guess a randomly selected four-letter word.  
In the **Code Guessing Game**, they attempt to guess a randomly generated four-digit number.  
After each guess, the game provides feedback on how many letters or numbers are in the correct position, helping players refine their guesses.

---

### Demo

You can watch a quick screen recording of the game in action here:  
[**Game Demo Video**](https://youtu.be/GlhcVNdX4Wc)

This video will give you an idea of how the game works and what to expect when playing.

---

### Play the Game Online

The game is hosted and ready for you to play! You can start playing the game by visiting the following link:  
[**Play the Game**](https://guessinggalaxygame.vercel.app/)

Feel free to try it out and enjoy!

---

## Tech Stack
- **Frontend**: React (Generated using [Lovable.dev AI](https://lovable.dev))  
- **Backend**: FastAPI (Python)  
- **Hosting**: Frontend is deployed on Vercel, and the backend can be run locally or on the cloud.  

## How to Run the Project

### Option 1: Running Locally  

#### Clone the Repository  
```sh
git clone https://github.com/kishita1810/guess_game.git
cd guess_game
```

#### Run the Frontend  
```sh
cd frontend-website
npm install
npm run dev
```

#### Run the Backend in another terminal  
```sh
cd guess_game
pip install -r requirements.txt
uvicorn backend:app --host 0.0.0.0 --port 8000
```

#### Change API URL in Frontend (if needed)  
If running the backend locally, update the API URL in the frontend code to point to:  
```sh
http://localhost:8000
```

---

## Game Logic  
- Players select a game mode.  
- They input a guess (word or number) in the input field.  
- The game provides feedback on how many characters/digits are correctly placed.  
- The game continues until the correct answer is guessed.  
- The number of attempts is displayed, and past guesses are recorded for reference.  
- Once the answer is guessed, a congratulatory message appears.  

## Bugs and Feedback  
I know the game is not perfect, and there might be a few bugs.  
If you find any issues or have suggestions for improvement, please feel free to contact me. Thanks! 😊 
