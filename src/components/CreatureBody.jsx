export default function CreatureBody({ attacks, onHoverAttack }) {
    return (
        <div className="attacks-list">
            {attacks?.map((atk, index) => (
                <div
                    key={index}
                    className="attack-item"
                    onMouseEnter={() => onHoverAttack(atk)}
                    onMouseLeave={() => onHoverAttack(null)}
                >
                    <span className="atk-name">{atk.name}</span>
                    <span className="atk-dmg">{atk.damage}</span>
                </div>
            ))}
        </div>
    );
}