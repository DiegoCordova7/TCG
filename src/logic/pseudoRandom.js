/*
 * Generador de números pseudoaleatorios XORSHIFT de 32 bits (George Marsaglia, 2003).
 *
 * Idea general:
 *   - Se guarda un número entero de 32 bits llamado "estado".
 *   - Para obtener el siguiente número, el estado se mezcla consigo mismo
 *     usando desplazamientos de bits (<<, >>>) y XOR (^).
 *   - El resultado se convierte en un decimal entre 0 y 1.
 *
 * Con los desplazamientos 13, 17 y 5 el generador recorre todos los
 * valores de 1 a 2^32 - 1 (4,294,967,295 números) antes de repetir la
 * secuencia. El estado nunca puede ser 0, porque 0 siempre daría 0.
 *
 * Se eligió en lugar del método de cuadrados medios porque este último
 * cae rápidamente en ciclos cortos o en 0, y las criaturas se repetirían.
 */

// 2^32: cantidad de valores distintos que caben en 32 bits.
const UINT32_RANGE = 4294967296;

// Semilla de respaldo (la que usa Marsaglia en su artículo) por si la calculada fuera 0.
const FALLBACK_SEED = 2463534242;

// Números que se descartan después de fijar la semilla (ver setSeed).
const WARM_UP_STEPS = 20;

let state = FALLBACK_SEED;

/*
 * Un paso del algoritmo xorshift32.
 * - x << 13  : desplaza los bits 13 lugares a la izquierda.
 * - x >>> 17 : desplaza 17 lugares a la derecha (rellenando con ceros).
 * - x << 5   : desplaza 5 lugares a la izquierda.
 * Cada desplazamiento se combina con el valor anterior mediante XOR (^).
 * ">>> 0" convierte el resultado a entero sin signo de 32 bits.
 */
function xorshift32(x) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return x >>> 0;
}

/*
 * Fija la semilla del generador.
 * Con la misma semilla siempre se obtiene la misma secuencia
 * (útil para comprobar el algoritmo en pruebas).
 *
 * Semillas parecidas (por ejemplo, dos horas casi iguales) producen
 * primeros resultados parecidos. Por eso se "calienta" el generador
 * descartando algunos números antes de usarlo.
 */
export function setSeed(seed) {
    state = (seed >>> 0) || FALLBACK_SEED;

    for (let i = 0; i < WARM_UP_STEPS; i++) {
        state = xorshift32(state);
    }
}

/*
 * Devuelve el siguiente número pseudoaleatorio entre 0 y 1 (sin llegar a 1),
 * igual que lo haría Math.random().
 * Como el estado está entre 1 y 2^32 - 1, al dividir entre 2^32
 * el resultado siempre es menor que 1.
 */
export function nextRandom() {
    state = xorshift32(state);
    return state / UINT32_RANGE;
}

/*
 * Semilla inicial: la hora actual en milisegundos (Date.now()).
 * ">>> 0" conserva solo los 32 bits inferiores, que son los que más cambian.
 * Así cada vez que se abre el juego la secuencia es distinta.
 */
setSeed(Date.now());
