# Dodanie władców niekoronowanych (książąt) do quizu

## Zakres

Rozszerzenie quizu z "Królowie Polski" na "Władcy Polski" zgodnie z kanonem nauczyciela (`KANON_WLADCOW_POLSKI.md`). Docelowo 46 władców (27 królów + 19 książąt). Nowe pole `rulerType`, korekty dat i nazw istniejących wpisów, dostosowanie UI, nowe warianty map.

## Decyzje modelowe

- **Rok objęcia władzy**: jedno pole `coronationYear` (number) — kanon quizowy. Przybliżoność lub kontrowersyjność daty dokumentowana w `coronationFull` i `contextHints`.
- **Źródło prawdy**: `KANON_WLADCOW_POLSKI.md` — daty i nazwy z kanonu nadpisują dotychczasowe wartości w `kings_data.json`.

## Nowi władcy (19 książąt)

| # | Imię | quizYear | Cue |
|---|------|----------|-----|
| 1 | Mieszko I | 960 | Chrzest Polski 966, twórca państwa |
| 2 | Kazimierz I Odnowiciel | 1039 | Odbudował państwo po upadku lat 30. XI w. |
| 3 | Władysław I Herman | 1079 | Ojciec Zbigniewa i Krzywoustego |
| 4 | Bolesław III Krzywousty | 1102 | Obrona Głogowa i statut 1138 |
| 5 | Władysław II Wygnaniec | 1138 | Pierwszy senior po 1138, wygnany przez braci |
| 6 | Bolesław IV Kędzierzawy | 1146 | Princeps po wygnaniu Wygnańca |
| 7 | Mieszko III Stary | 1173 | Wielokrotnie wracał do Krakowa |
| 8 | Kazimierz II Sprawiedliwy | 1177 | Nie miał dostać dzielnicy, a został princepsem |
| 9 | Leszek Biały | 1194 | Zginął w Gąsawie |
| 10 | Mieszko Plątonogi | 1198 | Stary Piast z Raciborza |
| 11 | Władysław III Laskonogi | 1202 | Princeps z Wielkopolski przed Henrykiem Brodatym |
| 12 | Konrad I Mazowiecki | 1229 | Sprowadził Krzyżaków na ziemie polskie |
| 13 | Henryk I Brodaty | 1232 | Mąż św. Jadwigi, śląski książę bliski zjednoczenia |
| 14 | Henryk II Pobożny | 1238 | Legnica 1241, walka z Mongołami |
| 15 | Bolesław II Rogatka | 1241 | Syn poległego pod Legnicą Henryka Pobożnego |
| 16 | Bolesław V Wstydliwy | 1243 | Mąż św. Kingi |
| 17 | Bolesław Pobożny | 1279 | Kaliski przywilej dla Żydów |
| 18 | Leszek II Czarny | 1288 | Princeps tuż przed Henrykiem Probusem |
| 19 | Henryk IV Probus | 1289 | Bliski koronacji, zmarł przed zjednoczeniem |

## Korekty istniejących wpisów

### Usunięcie

- **Anna Jagiellonka** — nie należy do kanonu nauczyciela

### Korekty dat (coronationYear)

| Władca | Było | Kanon |
|--------|------|-------|
| Zygmunt I Stary | 1507 | 1506 |
| Zygmunt II August | 1530 | 1529 |
| Władysław IV Waza | 1633 | 1632 |
| Jan II Kazimierz | 1649 | 1648 |
| Jan III Sobieski | 1676 | 1674 |
| Stanisław Leszczyński | 1705 | 1704 |

### Korekty nazw

| Było | Kanon |
|------|-------|
| Wacław II Czeski | Wacław II |
| Jan II Kazimierz Waza | Jan II Kazimierz |
| Stanisław I Leszczyński | Stanisław Leszczyński |

## Zmiany per plik

### 1. `types.jsdoc` — nowe pole

- Dodać `@property {"król"|"książę"} rulerType` do `KingData`

### 2. `kings_data.json` — dane

- Dodać `"rulerType": "król"` do 28 istniejących wpisów
- Usunąć wpis Anny Jagiellonki
- Skorygować daty (6 wpisów) i nazwy (3 wpisy) wg kanonu
- Utworzyć 19 nowych wpisów z `"rulerType": "książę"` i pełnym schematem
- Zaktualizować `predecessor`/`successor` w całym łańcuchu

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
- Hardcoded `ALL_KINGS.length` — już dynamiczne, bez zmian
