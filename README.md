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
