import { useState } from 'react';
import CreatureBody from './CreatureBody';
import ItemBody from './ItemBody';
import AttackTooltip from './AttackTooltip';
import './Card.css';

export default function Card({ card, factionColor }) {
    const [hoveredAttack, setHoveredAttack] = useState(null);
    const [imgExt, setImgExt] = useState('png');
    const [isFlipped, setIsFlipped] = useState(false);

    const folder = card.type === 'creature' ? 'creatures' : card.type;

    const backgroundUrl = `/assets/${folder}/${card.faction}/background.jpeg`;
    const creatureUrl = `/assets/${folder}/${card.faction}/${card.id}.${imgExt}`;
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
        <div className="card" style={{ '--f': factionColor || '#888' }}>
            <img
                className="card-layer card-bg-img"
                src={backgroundUrl}
                alt="Fondo de Facción"
            />
            {imgExt !== 'failed' && card.type === 'creature' && (
                <img
                    className="card-layer card-creature-img"
                    src={creatureUrl}
                    alt={card.name}
                    onError={handleImageError}
                />
            )}
            <img
                className="card-layer card-frame-img"
                src={frameUrl}
                alt={`Marco ${card.faction}`}
            />
            <div className="card-title-box">
                <span className="card-title">{card.name}</span>
            </div>
            {card.hp && (
                <div className="card-hp-badge">
                    <span className="hp-value">{card.hp}</span>
                </div>
            )}
            <div className="card-body-box">
                {card.type === 'creature'
                    ? (<CreatureBody attacks={card.attacks} onHoverAttack={setHoveredAttack} />)
                    : (<ItemBody description={card.description} effect={card.effect} duration={card.duration} />)
                }
            </div>
            {hoveredAttack && <AttackTooltip attack={hoveredAttack} />}
        </div>
    );
}