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

print("Hello, welcome to the guessing game!")
print("There are two modes available: 1. Word guessing game and 2. Code guessing game.")

mode = int(input(("Please choose the mode you wish to play: 1 - Word guessing game, 2 - Code guessing game: ")))

answer_guessed = False
guess_count = 0

if mode == 1:
    answer = word_answer
    print("You have chosen the word guessing game.")
    print("I'm thinking of a word with 4 letters. Guess it!")
    while not answer_guessed:  
        guess_word = str(input("Enter your guess. It should be a 4 letter word: ")).upper()
        print(f"You have guessed {guess_word}.")
        guess_count += 1
        correct_word_position = 0
        if guess_word == answer:
            answer_guessed = True
        else:
            for i in range(len(guess_word)):
                
                print(i)
                print(guess_word[i])
                print(answer[i])
                if guess_word[i] == answer[i]:
                    correct_word_position += 1
            
            print(f"{correct_word_position} letter(s) are in the correct position.")

    print(f"Congratulations! You guessed the word correctly in {guess_count} attempts.")

    

    
