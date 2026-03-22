/* Knowledge card & map rendering — depends on config.js */

function renderMapSvg(mapVariant) {
    const map = MAPS_DATA[mapVariant];
    if (!map || !map.paths?.crown) return '';

    const hasLithuania = !!map.paths.lithuania;
    const showSplit = hasLithuania && map.splitVerified;

    let pathsHtml;
    if (showSplit) {
        pathsHtml = `
            <path d="${map.paths.lithuania}" fill="${MAP_COLORS.lithuania}" stroke="${MAP_COLORS.stroke}" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="${map.paths.crown}" fill="${MAP_COLORS.crown}" stroke="${MAP_COLORS.stroke}" stroke-width="1.5" stroke-linejoin="round"/>`;
    } else if (hasLithuania) {
        pathsHtml = `
            <path d="${map.paths.lithuania}" fill="${MAP_COLORS.unified}" stroke="none"/>
            <path d="${map.paths.crown}" fill="${MAP_COLORS.unified}" stroke="none"/>`;
    } else {
        pathsHtml = `
            <path d="${map.paths.crown}" fill="${MAP_COLORS.crown}" stroke="${MAP_COLORS.stroke}" stroke-width="1.5" stroke-linejoin="round"/>`;
    }

    const legendHtml = showSplit
        ? `<div class="card-map-legend">
            <div class="card-map-legend-item">
                <span class="card-map-legend-swatch" style="background:${MAP_COLORS.crown}"></span> ${map.legend[0]}
            </div>
            <div class="card-map-legend-item">
                <span class="card-map-legend-swatch" style="background:${MAP_COLORS.lithuania}"></span> ${map.legend[1]}
            </div>
           </div>`
        : (map.legend.length === 1
            ? `<div class="card-map-legend">
                <div class="card-map-legend-item">
                    <span class="card-map-legend-swatch" style="background:${MAP_COLORS.crown}"></span> ${map.legend[0]}
                </div>
               </div>`
            : `<div class="card-map-legend">
                <div class="card-map-legend-item">
                    <span class="card-map-legend-swatch" style="background:${MAP_COLORS.unified}"></span> ${map.legend.join(' i ')}
                </div>
               </div>`);

    return `
        <div class="card-map">
            <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">${pathsHtml}
            </svg>
            ${legendHtml}
            <div class="card-map-info">${map.label} (ok. ${map.fromYear}–${map.toYear})</div>
            ${map.historicalNote ? `<div class="card-map-info" style="font-style:italic">${map.historicalNote}</div>` : ''}
        </div>`;
}

function showKnowledgeCard(king, wasCorrect) {
    const card = document.getElementById('knowledge-card');
    const resultClass = wasCorrect ? 'correct' : 'wrong';
    const resultIcon = wasCorrect ? '✓' : '✗';
    const resultText = wasCorrect ? 'Dobrze!' : 'Źle';

    const predecessorLabel = king.coRuler ? 'Współwładca' : 'Poprzednik';
    const predecessorValue = king.coRuler
        ? `${king.coRuler} (koronowani wspólnie ${king.coronationFull})`
        : (king.predecessor || '—');

    card.innerHTML = `
        <div class="card-result ${resultClass}">${resultIcon} ${resultText}</div>
        <div class="card-king-name">${king.name} — <span class="card-year">${king.coronationYear}</span></div>

        <div class="card-fields">
            <div class="card-field">
                <span class="card-field-label">Dynastia</span>
                <span class="card-field-value">${king.dynasty}</span>
            </div>
            <div class="card-field">
                <span class="card-field-label">Epoka</span>
                <span class="card-field-value"><span class="era-badge">${king.eraLabel}</span></span>
            </div>
            <div class="card-field">
                <span class="card-field-label">Skojarzenie</span>
                <span class="card-field-value">${king.keyAssociation}</span>
            </div>
        </div>

        <div class="card-extended" id="card-extended">
            <div class="card-fields">
                <div class="card-field">
                    <span class="card-field-label">Pełna data</span>
                    <span class="card-field-value">${king.coronationFull}, ${king.place}</span>
                </div>
                <div class="card-field">
                    <span class="card-field-label">${predecessorLabel}</span>
                    <span class="card-field-value">${predecessorValue}</span>
                </div>
                ${!king.coRuler ? `<div class="card-field">
                    <span class="card-field-label">Następca</span>
                    <span class="card-field-value">${king.successor || '—'}</span>
                </div>` : ''}
            </div>
            ${renderMapSvg(king.mapVariant)}
            <ul class="card-events">
                ${king.keyEvents.map(e => `<li>${e}</li>`).join('')}
            </ul>
            <div class="card-funfact">${king.funFact}</div>
            <div class="card-mnemonic">${king.mnemonic}</div>
        </div>

        <div class="card-actions">
            <button class="btn-more" id="btn-card-more">Więcej ▼</button>
            <button class="btn-next" id="btn-card-next">Dalej</button>
        </div>
    `;

    document.getElementById('card-overlay').classList.add('active');

    document.getElementById('btn-card-more').addEventListener('click', () => {
        const ext = document.getElementById('card-extended');
        const btn = document.getElementById('btn-card-more');
        if (ext.classList.contains('visible')) {
            ext.classList.remove('visible');
            btn.textContent = 'Więcej ▼';
        } else {
            ext.classList.add('visible');
            btn.textContent = 'Mniej ▲';
        }
    });

    document.getElementById('btn-card-next').addEventListener('click', () => {
        document.getElementById('card-overlay').classList.remove('active');
        nextQuestion();
    });
}
