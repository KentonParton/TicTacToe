// Node Modules
import { extendObservable } from 'mobx'
// Stores
import GameStore from '../stores/gameStore'

class ModalStore {
    constructor() {
        extendObservable(this, {
            showNewGame: false,
            showJoinGame: false,
            showIsWinner: false,
        });
    }
    // Checks if game outcome should be shown (win/lost/draw)
    displayIsWinnerModal = () => {
        if (GameStore.isWinner !== 0) {
            let outputString = '';
            if ((GameStore.isPlayerOne && GameStore.isWinner === 1) ||
                (!GameStore.isPlayerOne && GameStore.isWinner === 2)) {
                outputString = 'You Win!'
            } else if (GameStore.isWinner === 3) {
                outputString = "It's a Draw!"
            } else {
                outputString = 'You Lose!'
            }
            return outputString;
        }
    };
}

const modalStore = new ModalStore();
export default modalStore;