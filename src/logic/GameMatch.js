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
        if (typeof this.player1.drawInitialHand === 'function') {
            this.player1.drawInitialHand();
        } else {
            console.error("drawInitialHand no está disponible en player1");
        }

        if (typeof this.player2.drawInitialHand === 'function') {
            this.player2.drawInitialHand();
        }

        if (!this.player2.activeCreature) {
            const creatureIndex = this.player2.deck.findIndex(card => card.type === 'creature');
            if (creatureIndex !== -1) {
                const [opponentStarter] = this.player2.deck.splice(creatureIndex, 1);
                this.player2.activeCreature = opponentStarter;
                console.log(`[GameMatch] Criatura activa inicial del rival asignada: ${opponentStarter.name}`);
            }
        }

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

    playCardToActive(handIndex) {
        if (this.winner) return false;
        const player = this.activePlayer === 'player1' ? this.player1 : this.player2;
        return player.playCardFromHand(handIndex, 'active');
    }

    playCardToBench(handIndex, slotIndex) {
        if (this.winner) return false;
        const player = this.activePlayer === 'player1' ? this.player1 : this.player2;
        return player.playCardFromHand(handIndex, 'bench', slotIndex);
    }

    setGlobalField(card) {
        this.globalFieldCard = card;
        console.log(`Nueva carta de campo activada: ${card.name}`);
    }

    executeAttack(attackIndex) {
        if (this.winner) return false;
        const attackerPlayer = this.activePlayer === 'player1' ? this.player1 : this.player2;
        const defenderPlayer = this.activePlayer === 'player1' ? this.player2 : this.player1;
        if (!attackerPlayer.activeCreature) {
            console.log("No tienes una criatura activa para atacar.");
            return false;
        }
        if (!defenderPlayer.activeCreature) {
            console.log("El rival no tiene una criatura activa a quien atacar.");
            return false;
        }
        const attackerCard = attackerPlayer.activeCreature;
        if (!attackerCard.attacks || !attackerCard.attacks[attackIndex]) {
            console.log("Ataque inválido.");
            return false;
        }
        const attack = attackerCard.attacks[attackIndex];
        const damage = attack.damage || 0;
        console.log(`¡${attackerCard.name} usa ${attack.name} contra ${defenderPlayer.activeCreature.name} infligiendo ${damage} de daño!`);
        defenderPlayer.activeCreature.hp -= damage;
        if (defenderPlayer.activeCreature.hp <= 0) {
            defenderPlayer.activeCreature.hp = 0;
            console.log(`¡La criatura defensora ${defenderPlayer.activeCreature.name} ha sido derrotada!`);
            defenderPlayer.discardPile.push(defenderPlayer.activeCreature);
            defenderPlayer.activeCreature = null;
        }
        return true;
    }

    checkWinCondition() {
        // Evaluar condiciones de victoria
    }
}