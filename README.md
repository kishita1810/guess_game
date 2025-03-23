#Glowing Guessing Galaxy

##Glowing Guessing Galaxy is an interactive web-based guessing game where players can choose between two game modes:

###Word Guessing Game

###Code Guessing Game

##Game Overview

###In the Word Guessing Game, players try to guess a randomly selected four-letter word. In the Code Guessing Game, they attempt to guess a randomly generated four-digit number. After each guess, the game provides feedback on how many letters or numbers are in the correct position, helping players refine their guesses.

##Tech Stack

###Frontend: React (Generated using Lovable.dev AI)

###Backend: FastAPI (Python) deployed on AWS

###Hosting: Frontend is deployed on Vercel, and the backend can be run locally or on the cloud.

##How to Run the Project

###Option 1: Running Locally

Clone the Repository

git clone https://github.com/kishita1810/glowing-guessing-galaxy.git
cd glowing-guessing-galaxy

Run the Frontend

cd frontend
npm install
npm start

Run the Backend

cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

Change API URL in Frontend (if needed)
If running the backend locally, update the API URL in the frontend code to point to http://localhost:8000.

###Option 2: Running with Vercel Frontend

If you don't want to run the frontend locally, you can simply start the backend and use the deployed frontend on Vercel:

Run the backend (as shown above)

Open the frontend at: Glowing Guessing Galaxy on Vercel

##Game Logic

1. Players select a game mode.

2. They input a guess (word or number) in the input field.

3. The game provides feedback on how many characters/digits are correctly placed.

4. The game continues until the correct answer is guessed.

5. The number of attempts is displayed, and past guesses are recorded for reference.

6. Once the answer is guessed, a congratulatory message appears.

##Bugs and Feedback

###I know the game is not perfect and there might be a few bugs. If you find any issues or have suggestions for improvement, please feel free to contact me. Thanks! 😊
