/* globals shared across all modules */

const STREAK_TO_MASTER = 3;
const DELAY_CORRECT = 800;
const DELAY_WRONG = 2000;
const DELAY_MASTERED = 1200;
const TIMELINE_SIZE_MIN = 3;
const TIMELINE_SIZE_MAX = 5;

const DYNASTY_GROUPS = [
    { id: 'piastowie', label: 'Piastowie i Przemyślidzi', match: k => ['Piastowie', 'Przemyślidzi'].includes(k.dynasty) },
    { id: 'andegawenowie', label: 'Andegawenowie', match: k => k.dynasty === 'Andegawenowie' },
    { id: 'jagiellonowie', label: 'Jagiellonowie', match: k => k.dynasty === 'Jagiellonowie' },
    { id: 'elekcyjni', label: 'Władcy elekcyjni', match: k => !['Piastowie', 'Przemyślidzi', 'Andegawenowie', 'Jagiellonowie'].includes(k.dynasty) },
];

const MODES = [
    { id: 2, icon: '🎯', name: 'Rok → Król', desc: 'Wybierz króla z 4 opcji', badge: 'Start' },
    { id: 3, icon: '📅', name: 'Oś czasu', desc: 'Ułóż w kolejności' },
    { id: 1, icon: '✍️', name: 'Król → Rok', desc: 'Wpisz rok koronacji' },
    { id: 4, icon: '🔍', name: 'Kontekst → Król', desc: 'Rozpoznaj po opisie' },
    { id: 'mix', icon: '🔀', name: 'Miks trybów', desc: 'Losowy tryb co pytanie', fullWidth: true },
];

const MAP_COLORS = {
    crown: '#3b82f6',
    lithuania: '#93c5fd',
    unified: '#3b82f6',
    stroke: '#1e3a8a',
};

/** @type {KingData[]} */
var ALL_KINGS = [];

/** @type {Object<string, MapVariant>} */
var MAPS_DATA = {};

/** @type {GameState|null} */
var state = null;
