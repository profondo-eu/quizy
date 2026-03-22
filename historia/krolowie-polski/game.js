/* Game engine — depends on config.js, calls into modes.js and card.js */

function startGame() {
    const selectedKings = getSelectedKings();
    const mode = getSelectedMode();

    state = {
        kings: selectedKings.map((k, i) => ({
            ...k, idx: i, streak: 0, mastered: false,
            errorCount: 0, correctCount: 0, lastAsked: -1,
        })),
        allKingsRef: ALL_KINGS,
        mode,
        currentSubMode: typeof mode === 'number' ? mode : null,
        current: null,
        questionIndex: 0,
        correct: 0,
        wrong: 0,
        remaining: selectedKings.length,
        elapsed: 0,
        timerStart: 0,
        timerInterval: null,
        locked: false,
        timelineKings: [],
        timelinePlaced: [],
    };

    showScreen('game-screen');
    updateStats();
    startTimer();
    nextQuestion();
}

/* ── Timer ── */

function startTimer() {
    state.timerStart = Date.now();
    state.timerInterval = setInterval(() => {
        state.elapsed = Date.now() - state.timerStart;
        document.getElementById('stat-timer').textContent = formatTime(state.elapsed);
    }, 1000);
}

function stopTimer() {
    if (state?.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
}

function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

/* ── Stats ── */

function updateStats() {
    document.getElementById('stat-remaining').textContent = state.remaining;
    document.getElementById('stat-correct').textContent = state.correct;
    document.getElementById('stat-wrong').textContent = state.wrong;
    const total = state.correct + state.wrong;
    document.getElementById('stat-pct').textContent = (total > 0 ? Math.round(state.correct / total * 100) : 0) + '%';
}

function renderStreakDots(containerId, streak) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < STREAK_TO_MASTER; i++) {
        const dot = document.createElement('span');
        dot.className = 'streak-dot' + (i < streak ? ' filled' : '');
        container.appendChild(dot);
    }
}

/* ── Intra-session spacing ── */

function selectNextKing() {
    const available = state.kings.filter(k => !k.mastered);
    if (available.length === 0) return null;

    const qi = state.questionIndex;
    const urgent = [], soon = [], normal = [];

    for (const k of available) {
        const gap = qi - k.lastAsked;
        if (k.errorCount >= 2 && (k.lastAsked === -1 || gap >= 2)) urgent.push(k);
        else if (k.errorCount === 1 && (k.lastAsked === -1 || gap >= 5)) soon.push(k);
        else if (k.lastAsked === -1 || gap >= 3) normal.push(k);
    }

    let pool = urgent.length ? urgent : soon.length ? soon : normal.length ? normal : available;
    let candidates = pool.filter(k => k !== state.current);
    if (candidates.length === 0) candidates = pool;

    return candidates[Math.floor(Math.random() * candidates.length)];
}

/* ── Adaptive distractors ── */

function getDifficultyLevel() {
    const mastered = state.kings.filter(k => k.mastered).length;
    const pct = mastered / state.kings.length;
    if (pct < DIFFICULTY_THRESHOLD_MEDIUM) return 'easy';
    if (pct < DIFFICULTY_THRESHOLD_HARD) return 'medium';
    return 'hard';
}

function selectDistractors(correctKing, count) {
    const difficulty = getDifficultyLevel();

    const forced = [];
    if (correctKing.disambiguationCue) {
        const rival = state.allKingsRef.find(k =>
            k.name !== correctKing.name && k.coronationYear === correctKing.coronationYear
        );
        if (rival) forced.push(rival);
    }
    const remaining = count - forced.length;

    const exclude = new Set([correctKing.name, ...forced.map(f => f.name)]);
    const subset = state.kings.filter(k => !exclude.has(k.name));
    const allFallback = state.allKingsRef.filter(k => !exclude.has(k.name));

    let pool;
    const candidates = subset.length >= remaining ? subset : allFallback;

    if (difficulty === 'easy') {
        pool = candidates.filter(k => k.dynasty !== correctKing.dynasty);
    } else if (difficulty === 'medium') {
        pool = candidates.filter(k =>
            k.dynasty === correctKing.dynasty || Math.abs(k.coronationYear - correctKing.coronationYear) <= DISTRACTOR_YEAR_RANGE_MEDIUM
        );
    } else {
        pool = candidates.filter(k => Math.abs(k.coronationYear - correctKing.coronationYear) <= DISTRACTOR_YEAR_RANGE_HARD);
    }

    if (pool.length < remaining) pool = candidates.length >= remaining ? candidates : allFallback;

    const shuffled = shuffle(pool);
    const result = [...forced, ...shuffled.slice(0, remaining)];
    if (result.length < count) {
        console.warn(`selectDistractors: only ${result.length}/${count} distractors available`);
    }
    return result;
}

/* ── Question routing ── */

function nextQuestion() {
    const available = state.kings.filter(k => !k.mastered);
    if (available.length === 0) { endGame(); return; }

    let activeMode = state.mode;
    if (activeMode === 'mix') {
        const modes = [1, 2, 4];
        activeMode = modes[Math.floor(Math.random() * modes.length)];
        state.currentSubMode = activeMode;
    }

    if (activeMode === 3) {
        renderTimeline();
    } else {
        const king = selectNextKing();
        if (!king) { endGame(); return; }
        state.current = king;
        king.lastAsked = state.questionIndex;
        state.questionIndex++;

        if (activeMode === 1) renderMode1(king);
        else if (activeMode === 2) renderMode2(king);
        else if (activeMode === 4) renderMode4(king);
    }

    showModePanel(activeMode);
}

/* ── Answer processing ── */

function processAnswer(king, isCorrect, clickedBtn, optionsGrid, feedbackId, streakId) {
    const feedback = document.getElementById(feedbackId);

    if (isCorrect) {
        state.correct++;
        king.streak++;
        king.correctCount++;
        updateStats();

        if (clickedBtn) clickedBtn.classList.add('correct');

        if (king.streak >= STREAK_TO_MASTER) {
            king.mastered = true;
            state.remaining--;
            updateStats();
            renderStreakDots(streakId, king.streak);
            feedback.textContent = '✓ Opanowane!';
            feedback.className = 'feedback correct';
            setTimeout(() => { state.locked = false; showKnowledgeCard(king, true); }, DELAY_MASTERED);
        } else {
            renderStreakDots(streakId, king.streak);
            feedback.textContent = `✓ Dobrze! (seria: ${king.streak}/${STREAK_TO_MASTER})`;
            feedback.className = 'feedback correct';
            setTimeout(() => { state.locked = false; showKnowledgeCard(king, true); }, DELAY_CORRECT);
        }
    } else {
        state.wrong++;
        king.streak = 0;
        king.errorCount++;
        updateStats();
        renderStreakDots(streakId, 0);

        if (clickedBtn) clickedBtn.classList.add('wrong');
        if (optionsGrid) {
            optionsGrid.querySelectorAll('.option-btn').forEach(b => {
                if (b.textContent === king.name) b.classList.add('correct');
            });
        }

        feedback.textContent = `✗ Poprawna odpowiedź: ${king.name} — ${king.coronationYear}`;
        feedback.className = 'feedback wrong';
        setTimeout(() => { state.locked = false; showKnowledgeCard(king, false); }, DELAY_WRONG);
    }
}

/* ── End game ── */

function endGame() {
    stopTimer();
    const total = state.correct + state.wrong;
    const pct = total > 0 ? Math.round(state.correct / total * 100) : 0;

    document.getElementById('end-correct').textContent = state.correct;
    document.getElementById('end-wrong').textContent = state.wrong;
    document.getElementById('end-pct').textContent = pct + '%';
    document.getElementById('end-time').textContent = formatTime(state.elapsed);

    if (state.remaining === 0) {
        document.getElementById('end-title').textContent = 'Gratulacje!';
        document.getElementById('end-subtitle').textContent = `Opanowałeś ${state.kings.length === ALL_KINGS.length ? 'wszystkich ' + ALL_KINGS.length : state.kings.length} władców!`;
    } else {
        document.getElementById('end-title').textContent = 'Koniec gry';
        document.getElementById('end-subtitle').textContent = `Pozostało ${state.remaining} władców do opanowania.`;
    }

    const hardest = [...state.kings]
        .filter(k => k.errorCount > 0)
        .sort((a, b) => b.errorCount - a.errorCount)
        .slice(0, 5);

    const hardestEl = document.getElementById('hardest-list');
    if (hardest.length > 0) {
        hardestEl.innerHTML = `<h3>Najtrudniejsi</h3>` +
            hardest.map((k, i) => `
                <div class="hardest-item">
                    <span class="hardest-rank">${i + 1}.</span>
                    <span class="hardest-name">${k.name}</span>
                    <span class="hardest-tries">${k.errorCount} ${k.errorCount === 1 ? 'błąd' : k.errorCount < 5 ? 'błędy' : 'błędów'}</span>
                </div>
            `).join('');
        hardestEl.style.display = '';
    } else {
        hardestEl.style.display = 'none';
    }

    showScreen('end-screen');
}
