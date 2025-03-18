'''In this code, I want to create a 4 letter word guessing game or 4 digit code guessing game.
1. For this, I will need the answer stored as number or string. 
2. Second, I will need the input from the user.
3. Then I have to compare the guess made by user with the answer. 
4. If there is word or number in the correct position as the answer,
it should return x in correct position. Where x is the number of correct positions.
5. It should keep the count of attempts.
6. When the correct word or number is guessed, it should return you guessed correctly in x attempts.'''

word_answer = "FREE"
number_answer = "8889"

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
        answer = word_answer
        type = "word"
        xyz = "letters word"
        correct_position_message = "letter(s)"
    if mode == 2:
        answer = number_answer
        type = "code"
        xyz = "digits number"
        correct_position_message = "digit(s)"

    print(f"You have chosen the {type} guessing game. \nI'm thinking of a 4 {xyz}. Guess it!")   

    while not answer_guessed:  
        guess = str(input("Enter your guess. It should be a 4 digit number: ")).upper()
        print(f"You have guessed {guess}.")
        guess_count += 1
        correct_word_position = 0
        if guess == answer:
            answer_guessed = True
        else:
            for i in range(len(guess)):
                if guess[i] == answer[i]:
                    correct_word_position += 1
                
            print(f"{correct_word_position} {correct_position_message} are in the correct position.")
    print(f"Congratulations! You guessed the {type} correctly in {guess_count} attempts.")

    

    
greeting()
mode = mode_choice()
guess_game(mode)