import CreatureCard from '../card/CreatureCard';
import { getFactionLabel } from '../../logic/gachaLogic';
import './GachaResult.css';

// Mismo recurso de reverso que utiliza CreatureCard.
const CARD_BACK_URL = '/assets/card-back.png';

// Diferencia de tiempo entre la revelación de una carta y la siguiente (invocación doble).
const REVEAL_DELAY_SECONDS = 0.35;

/*
 * Animación del portal de invocación.
 * Cuando termina la animación principal del contenedor, avisa con onFinish()
 * para que la vista pase a mostrar las cartas.
 */
function SummonPortal({ onFinish }) {
    function handleAnimationEnd(event) {
        // Los anillos internos también tienen animaciones y su evento "sube" hasta aquí.
        // Solo nos interesa el final de la animación del propio contenedor.
        if (event.target === event.currentTarget) {
            onFinish();
        }
    }

    return (
        <div className="summon-portal" onAnimationEnd={handleAnimationEnd}>
            <div className="summon-portal-ring summon-portal-ring-outer" />
            <div className="summon-portal-ring summon-portal-ring-inner" />
            <div className="summon-portal-core" />
            <p className="summon-portal-text">Invocando…</p>
        </div>
    );
}

/*
 * Una carta revelada.
 * Tiene dos caras: el reverso (card-back.png) y el frente (CreatureCard real).
 * La animación CSS voltea la carta del reverso al frente.
 * revealOrder indica el orden (0, 1) para escalonar la revelación.
 */
function RevealedCard({ creature, revealOrder }) {
    const delayStyle = { '--reveal-delay': `${revealOrder * REVEAL_DELAY_SECONDS}s` };

    return (
        <div className={`revealed-card faction-${creature.faction}`} style={delayStyle}>
            {/* Reserva el espacio que ocupa la carta ya escalada */}
            <div className="revealed-card-slot">
                {/* Escala la carta de 300 × 420 px al tamaño deseado */}
                <div className="revealed-card-scaler">
                    <div className="revealed-card-flipper">
                        <div className="revealed-card-face revealed-card-back">
                            <div className="card">
                                <img className="card-layer card-back-img" src={CARD_BACK_URL} alt="Reverso de la carta" />
                            </div>
                        </div>
                        <div className="revealed-card-face revealed-card-front">
                            <CreatureCard card={creature} factionColor="#38bdf8" />
                        </div>
                    </div>
                </div>
            </div>

            <p className="revealed-card-name">{creature.name}</p>
            <p className="revealed-card-faction">{getFactionLabel(creature.faction)}</p>
        </div>
    );
}

/*
 * Modal de invocación.
 * - phase 'summoning': muestra el portal.
 * - phase 'results': muestra las cartas obtenidas y el botón Continuar.
 */
export default function GachaResult({ phase, creatures, onPortalEnd, onContinue }) {
    const isDouble = creatures.length > 1;
    // El botón Continuar aparece cuando ya se reveló la última carta.
    const continueDelay = { '--continue-delay': `${(creatures.length - 1) * REVEAL_DELAY_SECONDS + 1}s` };

    return (
        <div className="gacha-result-overlay">
            {phase === 'summoning' && <SummonPortal onFinish={onPortalEnd} />}

            {phase === 'results' && (
                <div className="gacha-result-content">
                    {/* Destello de luz al abrirse el portal */}
                    <div className="gacha-result-flash" />

                    <h3 className="gacha-result-title">
                        {isDouble ? '¡Dos criaturas responden al llamado!' : '¡Una criatura responde al llamado!'}
                    </h3>

                    <div className={`revealed-cards ${isDouble ? 'is-double' : 'is-single'}`}>
                        {creatures.map((creature, index) => (
                            <RevealedCard
                                key={index}
                                creature={creature}
                                revealOrder={index}
                            />
                        ))}
                    </div>

                    <button className="gacha-continue-btn" style={continueDelay} onClick={onContinue}>
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
}
