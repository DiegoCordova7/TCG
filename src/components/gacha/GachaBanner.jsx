import './GachaBanner.css';

/*
 * Secciones del banner, en el orden de la cuadrícula 3 × 2:
 *   Aetherios | Abyssales | Colosos
 *   Ferox     | Némora    | Vésperos
 *
 * - faction: id de la facción tal como aparece en creatures.json.
 * - label: nombre que se muestra en el banner.
 * - creatureId: criatura representativa (existe en creatures.json y pertenece a esa facción).
 *
 * La cuadrícula es solo decorativa: no influye en las probabilidades de invocación.
 */
const BANNER_SECTIONS = [
    { faction: 'aetherios', label: 'Aetherios', creatureId: 'celestornis' },
    { faction: 'abyssales', label: 'Abyssales', creatureId: 'marelix' },
    { faction: 'colosos', label: 'Colosos', creatureId: 'rocantrun' },
    { faction: 'ferox', label: 'Ferox', creatureId: 'leoncrita' },
    { faction: 'nemora', label: 'Némora', creatureId: 'pantanela' },
    { faction: 'vesperos', label: 'Vésperos', creatureId: 'lumiprisma' },
];

/*
 * Las rutas siguen la misma convención que CreatureCard:
 *   fondo    → /assets/creatures/{facción}/background.jpeg
 *   criatura → /assets/creatures/{facción}/{id}.png
 */
function getBackgroundUrl(faction) {
    return `/assets/creatures/${faction}/background.jpeg`;
}

function getCreatureUrl(faction, creatureId) {
    return `/assets/creatures/${faction}/${creatureId}.png`;
}

function BannerSection({ faction, label, creatureId }) {
    return (
        <div className={`banner-section faction-${faction}`}>
            <img
                className="banner-section-bg"
                src={getBackgroundUrl(faction)}
                alt=""
            />
            <img
                className="banner-section-creature"
                src={getCreatureUrl(faction, creatureId)}
                alt={`Criatura de ${label}`}
            />
            <span className="banner-section-name">{label}</span>
        </div>
    );
}

export default function GachaBanner() {
    return (
        <section className="gacha-banner">
            <div className="banner-heading">
                <span className="banner-tag">Banner permanente</span>
                <h3 className="banner-title">Ecos del destino</h3>
                <p className="banner-description">
                    Las seis facciones responden a tu llamado. Invoca y descubre qué criatura
                    cruza el umbral del destino.
                </p>
            </div>

            <div className="banner-grid">
                {BANNER_SECTIONS.map((section) => (
                    <BannerSection key={section.faction} {...section} />
                ))}
            </div>
        </section>
    );
}
