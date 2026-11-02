import CombatSlots from './CombatSlots';
import './PlayerField.css';

export default function PlayerField({ playerData, isOpponent = false }) {
    if (!playerData) return null;

    return (
        <div className={`player-field ${isOpponent ? 'opponent-field' : ''}`}>
            <div className="battlefield-row">
                <div className="discard-zone">
                    <span>Descarte</span>
                    <strong style={{ fontSize: '0.9rem', color: '#f8fafc', marginTop: '4px' }}>
                        {playerData.discardPile?.length || 0}
                    </strong>
                </div>
                <CombatSlots
                    activeCreature={playerData.activeCreature}
                    bench={playerData.bench}
                />
                <div className="deck-zone">
                    <span>Mazo</span>
                    <strong style={{ fontSize: '0.9rem', color: '#38bdf8', marginTop: '4px' }}>
                        {playerData.deck?.length || 0}
                    </strong>
                </div>
            </div>
        </div>
    );
}