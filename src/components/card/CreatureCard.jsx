import { useState } from 'react';
import CreatureBody from './CreatureBody';
import AttackTooltip from '../ui/AttackTooltip';
import './CreatureCard.css';

export default function CreatureCard({
    card,
    factionColor,
    onClick,
    onAttackClick,
    incomingDamage,
    isHit
}) {
    const [hoveredAttack, setHoveredAttack] = useState(null);
    const [imgExt, setImgExt] = useState('png');
    const [isFlipped, setIsFlipped] = useState(false);

    const folder = `creatures/${card.faction}`;
    const assetUrl = `/assets/${folder}/${card.id}.${imgExt}`;
    const backgroundUrl = `/assets/creatures/${card.faction}/background.jpeg`;
    const frameUrl = `/assets/frames/${card.faction}.png`;
    const cardBackUrl = `/assets/card-back.png`;

    const handleImageError = () => {
        if (imgExt === 'png') setImgExt('jpg'); else setImgExt('failed');
    };

    if (isFlipped) {
        return (
            <div className="card" onClick={() => setIsFlipped(false)}>
                <img className="card-layer card-back-img" src={cardBackUrl} alt="Card Back" />
            </div>
        );
    }

    return (
        <div
            className={`card creature-card ${isHit ? 'is-shaking' : ''}`}
            style={{ '--f': factionColor || '#888' }}
            onClick={(e) => {
                if (onClick) {
                    e.stopPropagation();
                    onClick(card);
                }
            }}
        >
            <img className="card-layer card-bg-img" src={backgroundUrl} alt="Fondo" />

            {imgExt !== 'failed' && (
                <img
                    className="card-layer card-creature-img"
                    src={assetUrl}
                    alt={card.name}
                    onError={handleImageError}
                />
            )}

            <img className="card-layer card-frame-img" src={frameUrl} alt={`Marco ${card.faction}`} />

            {incomingDamage && (
                <div className="damage-popup">
                    -{incomingDamage}
                </div>
            )}

            <div className="card-title-box">
                <span className="card-title">{card.name}</span>
            </div>

            {card.hp && (
                <div className="card-hp-badge">
                    <span className="hp-value">{card.hp}</span>
                </div>
            )}

            <div className="card-body-box">
                <CreatureBody
                    attacks={card.attacks}
                    onHoverAttack={setHoveredAttack}
                    onAttackClick={onAttackClick}
                />
            </div>

            {hoveredAttack && <AttackTooltip attack={hoveredAttack} />}
        </div>
    );
}