import './ItemBody.css';

export default function ItemBody({ description, effect, duration, restriction }) {
    return (
        <div className="item-body-container">
            {description && (
                <p className="item-description">"{description}"</p>
            )}
            <div className="item-effect-box">
                <span className="item-effect-label">Efecto:</span>
                <p className="item-effect-text">{effect}</p>
            </div>
            {duration && (
                <div className="item-meta-row">
                    <span className="meta-label">Duración:</span>
                    <span className="meta-value">{duration}</span>
                </div>
            )}
            {restriction && (
                <div className="item-meta-row restriction-row">
                    <span className="meta-label">Restricción:</span>
                    <span className="meta-value">{restriction}</span>
                </div>
            )}
        </div>
    );
}