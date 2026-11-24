import './FieldCardSlot.css';

export default function FieldCardSlot({ fieldCard }) {
    const fieldAssetUrl = fieldCard ? `/assets/fields/${fieldCard.id}_Campo.png` : null;
    return (
        <div className="neutral-field-strip">
            <div className="field-card-slot">
                {fieldCard ? (
                    <div
                        className="active-field-card"
                        style={{ backgroundImage: `url(${fieldAssetUrl})` }}
                    >
                        <div className="field-overlay-title">
                            <span>{fieldCard.name}</span>
                        </div>
                    </div>
                ) : (
                    <span className="field-placeholder">Carta de Campo</span>
                )}
            </div>
        </div>
    );
}