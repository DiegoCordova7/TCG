import { PlayerState } from './PlayerState';

export class GameMatch {
    constructor(player1Deck, player2Deck) {
        this.player1 = new PlayerState(player1Deck);
        this.player2 = new PlayerState(player2Deck);
        this.turnNumber = 1;
        this.activePlayer = 'player1';
        this.phase = 'draw';
        this.globalFieldCard = null;
        this.winner = null;
    }

    startMatch() {
        this.player1.drawInitialHand();
        this.player2.drawInitialHand();
        this.phase = 'main';
    }

    endTurn() {
        if (this.winner) return;
        this.activePlayer = this.activePlayer === 'player1' ? 'player2' : 'player1';
        if (this.activePlayer === 'player1') this.turnNumber++;
        this.phase = 'draw';
        this.startDrawPhase();
    }

    startDrawPhase() {
        const currentPlayer = this.activePlayer === 'player1' ? this.player1 : this.player2;
        currentPlayer.drawCards(1);
        this.phase = 'main';
    }

    setGlobalField(card) {
        this.globalFieldCard = card;
        console.log(`Nueva carta de campo activada: ${card.name}`);
    }

    checkWinCondition() {
        // Aquí puedes evaluar si la criatura activa de alguien cayó y no tiene banca, etc.
    }
}