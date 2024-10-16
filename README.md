# EKREB Work Scrambling Website

# Summary
EKREB is a word guessing game where players must guess a scrambled word within three attempts and a time limit. The game integrates a scoring system, hint functionality, and varying difficulty levels.

# Features
+ Random Word Generation & Scrambling: Uses WordsAPI to fetch and scramble words based on difficulty level.
+ Timer and Scorekeeping: Players have a set time to guess each word. Correct guesses earn points, while incorrect guesses or time-outs deduct points.
+ Hint System: Players can request a hint (word definition) at the cost of one point.
+ Difficulty Levels: Adjustable slider that controls word length and time constraints.
+ Responsive UI: Built with React, featuring pause/resume timer and pop-up notifications for feedback.
+ Game Rules: Viewable via the "Rules" button.

# Backend (Node.js REST API)
+ /generate: Fetches a scrambled word based on difficulty level.
+ /validate: Checks if the user's guess matches the original word.
+ /hint: Provides a word definition when requested.

# Frontend (React)
+ Game.jsx: Manages game logic, including word generation, validation, scoring, and interaction with the timer and backend.
+ Clock.jsx: Implements timer functionality, with support for pause/resume.

<img width="1512" alt="README-PageSetUp" src="https://github.com/user-attachments/assets/87f6028f-27e4-4fb8-994e-567de68a5fe7">
<img width="1512" alt="README-Rule" src="https://github.com/user-attachments/assets/dcfd9cc8-0ae6-4034-8e3d-fc83fe12ba3d">
<img width="1512" alt="README-CorrectAttempt" src="https://github.com/user-attachments/assets/56399be2-b3a7-4d51-b94a-71ad00e47d20">
<img width="1512" alt="README-FailedAttempts" src="https://github.com/user-attachments/assets/56d2b946-3e14-4578-b892-1f7802a6b88b">
<img width="1512" alt="README-Time'sUp" src="https://github.com/user-attachments/assets/56922336-61da-4166-b4a0-fd5ba4036f3c">
<img width="1512" alt="README-Hint" src="https://github.com/user-attachments/assets/b2ab80d0-837e-4ac3-a77f-b5b150198921">
