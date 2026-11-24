import { useState } from 'react';
import { GameMatch } from '../../logic/GameMatch';
import { player1Deck, player2Deck } from '../../logic/decks';
import PlayerField from './PlayerField';
import FieldCardSlot from '../game/FieldCardSlot';
import HandZone from '../game/HandZone';
import CardModal from '../card/CardModal';
import './Gameboard.css';

export default function Gameboard({ onBackToMenu }) {
    const [match] = useState(() => {
        const game = new GameMatch(player1Deck, player2Deck);
        game.startMatch();
        return game;
    });

    const [, setTick] = useState(0);
    const [draggedCardIndex, setDraggedCardIndex] = useState(null);
    const [inspectedCard, setInspectedCard] = useState(null);
    const [incomingDamage, setIncomingDamage] = useState(null);
    const [isTargetHit, setIsTargetHit] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const updateUI = () => setTick(prev => prev + 1);

    const handleEndTurn = () => {
        match.endTurn();
        updateUI();
    };

    const handleDragStartCard = (index) => setDraggedCardIndex(index);

    const handleDropOnActive = () => {
        if (draggedCardIndex === null) return;
        const success = match.playCardToActive(draggedCardIndex);
        if (success) {
            setDraggedCardIndex(null);
            updateUI();
        }
    };

    const handleDropOnBench = (slotIndex) => {
        if (draggedCardIndex === null) return;
        const success = match.playCardToBench(draggedCardIndex, slotIndex);
        if (success) {
            setDraggedCardIndex(null);
            updateUI();
        }
    };

    const handleExecuteAttack = (attackIndex) => {
        const activeCreature = match.player1.activeCreature;
        const attack = activeCreature?.attacks?.[attackIndex];
        const damageValue = attack ? attack.damage : 0;

        const success = match.executeAttack(attackIndex);
        if (success) {
            setIsAttacking(true);
            setIncomingDamage(damageValue);
            setIsTargetHit(true);

            setTimeout(() => {
                setIsAttacking(false);
                setIncomingDamage(null);
                setIsTargetHit(false);
            }, 750);

            updateUI();
        }
    };

    const activeCard = match.player1.activeCreature;
    const isInspectedActive = Boolean(inspectedCard && activeCard && (inspectedCard.id === activeCard.id || inspectedCard === activeCard));

    return (
        <div className="tabletop-container">
            <header className="gameboard-header">
                <div className="header-info">
                    {onBackToMenu && (
                        <button className="btn-menu" onClick={onBackToMenu}>
                            ← Menú
                        </button>
                    )}
                    <div>
                        <span className="turn-text">Turno {match.turnNumber} | Jugador Activo: </span>
                        <strong className="active-player-name">{match.activePlayer.toUpperCase()}</strong>
                    </div>
                </div>
                <button className="btn-end-turn" onClick={handleEndTurn}>
                    Terminar Turno
                </button>
            </header>

            <div className="arena-layout">
                <aside className="arena-side-zone">
                    <FieldCardSlot fieldCard={match.globalFieldCard} />
                </aside>

                <main className="arena-center-fields">
                    <PlayerField
                        playerData={match.player2}
                        isOpponent={true}
                        onInspectCard={(card) => setInspectedCard(card)}
                        incomingDamage={incomingDamage}
                        isHit={isTargetHit}
                    />

                    <div className="battle-divider" />

                    <PlayerField
                        playerData={match.player1}
                        isOpponent={false}
                        onDropOnActive={handleDropOnActive}
                        onDropOnBench={handleDropOnBench}
                        onInspectCard={(card) => setInspectedCard(card)}
                        isAttacking={isAttacking}
                    />
                </main>
            </div>

            <HandZone
                hand={match.player1.hand}
                onDragStartCard={handleDragStartCard}
            />

            <CardModal
                card={inspectedCard}
                onClose={() => setInspectedCard(null)}
                onSelectAttack={handleExecuteAttack}
                isOwnActiveCard={isInspectedActive}
            />
        </div>
    );
}