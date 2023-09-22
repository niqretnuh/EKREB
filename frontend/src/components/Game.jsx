import { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import axios from 'axios';
import GameRules from './GameRules';
import Clock from "./Clock";

function Game () {

    //set the scrambled and original words
    const [word, setWord] = useState("");
    const [orig, setOrig] = useState("");
    //set the user score
    const [score, setScore] = useState(0);
    //this is user's guess
    const [guess, setGuess] = useState("");
    //how many tries are left
    const [tries, setTries] = useState(3);
    //difficulty level
    const [level, setLevel] = useState(9);
    //whether the generated word needs to change
    const [change, setChange] = useState(false);
    //the following two are for the timer
    const [startTime, setStartTime] = useState(false);
    const [key, setKey] = useState(false);

    useEffect(() => {
        //fetch random word from hour backend with user defined difficulty level
        const fetchWord = async () => {
            try {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/generate?level=${level}`,
                    headers: {}
                };

                const response = await axios.request(config);

                //initialize scrambled word and original word
                setWord(response.data.word);
                setOrig(response.data.orig);

                //begin timer!
                setStartTime(true);
                setKey(!key);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWord(); 
        setChange(false);

    }, [change, level]); 
    //here, this will re-call fetchWord when we signal it to change, or when difficulty changes

    //this is for user submissionof guess
    const handleSubmit = () => {
        //call backend to guess
        let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/validate`,
        data: {
            user: guess,
        },
        headers: { }
        };

        axios.request(config)
            .then((response) => {

                //if the guess is correct
                if(response.data.response === true) {
                    //we update socre, and signal that we want a new word
                    setScore(score + 1);
                    setChange(true);
                    notification.success({
                        message: "Correct!",
                        description: "You guessed the word correctly!",
                        placement: "bottomRight",
                        duration: 2
                    });
                    //if correct, tries will be back to 3
                    setTries(3);
                } else {
                    notification.error({
                        message: "Incorrect!",
                        description: "You guessed the word incorrectly!",
                        placement: "bottomRight",
                        duration: 2
                    });
                    
                    //when try get to 0, reset the game and minus 1 to the scores
                    if((tries - 1) === 0){
                        setScore(score - 1);
                        setTries(3);
                        //display correct answer
                        notification.info({
                            message: "No attempts left!",
                            description: `The word is ${orig}`,
                            placement: "bottomRight",
                            duration: 5
                        });

                        //signal that we want a new word
                        setChange(true);
                    }else{
                    //when wrong, decrease try
                    setTries(tries -1);
                    }
                }
                setGuess("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //function to give hint to user
    const giveHint = () => {
        //call backend
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/hint`,
            headers: { }
            };
            axios.request(config)
                .then((response) => {
                    notification.info({
                        message: "Hint",
                        description: `Here's a hint: ${response.data.hint}`,
                        placement: "bottomRight",
                        duration: 10
                    });
                    //decrease user score by 1
                    setScore(score -1);
                })
                .catch((error) => {
                    console.log(error);
                });
    };

    //these lines deals with the difficulty slider and assigns "level" values
    let difficulty = 'Easy';
    if (level < 9) {
        difficulty = 'Medium';
    }
    if (level < 8) {
        difficulty = 'Hard';
    }
    const handleSliderChange = (event) => {
        //change levels when slider changes
        setLevel(event.target.value);
    };

    //method to handle when timer reaches end
    const handleEnd = () =>{
        //if this case, user fail the game. decrease score and reset try
        setScore(score - 1);
        setTries(3);
        //display correct answer
        notification.info({
            message: "Times up!!",
            description: `The word is ${orig}`,
            placement: "bottomRight",
            duration: 5
        });
        //prompt a new word
        setChange(true);
    };

    //style for bigger words
    const style1 = {
        fontFamily: 'Georgia, sans-serif', 
        fontSize: '45px',
        fontWeight: '1200',
        color: '#FFFFFF',
      };
    //style for smaller words
    const style2 = {
        fontFamily: 'Georgia, sans-serif', 
        fontSize: '20px', 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
      };
    
    /*
    * return:
    * we first call the other javascript files from componenets folder to add rules and timer functionality
    * 
    * for the timer, we signal to it the difficulty level and whether/when we want the timer to start
    * The timer will call the "handleEnd" function when it needs to stop
    * 
    * Then, we display the current word and prompt user for a guess
    * 
    * Then, we implement the slider for difficulty level
    * 
    * At last, we have score, attempts, and hint button
    */
    return <div className="card">
        
        <GameRules /> 
        <Clock level={level} end = {handleEnd} begin = {startTime} key = {key} />

        <h2 style={style1}> Current Word: {word} </h2>

        <Input size="large" placeholder="Enter your guess"
            onChange={(input) => {setGuess(input.target.value) ; }}
            value={guess} />
        <br /> <br />

        <Button type="primary" size="large" onClick={handleSubmit}>Guess</Button>

        <div className="card">
            <h2 style={style2}>Difficulty Level: {difficulty}</h2>
            <input
                type="range"
                min="7"
                max="9"
                step="1"
                value={level}
                onChange={handleSliderChange}
            />
        </div>

        <p style={style2}> Attempts remaining: {tries} </p>
        <p style={style2}> Score: {score} </p>
        <Button type="primary" size="small" onClick={giveHint}>Hint</Button>
    </div>
    
    
}

export default Game;