import './FieldCard.css';

export default function FieldCard({ card, onClick }) {
    if (!card) return null;

    return (
        <div
            className="card field-card"
            onClick={(e) => {
                if (onClick) {
                    e.stopPropagation();
                    onClick(card);
                }
            }}
        >
            <img
                className="card-layer card-bg-img"
                src={card.cardImage}
                alt={card.name}
            />
            <img
                className="card-layer card-frame-img"
                src="/assets/frames/field_frame.png"
                alt="Marco de Campo"
            />
            <div className="card-title-box">
                <span className="card-title">{card.name}</span>
            </div>
            <div className="field-effect-box">
                <span className="field-type-badge">CAMPO GLOBAL</span>
                <p className="field-description">{card.effect || card.description}</p>
            </div>
        </div>
    );
}