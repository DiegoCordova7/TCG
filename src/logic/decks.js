import creaturesData from '../data/creatures.json';
import objectsData from '../data/objects.json';

const getCreatureTemplate = (id) => {
    const creature = creaturesData.creatures.find(c => c.id === id);
    if (!creature) return null;

    return {
        id: creature.id,
        name: creature.name,
        type: 'creature',
        faction: creature.faction,
        hp: creature.hp,
        attacks: creature.attacks || []
    };
};

const getObjectTemplate = (type, id) => {
    const list = objectsData[type];
    if (!list) return null;
    const item = list.find(i => i.id === id);
    if (!item) return null;

    return {
        id: item.id,
        name: item.name,
        type: type,
        faction: 'neutral',
        description: item.description,
        effect: item.effect,
        duration: item.duration,
        restriction: item.restriction
    };
};

export const player1Deck = [
    getCreatureTemplate('marelix'),
    getCreatureTemplate('nautilarca'),
    getCreatureTemplate('celestornis'),
    getObjectTemplate('consumable', 'pocion_de_vitalidad'),
    getObjectTemplate('equipment', 'colmillo_de_guerra'),
    getCreatureTemplate('lumiprisma'),
    getObjectTemplate('consumable', 'antidoto_silvestre'),
    getObjectTemplate('artifact', 'reloj_del_destino')
].filter(Boolean);

export const player2Deck = [
    getCreatureTemplate('galarum'),
    getCreatureTemplate('titanombu'),
    getCreatureTemplate('leoncrita'),
    getObjectTemplate('equipment', 'amuleto_de_piedra_lunar'),
    getObjectTemplate('consumable', 'fruto_de_energia'),
    getCreatureTemplate('pantanela'),
    getObjectTemplate('artifact', 'ojo_del_dragon'),
    getObjectTemplate('equipment', 'cristal_de_concentracion')
].filter(Boolean).map((card) => ({ ...card, id: card.id }));