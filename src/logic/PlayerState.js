export class PlayerState {
    constructor(deckCards) {
        this.deck = [...deckCards];
        this.hand = [];
        this.discardPile = [];
        this.activeCreature = null;
        this.bench = [];
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawInitialHand() {
        this.shuffleDeck();
        this.hand = this.deck.splice(0, 5);
        while (!this.hand.some(card => card.type === 'creature')) {
            this.deck = [...this.deck, ...this.hand];
            this.shuffleDeck();
            this.hand = this.deck.splice(0, 5);
        }
    }

    drawCards(amount = 1) {
        for (let i = 0; i < amount; i++) {
            if (this.deck.length === 0) break;
            if (this.hand.length >= 8) break;
            const card = this.deck.shift();
            this.hand.push(card);
        }
    }

    playToBench(cardIndex) {
        if (this.bench.length >= 3) {
            console.log("La banca está llena (máximo 3 criaturas).");
            return false;
        }
        const [card] = this.hand.splice(cardIndex, 1);
        this.bench.push(card);
        return true;
    }

    promoteToActive(benchIndex) {
        if (this.activeCreature) this.discardPile.push(this.activeCreature);
        const [promotedCard] = this.bench.splice(benchIndex, 1);
        this.activeCreature = promotedCard;
    }

    discardCard(card, fromZone = 'hand', index = 0) {
        if (fromZone === 'hand') this.hand.splice(index, 1);
        this.discardPile.push(card);
    }
}