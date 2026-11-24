export class PlayerState {
    constructor(deckCards) {
        this.deck = [...deckCards];
        this.hand = [];
        this.discardPile = [];
        this.activeCreature = null;
        this.bench = [null, null, null];
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

    playCardFromHand(cardIndex, targetZone, targetIndex = null) {
        if (cardIndex < 0 || cardIndex >= this.hand.length) {
            console.log("Índice de mano inválido.");
            return false;
        }
        switch (targetZone) {
            case 'bench':
                return this.placeCardOnBench(cardIndex, targetIndex);
            case 'active':
                return this.placeCardAsActive(cardIndex);
            case 'spell':
                return this.playSpellCard(cardIndex);
            default:
                console.log("Zona de destino desconocida.");
                return false;
        }
    }

    placeCardAsActive(cardIndex) {
        if (cardIndex < 0 || cardIndex >= this.hand.length) {
            console.log("Índice de mano inválido.");
            return false;
        }
        const card = this.hand[cardIndex];
        if (card.type !== 'creature') {
            console.log("Solo las criaturas pueden ocupar el puesto activo.");
            return false;
        }
        if (this.activeCreature !== null) {
            console.log("Reemplazando criatura activa actual...");
            this.discardPile.push(this.activeCreature);
        }
        const [extractedCard] = this.hand.splice(cardIndex, 1);
        this.activeCreature = extractedCard;
        this.hand = [...this.hand];
        return true;
    }

    placeCardOnBench(cardIndex, slotIndex) {
        // --- NUEVA REGLA: No se puede colocar en la banca si el activo está vacío ---
        if (this.activeCreature === null) {
            console.log("No puedes colocar cartas en la banca si el puesto activo está vacío.");
            return false;
        }

        const card = this.hand[cardIndex];
        if (card.type !== 'creature') {
            console.log("Solo puedes colocar criaturas en la banca.");
            return false;
        }
        if (slotIndex < 0 || slotIndex >= this.bench.length) {
            console.log("Slot de banca inválido.");
            return false;
        }
        if (this.bench[slotIndex] !== null && this.bench[slotIndex] !== undefined) {
            console.log("El slot de la banca ya está ocupado.");
            return false;
        }
        const [extractedCard] = this.hand.splice(cardIndex, 1);
        this.bench[slotIndex] = extractedCard;
        this.hand = [...this.hand];
        return true;
    }

    playSpellCard(cardIndex) {
        const card = this.hand[cardIndex];
        if (card.type !== 'spell') {
            console.log("Esta carta no es un hechizo.");
            return false;
        }

        const [extractedCard] = this.hand.splice(cardIndex, 1);
        this.discardPile.push(extractedCard);
        this.hand = [...this.hand];
        console.log(`Hechizo ${extractedCard.name} lanzado y enviado al descarte.`);
        return true;
    }

    promoteToActive(benchIndex) {
        if (benchIndex < 0 || benchIndex >= this.bench.length || !this.bench[benchIndex]) return false;
        if (this.activeCreature) this.discardPile.push(this.activeCreature);
        const promotedCard = this.bench[benchIndex];
        this.bench[benchIndex] = null;
        this.activeCreature = promotedCard;
        this.bench = [...this.bench];
        return true;
    }

    discardCard(card, fromZone = 'hand', index = 0) {
        if (fromZone === 'hand') {
            const [removed] = this.hand.splice(index, 1);
            this.discardPile.push(removed);
            this.hand = [...this.hand];
        }
    }
}