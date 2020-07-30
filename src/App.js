import React from 'react';
import randomWord from './app/randomWord.json'
import './App.css';

function App() {



  return (

    <div>
         <h1 className = "japanese">{randomWord.word}</h1>
         <h2 className = "definition">{randomWord.definition}</h2>
         <a href = {randomWord.url} className = "link">Source</a>
      
    </div>
  );

}


export default App;
