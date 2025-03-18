import random
import tkinter as tk
from tkinter import messagebox
import nltk
from nltk.corpus import words

# Download word list (only needed once)
nltk.download("words")

def generate_random_valid_word():
    word_list = [word.upper() for word in words.words() if len(word) == 4]  # Get only 4-letter words
    return random.choice(word_list)

def generate_random_number():
    return str(random.randint(1000, 9999))  # Ensures a 4-digit number

def start_game(mode):
    answer_guessed = False
    guess_count = 0

    if mode == 1:
        answer = generate_random_valid_word()
        type_class = "word"
        category = "letters word"
        kind = "letter(s)"
    elif mode == 2:
        answer = generate_random_number()
        type_class = "code"
        category = "digits number"
        kind = "digit(s)"

    def check_guess():
        nonlocal guess_count
        guess = entry.get().upper()
        guess_count += 1
        correct_word_position = 0
        if guess == answer:
            messagebox.showinfo("Congrats!", f"Congratulations! You guessed the {type_class} correctly in {guess_count} attempts.")
            return
        else:
            for i in range(len(guess)):
                if guess[i] == answer[i]:
                    correct_word_position += 1
            result_label.config(text=f"{correct_word_position} {kind} are in the correct position.")
            entry.delete(0, tk.END)

    instruction_label.config(text=f"Guess the 4 {category}!")
    guess_button.config(command=check_guess)

def mode_choice():
    def on_select_mode(mode):
        mode_window.destroy()
        start_game(mode)

    mode_window = tk.Toplevel(root)
    mode_window.title("Choose Game Mode")
    
    word_button = tk.Button(mode_window, text="Word Guessing Game", command=lambda: on_select_mode(1))
    word_button.pack(pady=10)
    
    code_button = tk.Button(mode_window, text="Code Guessing Game", command=lambda: on_select_mode(2))
    code_button.pack(pady=10)

root = tk.Tk()
root.title("Guessing Game")

greeting_label = tk.Label(root, text="Welcome to the Guessing Game!", font=("Arial", 16))
greeting_label.pack(pady=20)

start_button = tk.Button(root, text="Start Game", command=mode_choice)
start_button.pack(pady=10)

instruction_label = tk.Label(root, text="Choose a game mode to start.", font=("Arial", 12))
instruction_label.pack(pady=20)

entry = tk.Entry(root)
entry.pack(pady=10)

guess_button = tk.Button(root, text="Guess", state=tk.DISABLED)
guess_button.pack(pady=10)

result_label = tk.Label(root, text="", font=("Arial", 12))
result_label.pack(pady=10)

root.mainloop()
