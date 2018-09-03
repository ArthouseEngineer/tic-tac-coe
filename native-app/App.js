import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends React.Component {


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

            const board = this.state.board.slice()
            board[index] = this.state.currentTurn
            this.setState({
                board,
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
            <View>
                <Text style={styles.h1}>Tic Tac Coe</Text>
                <View style={styles.container}>
                    {this.state.board.map((cell, index) => {
                        return <TouchableOpacity key={index} onPress={() => this.handleClick(index)}>
                            <View style={styles.square}>
                                <Text>{cell}</Text>
                            </View>;
                        </TouchableOpacity>
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    h1: {
        textAlign: 'center',
        margin: 64,
        color: '#555',
        fontWeight: '700',
    },
    container: {
        display: 'flex',
        width: 350,
        height: 350,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderStyle: 'solid',
        borderColor: '#ddd',
        borderRadius: 35,
        marginTop: 15,
        marginBottom: 32,
        marginLeft: 15
    },
    square:
        {
            height: 115,
            width: 115,
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: '#ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'

        },
    winner:
        {
            textAlign: 'center',
            color: 'green'
        }
});
