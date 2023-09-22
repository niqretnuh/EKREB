Name: Hunter Qin

Email: haoran.qin@vanderbilt.edu

Need to install node.js, express, cors, lodash, promises, axios

To run: get two separate terminals; go to backend and do "npm start"; then go to frontend and do "npm run dev"

***backend is run on port3000, frontend is run on 5173

Important documents for review: 

    backend: index.js

    frontend: scr/components/ (Clock.jsx, Game.jsx, GameRules.jsx, Title.jsx)

Summary:
General Workflow:
    When page refreshes, Game will automaticall call the backend to retrieve a random word, display it, and start counting down the timer. If the user enters the guess correctly within three tries and the time constraint, they will gain one point and a new word will be generated, refreshing attempts and timer. If they use up all the attempts for one word, they will get docked one point and a new word will be generated, refreshing attempts and timer.

    If the user fails to enter the word correctly before timer ends, they will get docked one point and new word will be generated, refreshing attempts and timer.

    If the user asks for a hint, the definition of the word will be sent as a pop-up notif. One point will get docked.

    When the user changes difficulty level, a new word will be generated, timer will be refreshed.

    User can pause or resume the timer at any point.

***Here are some very very detailed explanation of the code if you need more information

EKREB:
    - Uses REACT for responsive frontend design and Node.js to code a REST API backend.
    - Random word + hint functionality. Uses WordsAPI as wordbank to generate random words and  retrieve hint for user.
    - Includes Timer functionality and Score keeping.
    - Includes a slider to select mode of difficulty. Words get longer, more obscure, and have less time to finish a puzzle.
    - Has a "Rules" button where user can read game rules that is otherwise hidden.
    - Uses pop-up notification to inform users of correct/incorrect guess, hint, and end of time

Backend:
    The backend design for this game is a REST API. It handles generating random numbers based on user selected difficulty; checking the correctness of user's submission of guessed word; updates user's attempts and score

    The /generate get function takes in user defined difficulty level via query, and adjusts the length and obscurity of the words based on this level. It then calls the WordsAPI to retrieve a random word with these constraints. It will the call a helper method that scrambles the words, and then return this scrambled word.

    The scramble helper method separates the string of the random word into a char array, and then uses lodash's shuffle method to randomize the sequence of these letters. It then checks whether the shuffled word is truly shuffled

    The /validate patch function takes in user's guessed word. It then checks for equality between that word and our generated word

    The /hint patch function calls the WordsAPI to retrieve the definition of the current word. It then returns that definition

Frontend: frontend/src/componenets
    Game.jsx:
        This is the most central file that handles all game functionality. It

            1. Calls backend to generate a new word every time user defined level changes or if other conditions asks it to change. It stores this generated word as well as its unscrambled version as "word" and "orig".

            2. Calls backend to validate user's answer everytime they submit a guess. Keeps track of how many attempts users have left for the current word. If the guess is correct, it resets the score and attempts and prompts for a new word. If the guess is wrong, it decreases attempts, and if it gets to zero, it decreases score, resets attempts, and generates a new word. The user will be notified of the correctness of their guess with a pop up notif
            NOTE: if we succeed/fail, we reset timer as well

            3. Calls backend to provide a hint to user when user asks. It then decreases point by 1

            4. Allows user to select difficulty level with a slider. Everytime slider changes, it updates level, which in turn prompts a new word, refreshing attempts as well

            5. incorporates Clock.jsx to include a timer functionality. When timer ends, it clears attempts, reset word, decrease score, and send a pop up notif to signal time end to the user. It will then prompt a new generated word.
            The clock is stop/resumable

            6. It also has a "rule" button. If user clicks, it will open a pop up for user to read the rules.

    Clock.jsx
    
        This file implements the timer functionality. it has paramters "level, end, begin, key". Level refers to the difficulty level passed from Game.jsx. End is what Clock uses to alert Game.jsx that the time has ended. Begin and Key are passed from Game.jsx, where begin tells the clock whether the timer should be running or not, and key tells the clock to re-run the timer.

        The variable "time" stores the maximum time based on user selected difficulty level (30 for hard, 60 for medium, 90 for easy). The variable "isRunning" stores the current status of the clock.

        When any of level, begin, or key changes, the clock will automatically reset while time is resetted based on level. The clock will look to the value of "begin" to determine whether it should start running.

        When level, begin, and key stays constant, and isRunning is true, the clock will tick every 1000 miliseconds (every second) and will count down. When it reaches zero, the clock stops and use end() to signal to Game.jsx that time is up.

        Lastly, the Clock also has a stop/resume button. User can stop or resume timer any time