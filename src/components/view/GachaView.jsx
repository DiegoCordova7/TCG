import { useState } from 'react';
import GachaBanner from '../gacha/GachaBanner';
import GachaResult from '../gacha/GachaResult';
import { summonCreatures } from '../../logic/gachaLogic';
import './GachaView.css';

/*
 * Vista principal del Gacha.
 * Orden de la pantalla: cabecera, banner "Ecos del destino"
 * y botones de invocación.
 * (El historial se agregará cuando exista la base de datos.)
 *
 * La invocación pasa por tres fases:
 *   'idle'      → se ve el banner y se puede invocar.
 *   'summoning' → animación del portal.
 *   'results'   → se revelan las cartas obtenidas.
 */
export default function GachaView({ onBackToMenu }) {
    const [phase, setPhase] = useState('idle');
    // Criaturas obtenidas en la invocación actual (1 o 2).
    const [currentSummon, setCurrentSummon] = useState([]);

    const isSummoning = phase !== 'idle';

    // Realiza una invocación gratuita de `amount` criaturas.
    function handleSummon(amount) {
        // Evita iniciar otra invocación mientras hay una en curso.
        if (isSummoning) return;

        // La selección aleatoria se hace UNA sola vez, aquí.
        // La animación solo muestra estas criaturas; no vuelve a sortear.
        setCurrentSummon(summonCreatures(amount));
        setPhase('summoning');
    }

    return (
        <div className="gacha-container">
            <header className="gacha-header">
                <button className="gacha-back-btn" onClick={onBackToMenu}>← Volver al Menú</button>
                <div className="gacha-heading">
                    <h2 className="gacha-title">Gacha</h2>
                    <p className="gacha-subtitle">
                        Simulador de invocación. Todas las criaturas tienen la misma probabilidad.
                    </p>
                </div>
            </header>

            <GachaBanner />

            <div className="gacha-summon-bar">
                <div className="gacha-summon-buttons">
                    <button
                        className="gacha-summon-btn"
                        onClick={() => handleSummon(1)}
                        disabled={isSummoning}
                    >
                        Invocar ×1
                    </button>
                    <button
                        className="gacha-summon-btn gacha-summon-btn-double"
                        onClick={() => handleSummon(2)}
                        disabled={isSummoning}
                    >
                        Invocar ×2
                    </button>
                </div>
                <p className="gacha-summon-note">Invocaciones gratuitas e ilimitadas.</p>
            </div>

            {isSummoning && (
                <GachaResult
                    phase={phase}
                    creatures={currentSummon}
                    onPortalEnd={() => setPhase('results')}
                    onContinue={() => setPhase('idle')}
                />
            )}
        </div>
    );
}
