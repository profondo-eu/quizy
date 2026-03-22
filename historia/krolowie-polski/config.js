/* globals shared across all modules */

const STREAK_TO_MASTER = 3;
const DELAY_CORRECT = 800;
const DELAY_WRONG = 2000;
const DELAY_MASTERED = 1200;
const TIMELINE_SIZE_MIN = 3;
const TIMELINE_SIZE_MAX = 5;
const DELAY_TIMELINE_BASE = 5000;
const DELAY_TIMELINE_PER_WRONG = 5000;
const DELAY_TIMELINE_MAX = 20000;

const DIFFICULTY_THRESHOLD_MEDIUM = 0.3;
const DIFFICULTY_THRESHOLD_HARD = 0.7;
const DISTRACTOR_YEAR_RANGE_MEDIUM = 100;
const DISTRACTOR_YEAR_RANGE_HARD = 80;

const DYNASTY_GROUPS = [
    { id: 'piastowie-ksiazeta', label: 'Piastowie (książęta)', match: k => k.dynasty === 'Piastowie' && k.rulerType === 'książę' },
    { id: 'piastowie-krolowie', label: 'Piastowie (królowie) i Przemyślidzi', match: k => (k.dynasty === 'Piastowie' && k.rulerType === 'król') || k.dynasty === 'Przemyślidzi' },
    { id: 'andegawenowie', label: 'Andegawenowie', match: k => k.dynasty === 'Andegawenowie' },
    { id: 'jagiellonowie', label: 'Jagiellonowie', match: k => k.dynasty === 'Jagiellonowie' },
    { id: 'elekcyjni', label: 'Władcy elekcyjni', match: k => !['Piastowie', 'Przemyślidzi', 'Andegawenowie', 'Jagiellonowie'].includes(k.dynasty) },
];

const MODES = [
    { id: 2, icon: '🎯', name: 'Rok → Władca', desc: 'Wybierz władcę z 4 opcji', badge: 'Start' },
    { id: 3, icon: '📅', name: 'Oś czasu', desc: 'Ułóż w kolejności' },
    { id: 1, icon: '✍️', name: 'Władca → Rok', desc: 'Wpisz rok objęcia władzy' },
    { id: 4, icon: '🔍', name: 'Kontekst → Władca', desc: 'Rozpoznaj po opisie' },
    { id: 'mix', icon: '🔀', name: 'Miks trybów', desc: 'Losowy tryb co pytanie', fullWidth: true },
];

const MAP_COLORS = {
    crown: '#3b82f6',
    lithuania: '#93c5fd',
    unified: '#3b82f6',
    stroke: '#1e3a8a',
};

/** @type {KingData[]} */
let ALL_KINGS = [];

/** @type {Object<string, MapVariant>} */
let MAPS_DATA = {};

/** @type {GameState|null} */
let state = null;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
