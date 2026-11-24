import CreatureCard from '../card/CreatureCard';
import ItemCard from '../card/ItemCard';
import './CombatSlots.css';

export default function CombatSlots({
    activeCreature,
    bench = [],
    isOpponent = false,
    onDropOnBench,
    onDropOnActive,
    onInspectCard,
    incomingDamage,
    isHit,
    isAttacking,
    renderOnly
}) {
    const benchSlots = isOpponent ? [2, 1, 0] : [0, 1, 2];

    if (renderOnly === 'bench') {
        return (
            <div className="bench-slots-group">
                {benchSlots.map((index) => {
                    const card = bench[index];
                    return (
                        <div
                            key={index}
                            className="slot"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                if (!isOpponent && onDropOnBench) {
                                    onDropOnBench(index);
                                }
                            }}
                        >
                            {card ? (
                                <div className="card-scaler">
                                    {card.type === 'creature' ? (
                                        <CreatureCard
                                            card={card}
                                            factionColor="#38bdf8"
                                            onClick={(clickedCard) => onInspectCard && onInspectCard(clickedCard)}
                                        />
                                    ) : (
                                        <ItemCard
                                            card={card}
                                            onClick={(clickedCard) => onInspectCard && onInspectCard(clickedCard)}
                                        />
                                    )}
                                </div>
                            ) : (
                                `Banca ${index + 1}`
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    if (renderOnly === 'active') {
        return (
            <div
                className="slot active-slot"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (!isOpponent && onDropOnActive) {
                        onDropOnActive();
                    }
                }}
            >
                {activeCreature ? (
                    <div className="card-scaler">
                        {activeCreature.type === 'creature' ? (
                            <CreatureCard
                                card={activeCreature}
                                factionColor="#38bdf8"
                                onClick={(clickedCard) => onInspectCard && onInspectCard(clickedCard)}
                                incomingDamage={isOpponent ? incomingDamage : null}
                                isHit={isOpponent ? isHit : false}
                                isAttacking={!isOpponent ? isAttacking : false}
                            />
                        ) : (
                            <ItemCard
                                card={activeCreature}
                                onClick={(clickedCard) => onInspectCard && onInspectCard(clickedCard)}
                                incomingDamage={isOpponent ? incomingDamage : null}
                                isHit={isOpponent ? isHit : false}
                            />
                        )}
                    </div>
                ) : (
                    'Criatura Activa'
                )}
            </div>
        );
    }

    return null;
}