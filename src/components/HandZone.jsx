import Card from './Card';
import './HandZone.css';

export default function HandZone({ hand = [] }) {
    return (
        <div className="hand-zone">
            {hand.length > 0 ? (
                hand.map((card, index) => (
                    <div
                        key={card.id || index}
                        style={{
                            transform: 'scale(0.8)',
                            transformOrigin: 'bottom center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                        }}
                    >
                        <Card card={card} factionColor="#38bdf8" />
                    </div>
                ))
            ) : (
                <span className="hand-placeholder">No hay cartas en la mano</span>
            )}
        </div>
    );
}