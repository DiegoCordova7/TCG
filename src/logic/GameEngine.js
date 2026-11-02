import { PlayerState } from './PlayerState';

export class GameEngine {
    constructor(player1Deck, player2Deck) {
        this.player1 = new PlayerState(player1Deck);
        this.player2 = new PlayerState(player2Deck);
        this.turn = 1;
        this.activePlayer = 'player1';
    }

    startGame() {
        this.player1.drawInitialHand();
        this.player2.drawInitialHand();
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === 'player1' ? 'player2' : 'player1';
        this.turn++;
        const currentPlayer = this.activePlayer === 'player1' ? this.player1 : this.player2;
        currentPlayer.drawCards(1);
    }
}