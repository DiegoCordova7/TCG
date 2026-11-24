import { GameMatch } from './GameMatch';

const fullDeckP1 = Array.from({ length: 16 }, (_, i) => ({
    id: `card_${i}`,
    name: `Carta ${i}`,
    type: i === 0 ? 'creature' : (i % 2 === 0 ? 'equipment' : 'consumable'),
    hp: i === 0 ? 100 : undefined
}));

const fullDeckP2 = Array.from({ length: 16 }, (_, i) => ({
    id: `card_p2_${i}`,
    name: `Carta P2 ${i}`,
    type: i === 0 ? 'creature' : 'consumable',
    hp: i === 0 ? 100 : undefined
}));

const match = new GameMatch(fullDeckP1, fullDeckP2);

console.log("=== INICIANDO PRUEBA DE PARTIDA ===");
match.startMatch();

console.log(`Turno actual: ${match.turnNumber} | Fase: ${match.phase}`);
console.log(`Mano Jugador 1 (Cartas: ${match.player1.hand.length}):`, match.player1.hand.map(c => c.name));
console.log(`¿Tiene criatura el J1 en mano?:`, match.player1.hand.some(c => c.type === 'creature'));

console.log(`\nMano Jugador 2 (Cartas: ${match.player2.hand.length}):`, match.player2.hand.map(c => c.name));

console.log("\n--- FIN DEL TURNO 1 ---");
match.endTurn();
console.log(`Nuevo turno activo: ${match.activePlayer}`);
console.log(`Cartas en mano del J2 tras robar automáticamente:`, match.player2.hand.length);