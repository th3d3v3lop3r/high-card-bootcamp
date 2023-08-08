import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      currWinner: "",
      playerOneWinCount: 0,
      playerTwoWinCount: 0,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState(
      {
        currCards: newCurrCards,
      },
      () => {
        this.checkWin();
      }
    );
    console.log(this.state.cardDeck.length);
  };

  checkWin = () => {
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      this.setState((prevState) => ({
        currWinner: "Player One won the round!",
        playerOneWinCount: prevState.playerOneWinCount + 1,
      }));
    } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
      this.setState((prevState) => ({
        currWinner: "Player Two won the round!",
        playerTwoWinCount: prevState.playerTwoWinCount + 1,
      }));
    } else {
      this.setState({
        currWinner: "This round is a draw...",
      });
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: "",
      playerOneWinCount: 0,
      playerTwoWinCount: 0,
    });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <p>
            <h3>High Card 🚀</h3>
            <br />
            {currCardElems}
          </p>
          <p>
            <div>{this.state.currWinner}</div>
          </p>
          <p>
            {this.state.cardDeck.length !== 52 && (
              <div>
                Player One has won {this.state.playerOneWinCount} rounds in this
                game.
              </div>
            )}
            {this.state.cardDeck.length !== 52 && (
              <div>
                Player Two has won {this.state.playerTwoWinCount} rounds in this
                game.
              </div>
            )}
          </p>
          <p>
            {this.state.cardDeck.length === 0 &&
              this.state.playerOneWinCount > this.state.playerTwoWinCount && (
                <div>
                  Player One has won the game.
                  <br />
                  Click Deal to restart the game.
                </div>
              )}
            {this.state.cardDeck.length === 0 &&
              this.state.playerTwoWinCount > this.state.playerOneWinCount && (
                <div>
                  Player Two has won the game.
                  <br />
                  Click Deal to restart the game.
                </div>
              )}
          </p>
          <br />
          <button
            onClick={
              this.state.cardDeck.length === 0
                ? this.restartGame
                : this.dealCards
            }
          >
            Deal
          </button>
        </header>
      </div>
    );
  }
}

export default App;
