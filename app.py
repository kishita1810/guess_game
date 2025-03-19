import random
import nltk
from nltk.corpus import words

# Download word list (only needed once)
nltk.download("words")

def generate_random_valid_word():
    word_list = [word.upper() for word in words.words() if len(word) == 4]  # Get only 4-letter words
    return random.choice(word_list)

def generate_random_number():
    return str(random.randint(1000, 9999))  # Ensures a 4-digit number

def greeting():
    print("Hello, welcome to the guessing game!")
    print("There are two modes available: 1. Word guessing game and 2. Code guessing game.")

def mode_choice():
     mode = int(input(("Please choose the mode you wish to play: 1 - Word guessing game, 2 - Code guessing game: ")))
     return mode

def guess_game(mode):
    answer_guessed = False
    guess_count = 0 
    if mode == 1:
        answer = generate_random_valid_word()
        type_class = "word"
        category = "letters word"
        kind = "letter(s)"
    if mode == 2:
        answer = generate_random_number
        type_class = "code"
        category = "digits number"
        kind = "digit(s)"

    print(f"You have chosen the {type_class} guessing game. \nI'm thinking of a 4 {category}. Guess it!")   

    while not answer_guessed:  
        guess = str(input("Enter your guess. It should be a 4 {category}: ")).upper()
        print(f"You have guessed {guess}.")
        guess_count += 1
        correct_word_position = 0
        if guess == answer:
            answer_guessed = True
        else:
            for i in range(len(guess)):
                if guess[i] == answer[i]:
                    correct_word_position += 1
                
            print(f"{correct_word_position} {kind} are in the correct position.")
    print(f"Congratulations! You guessed the {type_class} correctly in {guess_count} attempts.")
   
def main():
    greeting()
    mode = mode_choice()
    guess_game(mode)

if __name__ == "__main__":
    main()
