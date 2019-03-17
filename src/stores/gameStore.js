import { extendObservable } from "mobx";
import firebase from './firebaseStore'
import ModalStore from "./modalStore";

class GameStore {
    constructor() {
        extendObservable(this, {
            combinations: ['012', '345', '678', '036', '147', '258', '048', '246'],
            list: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            matrix: {
                0: [0, 3, 6],
                1: [0, 4],
                2: [0, 5, 7],
                3: [1, 3],
                4: [1, 4, 6, 7],
                5: [1, 5],
                6: [2, 3, 7],
                7: [2, 4],
                8: [2, 5, 6],
            },
            title: '',
            isPlayerOne: null,
            isPlayerOnesTurn: null,
            playerOneWins: '',
            playerTwoWins: '',
            numMoves: 0,
            isWinner: 0,
            createdGames: [],
            deviceId: '',
            gameHasSecondPlayer: false,
            currentGameKey: '',
            myGames: [],
            isInitialLoad: true,
            loading: false,
        })
    }

    // pipeline for events
    gameController = (blockIndex) => {
        // updates the board as users make moves
        this.updateGameMatrix(blockIndex);
        // increment number of moves made
        this.numMoves ++;
        // can only be a winner after 5 moves
        if (this.numMoves > 4) {
            // checks if there is a winner
            this.checkIfWinner(blockIndex);
        }
        // toggle whos turn it is
        this.toggleWhosTurn();
        // update the game details on the real-time database
        this.updateLastMove();
    };

    // updates the list of moves that have been made
    // and by which player (either 1 or 2)
    updateGameMatrix = (index) => {
        this.list[index] = this.getPlayer();
    };

    // gets who's turn it is (either 1 or 2)
    getPlayer = () => {
        return this.isPlayerOnesTurn ? 1 : 2;
    };

    // checks if a player has won/lost/drawn the game
    checkIfWinner = (blockIndex) => {
        // if player 1 is the winner
        let winner = '111';
        // if player 2 is the winner
        if (!this.isPlayerOnesTurn) winner = '222';
        // gets an array from matrix based on the last move made (reduces the number of checks)
        let matrixSlice = Array.from(this.matrix[blockIndex]);
        let arrLen = matrixSlice.length;
        // loop though length of matrixSlice
        for (let i=0; i<arrLen; i++) {
            // each integer value in the matrixSlice will become our new index
            let idx = matrixSlice[i];
            let combo = '';
            for (let j=0; j<3; j++) {
                // concatenates a string of moves by a player based on the combinations array.
                combo += this.list[parseInt(this.combinations[idx][j])]
            }
            // checks if the stringed value is equal to the winner string
            // and sets the winning player
            if (combo === winner) {
                this.isWinner = parseInt(combo[0]);
                this.incrementWinsCount();
            }
            // if there is no winner and the board is full. Set store value to a draw
            if (!this.isWinner && this.numMoves === 9) this.isWinner = 3;
            this.showGameOutcome();
        }
    };

    // toggles the players turn
    toggleWhosTurn = () => {
        this.isPlayerOnesTurn = !this.isPlayerOnesTurn;
    };

    // creates a brand new game
    createNewGame = () => {
        // this.deviceId should be changed to a something like a bearer token
        // instead of a unique device ID

        // creates a new games in Firebase Realtime Database
        this.currentGameKey = firebase.database().ref('games/').push(
            {
                title: this.title,
                playerOne: this.deviceId, 
                playerTwo: '', 
                isPlayerOnesTurn: true, 
                moves: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                numMoves: this.numMoves,
                isWinner: 0,
                playerOneWins: 0,
                playerTwoWins: 0,
            }
        ).key;
        // Connects user to the new game.
        this.connectToGame();
    };

    // gets all games that the user is included in
    getGames = () => {
        let deviceId = this.deviceId;
        // gets all games
        firebase.database().ref('/games/').once('value', (snapshot) => {
            // list of all games
            let game = snapshot.val();
            // created temp array to prevent updating the state for each game value
            let tempArray = [];
            Object.keys(game).forEach(function (item) {
                // checks if user is part of the game
                if (game[item].playerOne === deviceId || game[item].playerTwo === deviceId) {
                    // add the game key
                    game[item]['key'] = item;
                    tempArray.push(game[item])
                }
            });
            // update the state with array of games
            this.myGames = tempArray;
        });
    };

    // adds playerTwo to an existing game by setting playerTwo in real-time database to users deviceId
    joinGame = () => {
        return new Promise((resolve, reject) => {
            // check if directory exists in database
            firebase.database().ref('games/' + this.currentGameKey).once('value', (snapshot) => {
                // if it exists, update user deviceId
                if (snapshot.exists()) {
                    // if game is not full
                    if (snapshot.val().playerTwo === '') {
                        // set users deviceId
                        firebase.database().ref('games/' + this.currentGameKey + '/').update({playerTwo: this.deviceId});
                        resolve(1);
                    } else {
                        // game is already full
                        resolve(0)
                    }
                } else {
                    // game code does not exist
                    resolve(2);
                }
            })
        })
    };

    // connect to an existing online game
    connectToGame = () => {
        // update local state when changes are made to the database (e.g. a move has been made)
        firebase.database().ref('games/' + this.currentGameKey).on('value', (snapshot) => {
            // controls UI and prevents attempt to render undefined/ null values
            this.loading = true;
            // data from specific game
            let data = snapshot.val();

            if (this.isPlayerOne === null) {
                this.checkPlayer(data.playerOne);
            }
            if (this.isPlayerOnesTurn === null) {
                this.isPlayerOnesTurn = data.isPlayerOnesTurn
            }
            // check if local state should be updated
            let update = this.shouldUpdate(data.title, data.playerTwo, data.isPlayerOnesTurn, data.isWinner)

            if (update) {
                // update local state with updated database values
                this.isWinner = data.isWinner;
                this.numMoves = data.numMoves;
                this.list = data.moves;
                this.isPlayerOnesTurn = data.isPlayerOnesTurn;
                this.playerOneWins = data.playerOneWins;
                this.playerTwoWins = data.playerTwoWins;
            }
            // check if there is a winner when user connects to game.
            this.showGameOutcome();
            // allow UI to render
            this.loading = false;
        });
    };

    // checks if users local state should be updated with values in database
    shouldUpdate = (title, playerTwoId, isPlayerOnesTurn, winner) => {
        // checks whos turn it is
        let playerOnesTurn = this.isPlayersTurn(isPlayerOnesTurn);
        // main controller for updating local state
        if (playerOnesTurn || this.isInitialLoad || (playerOnesTurn && winner)) {
            // if user has just connected to a new game
            if (this.isInitialLoad) {
                this.isInitialLoad = false;
                // check is there is already an outcome in the connected game
                this.showGameOutcome();
                this.title = title;
            }
            // check if there is a second player in the game.
            if (playerTwoId.length > 0)  {
                this.gameHasSecondPlayer = true;
            } else {
                this.gameHasSecondPlayer = false;
            }
            // local state should be updated
            return true;
        }
        // local state shouldn't be updated
        return false;
    };

    // update real-time database with latest move. This will trigger 
    // connectToGame() Firebase listener on the opponents device
    updateLastMove = () => {
        firebase.database().ref('games/' + this.currentGameKey).update(
            {
                isPlayerOnesTurn: this.isPlayerOnesTurn, 
                moves: this.list,
                numMoves: this.numMoves,
                isWinner: this.isWinner,
                playerOneWins: this.playerOneWins,
                playerTwoWins: this.playerTwoWins,
            })
    };

    // reset store values when user enters a new game
    resetStore = () => {
        this.list = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.isPlayerOnesTurn = null;
        this.playerOneWins = 0;
        this.playerTwoWins = 0;
        this.numMoves = 0;
        this.isWinner = 0;
        this.isPlayerOne = null;
        this.currentGameKey = '';
        this.gameHasSecondPlayer = false;
        this.isInitialLoad = true;
    };

    // resets existing game between two players
    resetGame = () => {
        // update local state for user that requested to rest the game
        this.list = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.numMoves = 0;
        this.isWinner = 0;

        // resets database values
        firebase.database().ref('games/' + this.currentGameKey).update(
            {
                isPlayerOnesTurn: this.isPlayerOnesTurn, 
                moves: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                numMoves: 0,
                isWinner: 0,
            }
        )
    };

    // check if user is player one or player two
    checkPlayer = (playerOneDeviceId) => {
        if (this.deviceId === playerOneDeviceId) {
            this.isPlayerOne = true;
        } else {
            this.isPlayerOne = false
        }
    };

    // check if it is the players turn
    isPlayersTurn = (isPlayerOnesTurn=this.isPlayerOnesTurn) => {
        // if player is player 1 and it's player 1's turn
        if (this.isPlayerOne && isPlayerOnesTurn) {
            return true;
        // if player is not player 1 and it's not player 1's turn
        } else if (!this.isPlayerOne && !isPlayerOnesTurn) {
            return true;
        } else {
            return false;
        }
    };

    // increment players win counter
    incrementWinsCount = () => {
        // player 1 wins
        if (this.isWinner === 1) {
            this.playerOneWins ++;
        // player 2 wins
        } else if (this.isWinner === 2) {
            this.playerTwoWins ++;
        }
        // its a draw
    };

    // either shows or does not show the winner modal
    showGameOutcome = () => {
        if (this.isWinner !== 0) {
            ModalStore.showIsWinner = true;
        } else {
            ModalStore.showIsWinner = false;
        }
    }
}

const gameStore = new GameStore();
export default gameStore;