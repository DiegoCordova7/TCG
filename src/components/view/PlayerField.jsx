import CombatSlots from '../game/CombatSlots';
import './PlayerField.css';

export default function PlayerField({
    playerData,
    isOpponent = false,
    onDropOnBench,
    onDropOnActive,
    onInspectCard,
    incomingDamage,
    isHit,
    isAttacking
}) {
    if (!playerData) return null;

    const activeRow = (
        <div className="active-creature-row" key="active">
            <CombatSlots
                renderOnly="active"
                activeCreature={playerData.activeCreature}
                isOpponent={isOpponent}
                onDropOnActive={onDropOnActive}
                onInspectCard={onInspectCard}
                incomingDamage={incomingDamage}
                isHit={isHit}
                isAttacking={isAttacking}
            />
        </div>
    );

    const battlefieldRow = (
        <div className="battlefield-row" key="battlefield">
            {isOpponent ? (
                <>
                    <div className="deck-zone">
                        <span>Mazo</span>
                        <strong style={{ fontSize: '0.9rem', color: '#38bdf8', marginTop: '4px' }}>
                            {playerData.deck?.length || 0}
                        </strong>
                    </div>
                    <div className="bench-slots-group">
                        <CombatSlots
                            renderOnly="bench"
                            bench={playerData.bench}
                            isOpponent={isOpponent}
                            onDropOnBench={onDropOnBench}
                            onInspectCard={onInspectCard}
                        />
                    </div>
                    <div className="discard-zone">
                        <span>Descarte</span>
                        <strong style={{ fontSize: '0.9rem', color: '#f8fafc', marginTop: '4px' }}>
                            {playerData.discardPile?.length || 0}
                        </strong>
                    </div>
                </>
            ) : (
                <>
                    <div className="discard-zone">
                        <span>Descarte</span>
                        <strong style={{ fontSize: '0.9rem', color: '#f8fafc', marginTop: '4px' }}>
                            {playerData.discardPile?.length || 0}
                        </strong>
                    </div>
                    <div className="bench-slots-group">
                        <CombatSlots
                            renderOnly="bench"
                            bench={playerData.bench}
                            isOpponent={isOpponent}
                            onDropOnBench={onDropOnBench}
                            onInspectCard={onInspectCard}
                        />
                    </div>
                    <div className="deck-zone">
                        <span>Mazo</span>
                        <strong style={{ fontSize: '0.9rem', color: '#38bdf8', marginTop: '4px' }}>
                            {playerData.deck?.length || 0}
                        </strong>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className={`player-field ${isOpponent ? 'opponent-field' : ''}`}>
            {isOpponent ? (
                <>
                    {battlefieldRow}
                    {activeRow}
                </>
            ) : (
                <>
                    {activeRow}
                    {battlefieldRow}
                </>
            )}
        </div>
    );
}