import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css'
import './style.css'

const Stars = (props) => {
//    const numberOfStars =  + Math.floor(Math.random()*9);
    
    let stars = [];
    for (let i = 0; i < props.numberOfStars; i++){
        stars.push(<i key={i} className="fa fa-star"></i>)
    }
    return (
        <div className="col-5">
            {stars}
        </div>
    );
}

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button onClick={props.acceptAnswer} className="btn btn-success"><i className="fa fa-check"></i></button>;
            break;
        case false:
            button = <button onClick={props.acceptAnswer} className="btn btn-danger"><i className="fa fa-times"></i></button>; 
            break;
        default:
            button = <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button>;
            break;
    }
    return (
        <div className="col-2">
            {button}
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) => 
             <span key={i} onClick={() => props.unselectNumber(number)}> 
                 {number} 
             </span>
            )}
        </div>
    );
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0){
            return 'selected';
        }
    }
    const arrayOfNumbers = [1,2,3,4,5,6,7,8,9]
    return (
        <div className="card text-center">
            <div> 
                {arrayOfNumbers.map((number, i) => 
                    <span key={i} className={numberClassName(number)} 
                    onClick={() => props.selectNumber(number)}>{number}</span>
                )}
            </div>
        </div>
    );
}

class Game extends React.Component {
    state = {
      selectedNumbers: [],  
      randomNumberOfStars : 1 + Math.floor(Math.random()*9),
      answerIsCorrect: null,
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumber: prevState.selectedNumbers.push(clickedNumber),
        })); 
    };
    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            selectedNumbers: [],
            randomNumberOfStars: 1 + Math.floor(Math.random()*9),
            answerIsCorrect: null,
        }))
    };
    render() {
        const {selectedNumbers, randomNumberOfStars, answerIsCorrect} = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars = {randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} answerIsCorrect={answerIsCorrect} acceptAnswer={this.acceptAnswer}/>
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} acceptAnswer={this.acceptAnswer}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
