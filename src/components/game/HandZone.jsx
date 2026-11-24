import CreatureCard from '../card/CreatureCard';
import ItemCard from '../card/ItemCard';
import './HandZone.css';

export default function HandZone({ hand = [], onDragStartCard }) {
    const totalCards = hand.length;
    const centerIndex = (totalCards - 1) / 2;
    const angleStep = totalCards > 6 ? 5 : 7;
    const archDrop = 4;

    return (
        <div className="hand-zone">
            {totalCards > 0 ? (
                <div className="hand-fan-wrapper">
                    {hand.map((card, index) => {
                        const offset = index - centerIndex;
                        const rotation = offset * angleStep;
                        const translateY = Math.pow(Math.abs(offset), 1.6) * archDrop;

                        return (
                            <div
                                key={card.id ? `${card.id}-${index}` : index}
                                className="hand-card-slot"
                                style={{
                                    '--card-rotate': `${rotation}deg`,
                                    '--card-y': `${translateY}px`,
                                    zIndex: index + 1
                                }}
                                draggable={true}
                                onDragStart={() => onDragStartCard && onDragStartCard(index)}
                            >
                                <div className="hand-card-scaler">
                                    {card.type === 'creature' ? (
                                        <CreatureCard card={card} factionColor="#38bdf8" />
                                    ) : (
                                        <ItemCard card={card} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <span className="hand-placeholder">No hay cartas en la mano</span>
            )}
        </div>
    );
}