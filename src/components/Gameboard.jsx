import { useState } from 'react';
import { GameMatch } from '../logic/GameMatch';
import { player1Deck, player2Deck } from '../logic/decks'; // <-- Importamos los mazos reales
import PlayerField from './PlayerField';
import FieldCardSlot from './FieldCardSlot';
import HandZone from './HandZone';
import './Gameboard.css';

export default function Gameboard() {
    const [match] = useState(() => {
        const game = new GameMatch(player1Deck, player2Deck);
        game.startMatch();
        return game;
    });
    const [, setTick] = useState(0);
    const updateUI = () => setTick(prev => prev + 1);
    const handleEndTurn = () => {
        match.endTurn();
        updateUI();
    };
    return (
        <div className="tabletop-container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 10px' }}>
                <div>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Turno {match.turnNumber} | Jugador Activo: </span>
                    <strong style={{ color: '#38bdf8' }}>{match.activePlayer.toUpperCase()}</strong>
                </div>
                <button
                    onClick={handleEndTurn}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Terminar Turno
                </button>
            </header>

            <PlayerField playerData={match.player2} isOpponent={true} />
            <FieldCardSlot fieldCard={match.globalFieldCard} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <PlayerField playerData={match.player1} isOpponent={false} />
                <HandZone hand={match.player1.hand} />
            </div>
        </div>
    );
}