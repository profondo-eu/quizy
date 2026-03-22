# Dodanie władców niekoronowanych (książąt) do quizu

## Zakres

Rozszerzenie quizu o 6 władców niekoronowanych (książąt) od Mieszka I, z nowym polem `rulerType`, dostosowaniem UI z "królowie" na "władcy", nowymi wariantami map i splitem grupy Piastów.

## Nowi władcy

| # | Imię | Objęcie władzy | Znaczenie |
|---|------|----------------|-----------|
| 1 | Mieszko I | ok. 960 | Chrzest 966, założyciel państwa |
| 2 | Kazimierz I Odnowiciel | 1039 | Odbudowa po kryzysie lat 30. XI w. |
| 3 | Władysław I Herman | 1079 | Rządy po wygnaniu Śmiałego |
| 4 | Bolesław III Krzywousty | 1102 | Statut sukcesyjny 1138, obrona Głogowa |
| 5 | Henryk I Brodaty | 1232 | Próba zjednoczenia dzielnic |
| 6 | Henryk II Pobożny | 1238 | Bitwa pod Legnicą 1241 (Mongołowie) |

## Zmiany per plik

### 1. `types.jsdoc` — nowe pole

- Dodać `@property {"król"|"książę"} rulerType` do `KingData`

### 2. `kings_data.json` — dane

- Dodać `"rulerType": "król"` do każdego z 28 istniejących wpisów
- Utworzyć 6 nowych wpisów z `"rulerType": "książę"` i pełnym schematem
- Zaktualizować `predecessor`/`successor` w istniejących wpisach (Chrobry.predecessor = "Mieszko I" itd.)

### 3. `maps_data.json` — nowe warianty

- `piast-early` — państwo Mieszka I (~960-992), baseline: `world_1000`
- `piast-fragmented` — rozbicie dzielnicowe (schematyczny, z disclaimerem)
- Istniejący `piast-rebuilt` pasuje do Odnowiciela i Hermana; `piast-peak` do Krzywoustego

### 4. `config.js` — grupy dynastii + teksty trybów

- Split Piastów na dwie podgrupy:
  - `piastowie-early` — "Piastowie (książęta)" — match: `rulerType === 'książę'`
  - `piastowie-kings` — "Piastowie (królowie) i Przemyślidzi" — match: istniejący + `rulerType === 'król'`
- Zmiana tekstów trybów: "Król" → "Władca", "rok koronacji" → "rok objęcia władzy"

### 5. `index.html` — teksty UI

- Tytuł: "Królowie Polski" → "Władcy Polski"
- Subtitle: "Koronacje" → "Początki rządów", "król" → "władca"
- Timeline prompt: "w kolejności koronacji" → "w kolejności objęcia władzy"

### 6. `card.js` — karta wiedzy

- Badge `rulerType` obok imienia (książę / król)
- Kontekstowa etykieta co-rulers: "koronowani wspólnie" vs "objęli władzę wspólnie"

### 7. `game.js` + `app.js` — teksty końcowe i walidacja

- "królów" → "władców" w komunikatach
- Dodać `rulerType` do walidacji w `loadData()`
