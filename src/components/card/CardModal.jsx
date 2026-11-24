import CreatureCard from './CreatureCard';
import ItemCard from './ItemCard';
import './CardModal.css';

export default function CardModal({ card, onClose, onSelectAttack, isOwnActiveCard = false }) {
    if (!card) return null;

    const handleAttackTrigger = (attackIndex) => {
        if (onSelectAttack) onSelectAttack(attackIndex);
        if (onClose) onClose();
    };

    return (
        <div className="card-modal-overlay" onClick={onClose}>
            <div className="card-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="card-modal-close" onClick={onClose}>✕</button>
                <div className="card-modal-scale-wrapper">
                    {card.type === 'creature' ? (
                        <CreatureCard
                            card={card}
                            factionColor="#38bdf8"
                            onAttackClick={isOwnActiveCard ? handleAttackTrigger : undefined}
                        />
                    ) : (
                        <ItemCard card={card} />
                    )}
                </div>
                <p className="card-modal-hint">
                    {isOwnActiveCard
                        ? "Haz clic en un ataque para ejecutarlo contra el rival"
                        : "Carta en inspección (Haz clic fuera para cerrar)"}
                </p>
            </div>
        </div>
    );
}