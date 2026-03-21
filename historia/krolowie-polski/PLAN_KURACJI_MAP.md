# Faza 6 — Plan kuracji map historycznych granic Polski

## Cel

Podnieść jakość 12 wariantów map w `maps_data.json` z poziomu **baseline** (heurystyczny split wg `aourednik/historical-basemaps`) do poziomu **rzetelnego enrichmentu dydaktycznego** — tzn. takiego, który można uczciwie wyświetlić uczniowi klasy 6 jako schematyczną mapę epoki.

---

## Zasady

1. **Każdy wariant = 2 niezależne źródła** — źródło główne + cross-check.
2. **`splitVerified: true` dopiero wtedy**, gdy podział Korona / Litwa jest potwierdzony w co najmniej 2 niezależnych źródłach sensownej jakości.
3. **Warianty bez weryfikacji (`splitVerified: false`)** renderowane jako jednolity obrys (bez heurystycznej granicy wewnętrznej), dopóki nie przejdą kuracji.
4. **Mapy piastowskie (1000–1370)** traktować jako **mapy epoki**, nie precyzyjną geometrię — źródła dla tego okresu nie dają pewności co do dokładnych granic.
5. **Nie agregować epok**, w których natura państwa zmienia się jakościowo (np. sama Korona ≠ unia personalna z Litwą).

---

## Macierz źródeł

| mapVariant | Okres | Źródło główne | Źródło cross-check | Pewność | Komentarz |
|---|---|---|---|---|---|
| `piast-peak` | 1000–1038 | [Atlas historyczny czasów średniowiecznych (RCIN / PAN)](https://rcin.org.pl/igipz/dlibra/publication/11124/edition/2675?language=pl) | [Historical Atlas of Central Europe (Magocsi)](https://utorontopress.com/9781487523312/historical-atlas-of-central-europe/) | niski–średni | Wczesne Piasty — najsłabszy sourcing. Bezpieczny obrys epoki, nie precyzyjna geometria. |
| `piast-rebuilt` | 1058–1079 | Atlas RCIN / PAN | Magocsi | niski–średni | Jak wyżej. |
| `piast-reunited-early` | 1295–1300 | Atlas RCIN / PAN | Magocsi | średni | Ogólny obrys da się uzasadnić lepiej niż w XI w. |
| `piast-reunited` | 1320–1370 | Atlas RCIN / PAN | Magocsi | średni | Kandydat do ręcznej korekty zewnętrznego obrysu. |
| `crown-angevin` | 1370–1384 | Magocsi | Atlas RCIN / PAN | średni | Krótki okres przejściowy — prosty obrys Korony. |
| `crown-lithuania-union` | 1386–1434 | Magocsi | Atlas RCIN / PAN | średni | Makro-podział Polska / Litwa; nie dawać `splitVerified: true` bez dodatkowej walidacji. |
| `crown-lithuania-jagiello` | 1434–1492 | Magocsi | [Cambridge Modern History Atlas](https://www.maproom.org/00/43/index.php) | średni | Sensowny do cross-checku syntetycznego. |
| `crown-lithuania-pre-lublin` | 1492–1569 | [Atlas historyczny Polski – mapy XVI w. (IHPAN)](https://ihpan.edu.pl/struktura/zaklad-atlasu-historycznego/atlas-historyczny-polski-mapy-szczegolowe-xvi-wieku/) | Magocsi | średni–wysoki | Najlepsza baza źródłowa dla Korony od tego okresu; Litwę cross-checkować osobno. |
| `commonwealth` | 1569–1654 | [Atlas Fontium / warstwy GIS Korony](https://atlasfontium.pl/corona-regni-poloniae-pl/) | Magocsi + Cambridge Modern History Atlas | **wysoki** (obrys), średni (split) | **Najlepszy kandydat do pierwszej kuracji.** Warstwa ok. 1619 z Atlas Fontium + drugi atlas → realna szansa na pierwszy `splitVerified: true`. |
| `commonwealth-post-deluge` | 1655–1700 | Magocsi | Cambridge Modern History Atlas + [Wikimedia Commons (poglądowo)](https://commons.wikimedia.org/wiki/Category:Maps_of_the_Polish-Lithuanian_Commonwealth) | średni | Wiele map online miesza stan przed i po Potopie — ostrożnie. Commons poglądowo, nie jako źródło główne. |
| `commonwealth-late` | 1697–1736 | Magocsi | [Atlas Fontium: atlasy XVIII w.](https://atlasfontium.pl/atlasy-historyczne-xviiiw/) | średni | Kandydat do doprecyzowania późnej RON. Ostrożność przy kresach. |
| `commonwealth-pre-partitions` | 1736–1795 | [Atlas Fontium: atlasy XVIII w.](https://atlasfontium.pl/atlasy-historyczne-xviiiw/) | Magocsi | **wysoki** (obrys) | Najmocniejszy sourcing dla końca epoki. Dobry kandydat do ręcznej korekty wariantu przedrozbiorowego. |

---

## Kolejność pracy

Priorytetyzacja wg stosunku **jakość źródeł × wartość dydaktyczna**:

### Sprint 1 — Najwyższy ROI

| # | Wariant | Uzasadnienie |
|---|---------|-------------|
| 1 | `commonwealth` | Najlepsza baza źródłowa (Atlas Fontium GIS). 5 królów korzysta z tego wariantu. Najlepsza szansa na pierwszy `splitVerified: true`. |
| 2 | `commonwealth-pre-partitions` | Mocne źródła (Atlas Fontium XVIII w.). Okres dobrze udokumentowany. Poniatowski + Konstytucja 3 Maja = duża wartość dydaktyczna. |

### Sprint 2 — Uzupełnienie XVI–XVIII w.

| # | Wariant | Uzasadnienie |
|---|---------|-------------|
| 3 | `crown-lithuania-pre-lublin` | Atlas IHPAN (mapy szczegółowe XVI w.) — najlepsza baza po Atlas Fontium. 4 Jagiellonów korzysta. |
| 4 | `commonwealth-late` | Dopełnienie ery saskiej. Atlas Fontium XVIII w. do cross-checku. |

### Sprint 3 — Okres przejściowy i Jagiellonowie

| # | Wariant | Uzasadnienie |
|---|---------|-------------|
| 5 | `crown-lithuania-union` | Kluczowy wariant (Grunwald), ale źródła średniej pewności. |
| 6 | `crown-lithuania-jagiello` | Jagiellonowie XV w. Cambridge Modern History Atlas do cross-checku. |
| 7 | `commonwealth-post-deluge` | Najtrudniejszy wariant — mapy często mieszają stan przed/po Potopie. |

### Sprint 4 — Piastowie (niski priorytet)

| # | Wariant | Uzasadnienie |
|---|---------|-------------|
| 8 | `piast-reunited` | Najbezpieczniejszy z Piastów — XIV w. lepiej udokumentowany. |
| 9 | `crown-angevin` | Krótki okres, mało kontrowersyjny obrys. |
| 10 | `piast-reunited-early` | Zjednoczenie po rozbiciu — wąska baza źródłowa. |
| 11 | `piast-rebuilt` | XI w. — obrys orientacyjny. |
| 12 | `piast-peak` | XI w. — obrys orientacyjny. |

---

## Rozszerzenie modelu danych

### Nowe pole: `curationSources`

Każdy wariant w `maps_data.json` otrzymuje tablicę `curationSources` śledząca stan kuracji:

```json
{
  "id": "commonwealth",
  "curationSources": [
    {
      "role": "primary",
      "name": "Atlas Fontium — Corona Regni Poloniae (warstwa GIS ok. 1619)",
      "url": "https://atlasfontium.pl/corona-regni-poloniae-pl/",
      "verified": true
    },
    {
      "role": "crosscheck",
      "name": "Historical Atlas of Central Europe (Magocsi), wyd. 3, mapa 19b",
      "url": "https://utorontopress.com/9781487523312/historical-atlas-of-central-europe/",
      "verified": false
    }
  ],
  "splitVerified": false,
  "sourceRef": "aourednik/historical-basemaps world_1600"
}
```

Pole `sourceRef` zachowane jako wskaźnik na baseline. `curationSources` dodawane przyrostowo — puste = jeszcze nie kuratorowane.

### Trwałość danych przy rerunie skryptu

`extract_borders.py` przy każdym uruchomieniu **odczytuje istniejący `maps_data.json`** i zachowuje wypełnione `curationSources` per wariant. Dzięki temu rerun skryptu (np. po zmianie parametrów geometrii) nie nadpisuje ręcznie dodanych metadanych źródeł. Skrypt emituje pustą tablicę `curationSources: []` tylko dla wariantów, które jeszcze nie mają żadnych wpisów.

---

## Workflow kuracji jednego wariantu

```
1. Otworzyć źródło główne (atlas online / skan).
2. Porównać obrys baseline (aourednik) z atlasem:
   a. Obrys zewnętrzny: czy kształt jest wiarygodny w skali makro?
   b. Split Korona/Litwa: czy heurystyczny podział lon=23.5° pokrywa się
      z granicą w atlasie?
3. Jeśli rozbieżności:
   a. Ręczna korekta SVG pathów (edit w edytorze SVG lub bezpośrednio
      współrzędnych w JSON).
   b. Dokumentacja w curationSources: co poprawiono, wg jakiego źródła.
4. Cross-check z drugim źródłem — weryfikacja bez blind trust.
5. Jeśli split Korona/Litwa potwierdzone 2 źródłami → splitVerified: true.
6. Commit per wariant (ślad audytowy).
```

---

## Kryteria akceptacji dla `splitVerified: true`

1. Zewnętrzny obrys zgodny (w granicach schematyzacji) z co najmniej 2 niezależnymi źródłami atlasowymi.
2. Granica wewnętrzna Korona / Litwa nie jest heurystyczna (lon split), lecz oparta na danych z atlasu.
3. Wariant przeszedł wizualny review — mapa nie buduje fałszywych skojarzeń dla ucznia klasy 6.
4. `curationSources` wypełnione z co najmniej 2 wpisami o `verified: true`.

---

## Kryteria akceptacji dla wariantów bez splitu (Piastowie)

1. Zewnętrzny obrys spójny z przynajmniej 1 atlasem.
2. `historicalNote` zawiera wyraźny disclaimer o przybliżoności (już obecny).
3. Mapa prezentowana jako "mapa epoki", nie jako precyzyjna granica.

---

## Deliverables Fazy 6

1. **`maps_data.json`** — zaktualizowane warianty z `curationSources` i poprawionymi SVG pathami
2. **`extract_borders.py`** — rozszerzony o emisję `curationSources`
3. **Rendering SVG** w warstwie rozszerzonej karty wiedzy (`index.html`) — z respektowaniem `splitVerified`
4. **Testy wizualne** — screenshot każdego wariantu vs. źródło atlasowe

---

## Otwarte pytania

1. **Narzędzie do edycji SVG pathów** — bezpośrednia edycja współrzędnych w JSON vs. graficzny edytor SVG (Figma/Inkscape) z exportem? Graficzny byłby szybszy, ale trzeba pilnować spójności formatu.
2. **Granulacja commitów** — jeden commit per wariant (łatwiejszy audit) vs. batche per sprint?
3. **Rendering niezweryfikowanych wariantów** — jednolity obrys (obecny plan) vs. obrys + delikatna przerywana linia heurystycznego podziału z disclaimerem?
