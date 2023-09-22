const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");

const app = express();

app.use(express.json());
app.use(cors());

//here is the word that is generated
let rand = "";

//API call here: use WordsAPI to retrieve a random word
app.get("/generate", async (req, res) => {
    //retrieve the random word based on the user defined difficulty level
    const level = req.query.level;
    const axios = require('axios');
    const options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/',
        params: {
            random: 'true',
            lettersmin: 13-level,
            lettersMax: 14-level,
            frequencymin: level
        },
        headers: {
        'X-RapidAPI-Key': '3c0c765545mshbe368cb83659f96p151cdfjsn4b0c0a3fa5d2',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    //If the API call gives us a valid word, we scramble that word and display both the scrmabled
    //and unscrambled version
    try {
        const response = await axios.request(options);

        //this is the word that we fetched
        rand = response.data.word;

        //and now scramble the word. Call the scramble method
        scrambled = scramble(rand);

        //display the scrambled word in json
        res.json({
            word: scrambled,
            orig:rand
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to retrieve"});
    }
});

//function to scramble the words
function scramble(word){

    const chars = word.split("");

    //use the shuffle method in lodash to shuffle the words
    const scrambled_chars = _.shuffle(chars);
    const scrambled_word = scrambled_chars.join("");

    //make sure that the word is actually scrambled, no accidentlly the same spelling
    //especially for the small words in "easy" mode
    if(scrambled_word == word){
        return scramble(word);
    }
    return scrambled_word;
}

//validating user's answer
app.patch("/validate", async(req, res) =>{
    const user_word = req.body.user
    
    //check user input answer against the actual word
    if(user_word === rand){
        res.json({
            response: true
        });
        
        //update score
        score += 1;
    }
    else{
        res.json({
            response: false
        });
    }
});

//give hints to user: this finds the definition
app.patch("/hint", async(req, res) =>{
    const axios = require('axios');

    const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${rand}`,
    headers: {
        'X-RapidAPI-Key': '3c0c765545mshbe368cb83659f96p151cdfjsn4b0c0a3fa5d2',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
    };

    try {
        //If we find a definition, display it in json. If not, then we will 
        //display a no definition found message
        const response = await axios.request(options);
        let def = "Sorry...no definition found for this word";

        try{
            def = response.data.results[0].definition;
        }
        catch(error){
            console.log(error);
        }
        
        res.json({
            hint: def
        });

    } catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => console.log("API Server is running..."));