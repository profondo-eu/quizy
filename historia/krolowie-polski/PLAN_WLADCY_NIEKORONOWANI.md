# Dodanie władców niekoronowanych (książąt) do quizu

## Zakres

Rozszerzenie quizu o 12 władców niekoronowanych (książąt / princepsów) od Mieszka I do Henryka II Pobożnego. Nowe pole `rulerType`, dostosowanie UI z "królowie" na "władcy", nowe warianty map, split grupy Piastów.

## Decyzje modelowe

- **Rok objęcia władzy**: jedno pole `coronationYear` (number) — kanon quizowy. Przybliżoność lub kontrowersyjność daty dokumentowana w `coronationFull` (np. "ok. 960") i `contextHints`.
- **Daty sporne**: dla Krzywoustego przyjmujemy 1102 (współrządy z Hermanem, potem samodzielne od 1107 — opisane w kontekście). Dla Mieszka III Starego liczymy pierwszy pryncypat (1173). Dla Leszka Białego — 1194. Dla Laskonogiego — 1202.

## Nowi władcy (12 princepsów)

| # | Imię | quizYear | Notka | Cue |
|---|------|----------|-------|-----|
| 1 | Mieszko I | 960 | Pierwszy historyczny władca; chrzest 966 | Chrzest Polski 966, twórca państwa |
| 2 | Kazimierz I Odnowiciel | 1039 | Odbudowa po kryzysie lat 30. XI w.; przeniesienie ośrodka do Krakowa | Odbudował państwo po upadku lat 30. XI w. |
| 3 | Władysław I Herman | 1079 | Objął władzę po wygnaniu Śmiałego; ojciec Zbigniewa i Krzywoustego | Ojciec Zbigniewa i Krzywoustego |
| 4 | Bolesław III Krzywousty | 1102 | Współrządy po Hermanie (samodzielnie od 1107); obrona Głogowa i statut 1138 | Obrona Głogowa i statut 1138 |
| 5 | Władysław II Wygnaniec | 1138 | Pierwszy princeps po statucie Krzywoustego; wypędzony przez braci | Pierwszy senior po 1138, wygnany przez braci |
| 6 | Bolesław IV Kędzierzawy | 1146 | Princeps po wygnaniu Władysława II; symbol pierwszego etapu rozbicia | Princeps po wygnaniu Wygnańca |
| 7 | Mieszko III Stary | 1173 | Wielokrotnie wracał do Krakowa; centralna postać walk o seniorat | Wielokrotnie wracał do Krakowa |
| 8 | Kazimierz II Sprawiedliwy | 1177 | Najmłodszy syn Krzywoustego, pominięty w statucie, a został princepsem | Nie miał dostać dzielnicy, a został princepsem |
| 9 | Leszek Biały | 1194 | Ważny książę krakowski; zginął podczas zjazdu w Gąsawie 1227 | Zginął w Gąsawie |
| 10 | Władysław III Laskonogi | 1202 | Wielkopolski Piast; jeden z ostatnich princepsów przed Brodatym | Princeps z Wielkopolski przed Henrykiem Brodatym |
| 11 | Henryk I Brodaty | 1232 | Śląski Piast bliski zjednoczenia ziem; mąż św. Jadwigi | Mąż św. Jadwigi, śląski książę bliski zjednoczenia |
| 12 | Henryk II Pobożny | 1238 | Syn Brodatego; poległ pod Legnicą 1241 walcząc z Mongołami | Legnica 1241, walka z Mongołami |

## Zmiany per plik

### 1. `types.jsdoc` — nowe pole

- Dodać `@property {"król"|"książę"} rulerType` do `KingData`

### 2. `kings_data.json` — dane

- Dodać `"rulerType": "król"` do każdego z 28 istniejących wpisów
- Utworzyć 12 nowych wpisów z `"rulerType": "książę"` i pełnym schematem
- Zaktualizować `predecessor`/`successor` w istniejących wpisach (Chrobry.predecessor = "Mieszko I" itd.)
- Dla dat spornych/przybliżonych: `coronationYear` = wartość kanoniczna, `coronationFull` = opis z kontekstem (np. "ok. 960", "1102 (samodzielnie od 1107)")

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
