import React, {Component} from 'react';
import randomWord from './app/randomWord.json'
import './Japanesepage.css';


export default class japanesePage extends Component {
    componentDidMount() {
        let elem = document.querySelector("h1");
        let rect = elem.getBoundingClientRect()
        let furigana = document.getElementById("furigana")
        furigana.style.left = rect.x + 10 + "px";

        console.log(rect.left + "px");
    }


    render() {
        return( 
            <div>

                <h1 className = "japanese">{randomWord.word}</h1>
                <h2 className = "definition">{randomWord.definition}</h2>
                <h3 className = "furigana" id = "furigana">{randomWord.furigana}</h3>
         
                <a href = {randomWord.url} className = "link">Source</a>

              

            </div>
        );
    }
}

