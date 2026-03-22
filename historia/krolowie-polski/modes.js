/* Mode-specific rendering and handlers — depends on config.js, game.js */

/* ── Mode 2: Year → King (4 choices) ── */

function renderMode2(king) {
    document.getElementById('m2-year').textContent = king.coronationYear + ' rok';
    document.getElementById('m2-cue').textContent = king.disambiguationCue || '';
    renderStreakDots('m2-streak', king.streak);

    const distractors = selectDistractors(king, 3);
    const options = [king, ...distractors].sort(() => Math.random() - 0.5);

    const grid = document.getElementById('m2-options');
    grid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.name;
        btn.addEventListener('click', () => handleMode2Choice(btn, opt, king, grid));
        grid.appendChild(btn);
    });

    document.getElementById('m2-feedback').textContent = '';
    document.getElementById('m2-feedback').className = 'feedback';
}

function handleMode2Choice(btn, chosen, correct, grid) {
    if (state.locked) return;
    state.locked = true;
    grid.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    processAnswer(correct, chosen.name === correct.name, btn, grid, 'm2-feedback', 'm2-streak');
}

/* ── Mode 1: King → Year (type) ── */

function renderMode1(king) {
    document.getElementById('m1-king').textContent = king.name;
    renderStreakDots('m1-streak', king.streak);

    const hintEl = document.getElementById('m1-hint');
    const cb = document.getElementById('scaffolding-cb');
    hintEl.textContent = cb.checked ? `${king.dynasty} · ${king.eraLabel}` : '';

    const input = document.getElementById('year-input');
    input.value = '';
    input.className = '';
    input.disabled = false;
    input.focus();
    document.getElementById('btn-year-submit').disabled = false;
    document.getElementById('m1-feedback').textContent = '';
    document.getElementById('m1-feedback').className = 'feedback';
}

function handleMode1Submit() {
    if (state.locked || !state.current) return;
    const input = document.getElementById('year-input');
    const val = input.value.trim();
    if (!val) return;

    state.locked = true;
    input.disabled = true;
    document.getElementById('btn-year-submit').disabled = true;

    const isCorrect = parseInt(val, 10) === state.current.coronationYear;
    input.classList.add(isCorrect ? 'correct' : 'wrong');
    processAnswer(state.current, isCorrect, null, null, 'm1-feedback', 'm1-streak');
}

/* ── Mode 4: Context → King (4 choices) ── */

function renderMode4(king) {
    const hints = king.contextHints;
    const hint = hints[Math.floor(Math.random() * hints.length)];
    document.getElementById('m4-hint').textContent = hint.text;
    renderStreakDots('m4-streak', king.streak);

    const distractors = selectDistractors(king, 3);
    const options = [king, ...distractors].sort(() => Math.random() - 0.5);

    const grid = document.getElementById('m4-options');
    grid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.name;
        btn.addEventListener('click', () => handleMode4Choice(btn, opt, king, grid));
        grid.appendChild(btn);
    });

    document.getElementById('m4-feedback').textContent = '';
    document.getElementById('m4-feedback').className = 'feedback';
}

function handleMode4Choice(btn, chosen, correct, grid) {
    if (state.locked) return;
    state.locked = true;
    grid.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    processAnswer(correct, chosen.name === correct.name, btn, grid, 'm4-feedback', 'm4-streak');
}

/* ── Mode 3: Timeline ── */

function renderTimeline() {
    const available = state.kings.filter(k => !k.mastered);
    if (available.length === 0) { endGame(); return; }

    const size = Math.min(
        Math.max(TIMELINE_SIZE_MIN, Math.min(TIMELINE_SIZE_MAX, available.length)),
        available.length
    );
    const shuffled = [...available].sort(() => Math.random() - 0.5).slice(0, size);
    state.timelineKings = shuffled;
    state.timelinePlaced = [];

    const avContainer = document.getElementById('m3-available');
    avContainer.innerHTML = '';
    shuffled.forEach(k => {
        const chip = document.createElement('div');
        chip.className = 'timeline-chip';
        chip.textContent = k.name;
        chip.dataset.name = k.name;
        chip.addEventListener('click', () => placeTimelineKing(k, chip));
        avContainer.appendChild(chip);
    });

    renderTimelineSlots();
    document.getElementById('btn-timeline-undo').disabled = true;
    document.getElementById('btn-timeline-check').disabled = true;
    document.getElementById('m3-feedback').textContent = '';
    document.getElementById('m3-feedback').className = 'feedback';
}

function placeTimelineKing(king, chip) {
    if (state.locked) return;
    state.timelinePlaced.push(king);
    chip.style.display = 'none';
    renderTimelineSlots();
    document.getElementById('btn-timeline-undo').disabled = false;
    document.getElementById('btn-timeline-check').disabled = state.timelinePlaced.length < state.timelineKings.length;
}

function undoTimelinePlacement() {
    if (state.locked || state.timelinePlaced.length === 0) return;
    const king = state.timelinePlaced.pop();
    const chip = document.querySelector(`.timeline-chip[data-name="${king.name}"]`);
    if (chip) chip.style.display = '';
    renderTimelineSlots();
    document.getElementById('btn-timeline-undo').disabled = state.timelinePlaced.length === 0;
    document.getElementById('btn-timeline-check').disabled = true;
}

function renderTimelineSlots() {
    const container = document.getElementById('m3-placed');
    container.innerHTML = '';
    for (let i = 0; i < state.timelineKings.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'timeline-slot';
        const placed = state.timelinePlaced[i];
        slot.innerHTML = `
            <span class="slot-num">${i + 1}.</span>
            ${placed
                ? `<span class="slot-name">${placed.name}</span>`
                : `<span class="slot-empty">—</span>`
            }
        `;
        container.appendChild(slot);
    }
}

function checkTimeline() {
    if (state.locked) return;
    state.locked = true;

    const correctOrder = [...state.timelineKings].sort((a, b) => a.coronationYear - b.coronationYear);
    const allCorrect = state.timelinePlaced.every((k, i) =>
        k.coronationYear === correctOrder[i].coronationYear
    );

    const slots = document.querySelectorAll('#m3-placed .timeline-slot');
    const feedback = document.getElementById('m3-feedback');

    slots.forEach((slot, i) => {
        const isRight = state.timelinePlaced[i].coronationYear === correctOrder[i].coronationYear;
        slot.classList.add(isRight ? 'correct-slot' : 'wrong-slot');
        slot.innerHTML = `
            <span class="slot-num">${i + 1}.</span>
            <span class="slot-name">${state.timelinePlaced[i].name}</span>
            <span class="slot-year">${correctOrder[i].coronationYear}${
                !isRight ? ' → ' + correctOrder[i].name : ''
            }</span>
        `;
    });

    let wrongCount = 0;
    if (allCorrect) {
        state.correct++;
        state.timelineKings.forEach(k => {
            k.streak++;
            k.correctCount++;
            if (k.streak >= STREAK_TO_MASTER) { k.mastered = true; state.remaining--; }
        });
        feedback.textContent = '✓ Prawidłowa kolejność!';
        feedback.className = 'feedback correct';
    } else {
        state.wrong++;
        state.timelinePlaced.forEach((k, i) => {
            if (k.coronationYear !== correctOrder[i].coronationYear) {
                k.streak = 0;
                k.errorCount++;
                wrongCount++;
            }
        });
        feedback.textContent = '✗ Nieprawidłowa kolejność. Poprawna pokazana wyżej.';
        feedback.className = 'feedback wrong';
    }

    state.questionIndex++;
    updateStats();

    document.getElementById('btn-timeline-undo').disabled = true;
    document.getElementById('btn-timeline-check').disabled = true;

    const delay = allCorrect ? DELAY_CORRECT : 5000 + wrongCount * 5000;
    setTimeout(() => {
        state.locked = false;
        nextQuestion();
    }, delay);
}
