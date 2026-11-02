import Card from './Card';
import './CombatSlots.css';

export default function CombatSlots({ activeCreature, bench = [] }) {
    const benchSlots = [0, 1, 2];

    return (
        <div className="combat-slots">
            {benchSlots.map((index) => {
                const card = bench[index];
                return (
                    <div key={index} className="slot">
                        {card ? (
                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                <div style={{ transform: 'scale(0.65)', transformOrigin: 'center' }}>
                                    <Card card={card} factionColor="#38bdf8" />
                                </div>
                            </div>
                        ) : (
                            `Banca ${index + 1}`
                        )}
                    </div>
                );
            })}
            <div className="slot active-slot">
                {activeCreature ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <div style={{ transform: 'scale(0.65)', transformOrigin: 'center' }}>
                            <Card card={activeCreature} factionColor="#38bdf8" />
                        </div>
                    </div>
                ) : (
                    'Criatura Activa'
                )}
            </div>
        </div>
    );
}