import { useState } from 'react';
import CreatureBody from './CreatureBody';
import ItemBody from './ItemBody';
import AttackTooltip from './AttackTooltip';
import './Card.css';

export default function Card({ card, factionColor }) {
    console.log("Datos recibidos en la carta:", card);
    const [hoveredAttack, setHoveredAttack] = useState(null);
    const [imgExt, setImgExt] = useState('png');

    const folder = card.type === 'creature' ? 'creatures' : card.type;
    const artUrl = card.faction
        ? `/assets/${folder}/${card.faction}/${card.id}.${imgExt}`
        : `/assets/${folder}/${card.id}.${imgExt}`;

    const handleImageError = () => {
        if (imgExt === 'png') setImgExt('jpg'); else setImgExt('failed');
    };

    return (
        <div className="card" style={{ '--f': factionColor || '#888', background: '#1e293b' }}>
            {imgExt !== 'failed' ? (
                <img
                    className="card-art"
                    src={artUrl}
                    alt={card.name}
                    onError={handleImageError}
                />
            ) : (
                <div className="card-art-placeholder" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    fontSize: '3rem',
                    opacity: 0.2
                }}>
                    ⚡
                </div>
            )}

            <div className="card-header-box">
                <span className="card-title">{card.name}</span>
                {card.hp && <span className="card-hp">HP: {card.hp}</span>}
            </div>

            <div className="card-body-box">
                {card.type === 'creature'
                    ? (<CreatureBody attacks={card.attacks} onHoverAttack={setHoveredAttack} />)
                    : (<ItemBody description={card.description} effect={card.effect} duration={card.duration} />)
                }
            </div>

            {card.atk && (
                <div className="card-stats">
                    <span>⚔ {card.atk}</span>
                </div>
            )}

            {hoveredAttack && <AttackTooltip attack={hoveredAttack} />}
        </div>
    );
}