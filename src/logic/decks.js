export const player1Deck = [
    {
        id: 'marelix',
        name: 'Marelix',
        type: 'creature',
        faction: 'abyssales',
        hp: 105,
        attacks: [
            { name: 'Hidro-corte', damage: '30' },
            { name: 'Ola Abisal', damage: '50' }
        ]
    },
    {
        id: 'nautilarca',
        name: 'Guardían Abisal',
        type: 'creature',
        faction: 'abyssales',
        hp: 120,
        attacks: [{ name: 'Impacto Coral', damage: '40' }]
    },
    { id: 'p1_card_3', name: 'Colmillo de Guerra', type: 'equipment', faction: 'abyssales' },
    { id: 'p1_card_4', name: 'Poción de Vitalidad', type: 'consumable', faction: 'neutral' },
    { id: 'p1_card_5', name: 'Escudo de Coral', type: 'equipment', faction: 'abyssales' },
    { id: 'p1_card_6', name: 'Elixir de Maná', type: 'consumable', faction: 'neutral' },
    { id: 'p1_card_7', name: 'Tridente Menor', type: 'equipment', faction: 'abyssales' },
    { id: 'p1_card_8', name: 'Ración de Viaje', type: 'consumable', faction: 'neutral' },
    { id: 'p1_card_9', name: 'Amuleto Antiguo', type: 'equipment', faction: 'neutral' },
    { id: 'p1_card_10', name: 'Piedra de Foco', type: 'equipment', faction: 'neutral' },
    { id: 'p1_card_11', name: 'Baya Curativa', type: 'consumable', faction: 'neutral' },
    { id: 'p1_card_12', name: 'Perla Brillante', type: 'consumable', faction: 'abyssales' },
    { id: 'p1_card_13', name: 'Capa de Niebla', type: 'equipment', faction: 'neutral' },
    { id: 'p1_card_14', name: 'Polvo Estelar', type: 'consumable', faction: 'neutral' },
    { id: 'p1_card_15', name: 'Daga Oxidada', type: 'equipment', faction: 'neutral' },
    { id: 'p1_card_16', name: 'Amuleto de Suerte', type: 'equipment', faction: 'neutral' }
];

export const player2Deck = Array.from({ length: 16 }, (_, i) => ({
    id: `p2_card_${i + 1}`,
    name: i === 0 ? 'Aetheris Minor' : `Carta Rival ${i + 1}`,
    type: i === 0 ? 'creature' : 'consumable',
    faction: 'aetherios',
    hp: i === 0 ? 90 : undefined,
    attacks: i === 0 ? [{ name: 'Rayo Etéreo', damage: '35' }] : []
}));