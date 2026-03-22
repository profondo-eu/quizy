/* Initialization, start screen, event listeners — depends on config.js, game.js */

/* ── Screen management ── */

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showModePanel(modeId) {
    document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('mode-' + modeId);
    if (panel) panel.classList.add('active');
}

/* ── Start screen ── */

function buildStartScreen() {
    const dynastyList = document.getElementById('dynasty-list');
    dynastyList.innerHTML = '';
    DYNASTY_GROUPS.forEach((g, i) => {
        const count = ALL_KINGS.filter(g.match).length;
        const div = document.createElement('div');
        div.className = 'dynasty-item';
        div.innerHTML = `
            <input type="checkbox" id="dyn-${g.id}" data-group="${g.id}" ${i === 0 ? 'checked' : ''}>
            <label for="dyn-${g.id}">${g.label}</label>
            <span class="dynasty-count">${count}</span>
        `;
        div.querySelector('input').addEventListener('change', updateStartBtn);
        dynastyList.appendChild(div);
    });

    const modeGrid = document.getElementById('mode-grid');
    modeGrid.innerHTML = '';
    MODES.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'mode-card' + (i === 0 ? ' selected' : '') + (m.fullWidth ? ' full-width' : '');
        div.dataset.mode = m.id;
        div.innerHTML = `
            <div class="mode-icon">${m.icon}</div>
            <div class="mode-name">${m.name}</div>
            <div class="mode-desc">${m.desc}</div>
            ${m.badge ? `<div class="mode-badge">${m.badge}</div>` : ''}
        `;
        div.addEventListener('click', () => {
            modeGrid.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
            div.classList.add('selected');
            updateStartBtn();
        });
        modeGrid.appendChild(div);
    });

    updateStartBtn();
}

function getSelectedKings() {
    const checked = [...document.querySelectorAll('#dynasty-list input:checked')].map(i => i.dataset.group);
    if (checked.length === 0) return [];
    const matchers = DYNASTY_GROUPS.filter(g => checked.includes(g.id)).map(g => g.match);
    return ALL_KINGS.filter(k => matchers.some(m => m(k)));
}

function getSelectedMode() {
    const el = document.querySelector('.mode-card.selected');
    return el ? (el.dataset.mode === 'mix' ? 'mix' : Number(el.dataset.mode)) : null;
}

function updateStartBtn() {
    const kings = getSelectedKings();
    const mode = getSelectedMode();
    const btn = document.getElementById('btn-start');
    const minKings = mode === 3 ? TIMELINE_SIZE_MIN : 2;
    btn.disabled = kings.length < minKings || mode === null;

    const hint = document.getElementById('hint-box');
    if (kings.length === 0) {
        hint.innerHTML = 'Zaznacz co najmniej jedną grupę.';
    } else if (kings.length < minKings) {
        hint.innerHTML = `Potrzebujesz min. ${minKings} władców. Zaznacz więcej grup.`;
    } else {
        hint.innerHTML = `<strong>${kings.length}</strong> władców w grze. Powodzenia!`;
    }
}

/* ── Data loading ── */

async function loadData() {
    const [kingsRes, mapsRes] = await Promise.all([
        fetch('kings_data.json'),
        fetch('maps_data.json'),
    ]);
    if (!kingsRes.ok) throw new Error(`kings_data.json: ${kingsRes.status}`);
    if (!mapsRes.ok) throw new Error(`maps_data.json: ${mapsRes.status}`);

    ALL_KINGS = await kingsRes.json();
    if (!Array.isArray(ALL_KINGS) || ALL_KINGS.length === 0) {
        throw new Error('kings_data.json: pusty lub nieprawidłowy format');
    }
    const missing = ALL_KINGS.find(k => !k.name || !k.coronationYear || !k.rulerType);
    if (missing) {
        throw new Error(`Brak name/coronationYear/rulerType w danych władcy: ${JSON.stringify(missing).slice(0, 80)}`);
    }

    const mapsArr = await mapsRes.json();
    MAPS_DATA = Object.fromEntries(mapsArr.map(m => [m.id, m]));
    buildStartScreen();
    showScreen('start-screen');
}

/* ── Event listeners ── */

document.getElementById('scaffolding-cb').addEventListener('change', () => {
    const hintEl = document.getElementById('m1-hint');
    if (state?.current && document.getElementById('scaffolding-cb').checked) {
        hintEl.textContent = `${state.current.dynasty} · ${state.current.eraLabel}`;
    } else {
        hintEl.textContent = '';
    }
});

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-quit').addEventListener('click', () => { stopTimer(); endGame(); });
document.getElementById('btn-replay').addEventListener('click', startGame);
document.getElementById('btn-change-mode').addEventListener('click', () => {
    stopTimer();
    showScreen('start-screen');
});

document.getElementById('btn-year-submit').addEventListener('click', handleMode1Submit);
document.getElementById('year-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleMode1Submit();
});

document.getElementById('btn-timeline-undo').addEventListener('click', undoTimelinePlacement);
document.getElementById('btn-timeline-check').addEventListener('click', checkTimeline);

/* ── Init ── */
loadData().catch(err => {
    document.getElementById('loading-screen').textContent = 'Błąd ładowania danych: ' + err.message;
});
