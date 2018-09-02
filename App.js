import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from "react-native";

const style = ({
    h1: {
        textAlign: 'center',
        margin: 32,
        color: '#555',
        fontWeight: 300,
    },
    board:
        {
            display: 'flex',
            width: 450,
            height: 450,
            flexDirection: 'row',
            flexWrap: 'wrap',
            border: '5px solid #ddd',
            margin: '32px auto 64px auto',
        },
    square:
        {
            height: '150px',
            width: '150px',
            boxSizing: 'border-box',
            border: '5px solid #ddd',
            fontSize: '5em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
        },
    winner:
        {
            textAlign: 'center',
            color: 'green',
        }
});

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PLAYER_ONE_SYMBOL: "X",
            PLAYER_TWO_SYMBOL: "0",
            currentTurn: "X",
            board: [
                "", "", "", "", "", "", "", "", ""
            ],
            winner: null,
        }
    }

    handleClick(index) {
        if (this.state.board[index] === "" && !this.state.winner) {
            this.state.board[index] = this.state.currentTurn
            this.setState({
                board: this.state.board,
                currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL
                    : this.state.PLAYER_ONE_SYMBOL,
                winner: this.checkForWinner(),
            })
        }
    }

    checkForWinner() {
        var currentTurn = this.state.currentTurn
        var symbols = this.state.board
        var winningCombos =
            [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
            ]
        return winningCombos.find(function (combo) {
            if (symbols[combo[0]] !== "" && symbols[combo[1]] !== "" && symbols[combo[2]] !== ""
                && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
                return currentTurn
            } else {
                return false
            }
        })
    }

    render() {
        return (
            <div>
                <h1 style={style.h1}>Tic Tac Toe</h1>
                <div style={style.board}>
                    {this.state.board.map((cell, index) => {
                        return <div key={index} onClick={() => this.handleClick(index)}
                                    style={style.square}>
                            {cell}
                        </div>;
                    })}
                </div>
                {this.state.winner ? <h2 style={style.winner}>{`The final winner is : ${this.state.winner}`}</h2> :
                    <h2 style={style.winner}>{'This game without winners :C'}</h2>}
            </div>
        )
    }
}

export default App;

