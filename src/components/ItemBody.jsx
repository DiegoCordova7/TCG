export default function ItemBody({ description, effect, duration, restriction }) {
    return (
        <div className="item-body">
            <p className="item-desc">{description}</p>
            {effect && <p className="item-effect"><strong>Efecto:</strong> {effect}</p>}
            {duration && <p className="item-duration"><strong>Duración:</strong> {duration}</p>}
            {restriction && <p className="item-restriction"><strong>Restricción:</strong> {restriction}</p>}
        </div>
    );
}