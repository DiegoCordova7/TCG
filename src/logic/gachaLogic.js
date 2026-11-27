import creaturesData from '../data/creatures.json';
import { nextRandom } from './pseudoRandom';

/*
 * Convierte una criatura de creatures.json al formato que espera CreatureCard.
 * Es el mismo formato que ya usan CardGallery y decks.js.
 */
function toCreatureCard(creature) {
    return {
        id: creature.id,
        name: creature.name,
        type: 'creature',
        faction: creature.faction,
        hp: creature.hp,
        attacks: creature.attacks || []
    };
}

/*
 * Nombres de las facciones tal como se muestran en el Gacha.
 * Las claves son los ids de creatures.json, que no se modifican.
 */
export const FACTION_LABELS = {
    aetherios: 'Aetherios',
    abyssales: 'Abyssales',
    colosos: 'Colosos',
    ferox: 'Ferox',
    nemora: 'Némora',
    vesperos: 'Vésperos'
};

// Devuelve el nombre visible de una facción (o el id si no está en la lista).
export function getFactionLabel(faction) {
    return FACTION_LABELS[faction] || faction;
}

/*
 * Grupo de invocación: TODAS las criaturas de creatures.json (las 18 actuales),
 * de las seis facciones. No se elige una facción antes de invocar.
 * Si se agregan criaturas al JSON, entran automáticamente al grupo.
 */
export const SUMMON_POOL = creaturesData.creatures.map(toCreatureCard);

/*
 * Selección pseudoaleatoria con la misma probabilidad para cada criatura.
 *
 * 1. nextRandom() (generador xorshift de pseudoRandom.js) devuelve
 *    un decimal entre 0 (incluido) y 1 (excluido).
 * 2. Al multiplicarlo por la cantidad de criaturas se obtiene un número
 *    entre 0 y la cantidad (sin llegar a ella). Con 18: de 0 a 17.99...
 * 3. Math.floor lo redondea hacia abajo y da un índice entero de 0 a 17.
 *
 * Así el índice siempre es válido y cada criatura tiene 1 / 18 ≈ 5.56 %.
 * Si en el futuro se agregan rarezas, solo habría que cambiar esta función.
 */
export function pickRandomCreature(creatures) {
    if (creatures.length === 0) return null;

    const randomIndex = Math.floor(nextRandom() * creatures.length);
    return creatures[randomIndex];
}

/*
 * Realiza una invocación de `amount` criaturas (1 o 2 en el Gacha).
 * Cada tirada es independiente: siempre se elige sobre el grupo completo,
 * sin quitar lo que ya salió, por lo que las repeticiones son posibles,
 * incluso dentro de la misma invocación doble.
 */
export function summonCreatures(amount) {
    const results = [];

    for (let i = 0; i < amount; i++) {
        results.push(pickRandomCreature(SUMMON_POOL));
    }

    return results;
}
