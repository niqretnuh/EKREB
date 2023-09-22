import { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import axios from 'axios';

function GameRules(){
    const[show, setShow] = useState(false);

    const change = () =>{
        setShow(!show);
    };

    const style1 = {
        backgroundColor: '#f0f0f0', // Background color
    padding: '20px', // Padding
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Box shadow
    maxWidth: '700px', // Maximum width
    textAlign: 'center', // Text alignment
    margin: '0 auto', // Center horizontally
    };

    const style2 = {
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        color: '#333',
    }

    const style3 = {
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        color: '#333',
      };
      
      const style5 = {
        fontFamily: 'Georgia, sans-serif', 
        fontSize: '17px', 
        color: '#333', 
        textAlign: 'left'
      };
      const style4 = {
        fontFamily: 'Georgia, sans-serif', 
        fontSize: '23px', 
        fontWeight: 'bold',
        color: '#333', 
        textAlign: 'center'
      };
    return(
    <div>
    <button style = {style2} onClick={change}>
      {show ? 'Close' : 'Rules'}
    </button>
    {show && (
      <div style = {style1}>
        <div>
          <h2 style = {style4}>Welcome to EKREB!</h2>
          <h2 style = {style4}>Your goal is to find the unscrambled version of the word puzzles within the time limit:</h2>
          <ul>
            <li style = {style5}>1. To guess the unscrabled word, enter the word in the serach bar and press "guess".
            </li>
            <h2></h2>
            <li style = {style5}>2. You will have a total of 3 tries for each word.
                If you guess correctly within these tries and the target time, you will gain 1 point in scores. If you fail to do so, you will get docked 1 point.
            </li>
            <h2></h2>
            <li style = {style5}>3. You can choose the level of difficulty user the slider under "Difficulty Level". As difficulty goes up, words will get longer and more obscure, and you will have less time to finish!
            </li>
            <h2></h2>
            <li style = {style5}>4. If you need help with a word, you can use the "hint" button at the bottom of the page.    
                NOTE: Hints do not come free -- you will have to purchase them with 1 game point!
            </li>
          </ul>
        </div>
        <button style = {style3} onClick={change}>
          Close
        </button>
      </div>
    )}
  </div>);
}

export default GameRules