import { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import axios from 'axios';

function Clock({ level, end, begin, key }) {

    const [time, setTime] = useState((level%6) * 30); // Set the initial time based on the level (in seconds)
    const [isRunning, setIsRunning] = useState(false); // signal whether the timer is running
  //start
  const startTimer = () => {
    setIsRunning(true);
  };

  //reset the time limit and stop the clock
  const resetTimer = () => {
    setTime((level%6) * 30); 
    setIsRunning(false);
  };

  //stop clock
  const stop = () => {
    setIsRunning(!isRunning);
  };

  //this block keeps track of paramters level, begin, and key
  //when level (difficulty level), or begin/key (signaled by game.jsx) changes, we restart the timer
  //if game.jsx indicates if wants the timer to run (begin), we start the timer
  useEffect(() => {
    resetTimer();
    if(begin){
        startTimer();
    }
  }, [level, begin, key])

  //this block keeps the timer ticking
  //the block runs every 1000 miliseconds (1 second) and serves as a ticking clock
  //when time goes down to zero, we reset Timer and signal a stop, pass it to game.jsx
  useEffect(() => {

    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
            resetTimer();
            end();
        }
      }, 1000); // every 1 second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // clean up
  }, [isRunning, time]);

  //the background of timer
  const style1 = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    display: 'inline-block',
  };
  //content of timer
  const style2 = {
    fontFamily: 'Georgia, sans-serif', 
    fontSize: '25px', 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
  };
  //the stop/resume button
  const style3 = {
    marginLeft: '20px', 
    backgroundColor: 'red', 
    color: 'white',
    padding: '10px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer',
  };
  return (
    <div>
    <div style={style1}>
    <h1 style={style2}>Time remaining: {time} seconds</h1>
    </div>
    <button style={style3} onClick = {stop}>Stop/Resume game</button>
  </div>
  );
}

export default Clock;
