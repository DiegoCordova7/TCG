import './CreatureBody.css';

export default function CreatureBody({ attacks = [], onHoverAttack, onAttackClick }) {
    if (!attacks || attacks.length === 0) {
        return <div className="creature-body-empty">Sin ataques registrados</div>;
    }

    return (
        <div className="creature-attacks-container">
            {attacks.map((atk, index) => (
                <div
                    key={index}
                    className={`creature-attack-item ${onAttackClick ? 'attack-clickable' : ''}`}
                    onMouseEnter={() => onHoverAttack && onHoverAttack(atk)}
                    onMouseLeave={() => onHoverAttack && onHoverAttack(null)}
                    onClick={(e) => {
                        if (onAttackClick) {
                            e.stopPropagation();
                            onAttackClick(index);
                        }
                    }}
                >
                    <div className="attack-header-row">
                        <span className="attack-name">{atk.name}</span>
                        <span className="attack-damage">{atk.damage !== undefined ? `${atk.damage} DMG` : ''}</span>
                    </div>
                    {atk.description && (
                        <p className="attack-description">{atk.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}