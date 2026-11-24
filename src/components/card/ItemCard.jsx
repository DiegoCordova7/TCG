import { useState } from 'react';
import ItemBody from './ItemBody';
import './ItemCard.css';

export default function ItemCard({ card, onClick }) {
    const [imgExt, setImgExt] = useState('png');
    const [isFlipped, setIsFlipped] = useState(false);
    if (!card) return null;
    const folder = `objects/${card?.type}`;
    const assetUrl = `/assets/${folder}/${card?.id}.${imgExt}`;
    const frameUrl = `/assets/frames/objects.png`;
    const cardBackUrl = `/assets/card-back.png`;
    const handleImageError = () => {
        if (imgExt === 'png') {
            setImgExt('jpg');
        } else {
            setImgExt('failed');
        }
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
            className="card item-card"
            onClick={(e) => {
                if (onClick) {
                    e.stopPropagation();
                    onClick(card);
                }
            }}
        >
            {imgExt !== 'failed' && (
                <img
                    className="card-layer card-object-img"
                    src={assetUrl}
                    alt={card.name}
                    onError={handleImageError}
                />
            )}

            <img className="card-layer card-frame-img" src={frameUrl} alt="Marco de Objeto" />

            <div className="card-title-box">
                <span className="card-title">{card.name}</span>
            </div>

            <div className="card-body-box">
                <ItemBody
                    description={card.description}
                    effect={card.effect}
                    duration={card.duration}
                    restriction={card.restriction}
                />
            </div>
        </div>
    );
}