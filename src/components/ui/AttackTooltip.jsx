import './AttackTooltip.css';

export default function AttackTooltip({ attack }) {
    return (
        <div className="card-tooltip">
            <h4>{attack.name} — {attack.damage} DMG</h4>
            <p>{attack.description}</p>
        </div>
    );
}