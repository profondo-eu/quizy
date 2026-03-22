# Dodanie władców niekoronowanych (książąt) do quizu

## Zakres

Rozszerzenie quizu z "Królowie Polski" na "Władcy Polski" zgodnie z kanonem nauczyciela (`KANON_WLADCOW_POLSKI.md`). Docelowo 46 władców (27 królów + 19 książąt). Nowe pole `rulerType`, korekty dat i nazw istniejących wpisów, dostosowanie UI, nowe warianty map.

## Decyzje modelowe

- **Rok objęcia władzy**: jedno pole `coronationYear` (number) — kanon quizowy. Przybliżoność lub kontrowersyjność daty dokumentowana w `coronationFull` i `contextHints`.
- **Źródło prawdy**: `KANON_WLADCOW_POLSKI.md` — daty i nazwy z kanonu nadpisują dotychczasowe wartości w `kings_data.json`.

## Nowi władcy — pełne dane dydaktyczne (19 książąt)

### 1. Mieszko I (960)

- **keyAssociation**: Chrzest Polski 966 — otwarcie na świat łaciński
- **cue**: Chrzest Polski 966, twórca państwa
- **funFact**: Jego imię pojawia się po raz pierwszy w źródle obcym — kronice Widukinda z Korbei. Do dziś nie ma pewności, jak dokładnie brzmiało oryginalne słowiańskie imię.
- **mnemonic**: Mieszko = pierwszy władca, chrzest 966
- **contextHints**:
  - (event) Przyjął chrzest w 966 roku, otwierając Polskę na chrześcijaństwo zachodnie.
  - (description) Pierwszy historyczny władca państwa Polan. Zjednoczył plemiona i stworzył podwaliny państwowości.
  - (sequence) Ojciec Bolesława Chrobrego. Pierwszy władca w quizie.

### 2. Kazimierz I Odnowiciel (1039)

- **keyAssociation**: Odbudowa państwa po kryzysie lat 30. XI w.
- **cue**: Odbudował państwo po upadku lat 30. XI w.
- **funFact**: Wrócił do zniszczonego kraju z pomocą cesarza Henryka III. Przeniósł stolicę z Gniezna do Krakowa, bo Gniezno było zbyt zniszczone po reakcji pogańskiej.
- **mnemonic**: Odnowiciel = odnowił państwo po kryzysie, stolica → Kraków
- **contextHints**:
  - (event) Odbudował państwo po buncie pogańskim i czeskiej inwazji w latach 30. XI w.
  - (description) Przeniósł główny ośrodek władzy z Gniezna do Krakowa. Przydomek „Odnowiciel" mówi o jego roli.
  - (sequence) Syn Mieszka II Lamberta. Ojciec Bolesława Śmiałego.

### 3. Władysław I Herman (1079)

- **keyAssociation**: Rządy po wygnaniu Bolesława Śmiałego
- **cue**: Ojciec Zbigniewa i Krzywoustego
- **funFact**: Był tak słabym władcą, że faktyczną władzę sprawował za niego palatyn Sieciech. Dopiero bunt synów Zbigniewa i Krzywoustego odsunął Sieciecha od władzy.
- **mnemonic**: Herman = słaby władca, palatyn Sieciech rządzi, ojciec Krzywoustego
- **contextHints**:
  - (event) Objął władzę po wygnaniu brata Bolesława Śmiałego w 1079 roku.
  - (description) Władca o słabej pozycji; realną władzę sprawował palatyn Sieciech. Ojciec Zbigniewa i Bolesława Krzywoustego.
  - (relation) Brat Bolesława Śmiałego. Ojciec Bolesława III Krzywoustego.

### 4. Bolesław III Krzywousty (1102)

- **keyAssociation**: Obrona Głogowa (1109) i statut sukcesyjny (1138)
- **cue**: Obrona Głogowa i statut 1138
- **funFact**: Podczas oblężenia Głogowa w 1109 r. Niemcy mieli przywiązać polskich jeńców do machin oblężniczych. Obrońcy i tak strzelali — woleli poświęcić bliskich niż oddać miasto.
- **mnemonic**: Krzywousty = Głogów 1109, statut 1138 (rozbicie dzielnicowe)
- **contextHints**:
  - (event) Obronił Głogów przed cesarzem Henrykiem V w 1109 r. Wydał statut sukcesyjny w 1138, dzieląc państwo między synów.
  - (description) Ostatni władca zjednoczonej Polski przed rozbiciem dzielnicowym. Od 1102 współrządził z ojcem, od 1107 samodzielnie.
  - (sequence) Syn Władysława Hermana. Po jego śmierci w 1138 zaczęło się rozbicie dzielnicowe.

### 5. Władysław II Wygnaniec (1138)

- **keyAssociation**: Pierwszy princeps po statucie 1138, wygnany przez braci
- **cue**: Pierwszy senior po statucie 1138, wygnany przez braci
- **funFact**: Po wygnaniu schronił się u cesarza Konrada III. Nigdy nie odzyskał tronu, ale jego potomkowie — Piastowie śląscy — rządzili na Śląsku przez wieki.
- **mnemonic**: Wygnaniec = pierwszy princeps, wygnany, protoplasta Piastów śląskich
- **contextHints**:
  - (event) Jako najstarszy syn Krzywoustego objął seniorat w 1138. Został wygnany przez młodszych braci ok. 1146.
  - (description) Pierwszy princeps po statucie sukcesyjnym. Jego wygnanie zapoczątkowało rozbicie dzielnicowe w praktyce.
  - (relation) Najstarszy syn Bolesława Krzywoustego. Protoplasta Piastów śląskich.

### 6. Bolesław IV Kędzierzawy (1146)

- **keyAssociation**: Princeps po wygnaniu Władysława II
- **cue**: Princeps po wygnaniu Wygnańca
- **funFact**: Musiał złożyć cesarzowi hołd w Krzyszkowie w 1157 r. jako pokutę za wygnanie starszego brata. Było to jedno z najbardziej upokarzających wydarzeń wczesnego rozbicia.
- **mnemonic**: Kędzierzawy = po Wygnańcu, hołd w Krzyszkowie 1157
- **contextHints**:
  - (event) Objął pryncypat po wygnaniu Władysława II. W 1157 musiał złożyć hołd cesarzowi Fryderykowi Barbarossie.
  - (description) Symbol pierwszego etapu rozbicia dzielnicowego. Rządził jako princeps ponad 25 lat.
  - (sequence) Młodszy brat Władysława Wygnańca. Princeps od 1146 do 1173.

### 7. Mieszko III Stary (1173)

- **keyAssociation**: Wielokrotnie tracił i odzyskiwał Kraków
- **cue**: Wielokrotnie wracał do Krakowa po władzę
- **funFact**: Rządził z przerwami tak długo, że dożył ok. 80 lat — co w XII/XIII w. było fenomenem. Jego przydomek „Stary" nie jest przypadkowy.
- **mnemonic**: Stary = najdłużej żyjący Piast, wielokrotnie tracił i odzyskiwał tron
- **contextHints**:
  - (event) Obejmował pryncypat wielokrotnie (1173, 1191, 1198–1202). Centralna postać walk o seniorat.
  - (description) Jeden z najdłużej żyjących Piastów. Jego przydomek „Stary" odzwierciedla podeszły wiek, w którym nadal walczył o władzę.
  - (sequence) Syn Bolesława Krzywoustego. Brat Kazimierza Sprawiedliwego.

### 8. Kazimierz II Sprawiedliwy (1177)

- **keyAssociation**: Princeps mimo pominięcia w statucie Krzywoustego
- **cue**: Nie miał dostać dzielnicy, a został princepsem
- **funFact**: Według tradycji był tak lubiany przez możnych krakowskich, że złamali dla niego zasadę senioratu — stąd przydomek „Sprawiedliwy".
- **mnemonic**: Sprawiedliwy = nie miał dziedziczyć, a dostał Kraków
- **contextHints**:
  - (event) W 1177 możni krakowscy powołali go na tron, łamiąc zasadę senioratu ze statutu Krzywoustego.
  - (description) Najmłodszy syn Krzywoustego, początkowo pominięty w statucie sukcesyjnym. Przydomek „Sprawiedliwy" od przychylności możnych.
  - (relation) Najmłodszy syn Bolesława Krzywoustego. Ojciec Leszka Białego.

### 9. Leszek Biały (1194)

- **keyAssociation**: Zamordowany podczas zjazdu w Gąsawie (1227)
- **cue**: Zamordowany w Gąsawie 1227
- **funFact**: Zjazd w Gąsawie miał być spotkaniem pokojowym. Leszek został zaatakowany podczas kąpieli — zginął nagi i bezbronny, co wstrząsnęło ówczesną Polską.
- **mnemonic**: Biały = Gąsawa 1227, zamordowany na zjeździe
- **contextHints**:
  - (event) Został zamordowany podczas zjazdu w Gąsawie w 1227 r. — jedno z najgłośniejszych zabójstw politycznych średniowiecza w Polsce.
  - (description) Ważny książę krakowski, syn Kazimierza Sprawiedliwego. Jego przydomek „Biały" odnosi się prawdopodobnie do koloru włosów.
  - (sequence) Syn Kazimierza II Sprawiedliwego. Po jego śmierci walki o Kraków nasiliły się.

### 10. Mieszko Plątonogi (1198)

- **keyAssociation**: Raciborski Piast, princeps w podeszłym wieku
- **cue**: Stary Piast z Raciborza, sięgnął po Kraków
- **funFact**: Był już w podeszłym wieku, gdy sięgnął po Kraków. Jego przydomek „Plątonogi" należy do najbardziej charakterystycznych w całej dynastii Piastów — odnosi się prawdopodobnie do wady stóp.
- **mnemonic**: Plątonogi = raciborski książę, stary gdy sięgnął po Kraków
- **contextHints**:
  - (event) Na krótko objął pryncypat krakowski pod koniec XII w., rywalizując z Mieszkiem Starym.
  - (description) Książę raciborski o charakterystycznym przydomku. Sięgnął po Kraków w podeszłym wieku.
  - (relation) Piast śląski z linii raciborskiej. Rywalizował z Mieszkiem III Starym o seniorat.

### 11. Władysław III Laskonogi (1202)

- **keyAssociation**: Wielkopolski princeps, walki o seniorat w schyłkowym okresie rozbicia
- **cue**: Wielkopolski książę, ostatni princeps przed zjednoczeniem
- **funFact**: Jego przydomek „Laskonogi" odnosi się do szczupłych nóg. Był jednym z ostatnich książąt, którzy próbowali utrzymać zasadę pryncypatu, zanim idea zjednoczenia zaczęła dominować.
- **mnemonic**: Laskonogi = wielkopolski, szczupłe nogi, schyłek pryncypatu
- **contextHints**:
  - (event) Objął pryncypat w 1202 r. Był jednym z ostatnich ważnych princepsów przed próbami zjednoczenia.
  - (description) Wielkopolski Piast. Jego przydomek „Laskonogi" odnosi się do szczupłej budowy ciała.
  - (sequence) Rządził w okresie schyłkowym pryncypatu, przed Henrykiem Brodatym.

### 12. Konrad I Mazowiecki (1229)

- **keyAssociation**: Sprowadzenie Krzyżaków do walki z Prusami (1226)
- **cue**: Sprowadził Krzyżaków na ziemie polskie
- **funFact**: Sprowadził zakon krzyżacki do walki z Prusami, co miało skutki dla Polski na całe stulecia. Krzyżacy stworzyli własne państwo, które stało się jednym z największych wrogów Polski.
- **mnemonic**: Konrad Mazowiecki = Krzyżacy 1226, wielowiekowe konsekwencje
- **contextHints**:
  - (event) W 1226 r. nadał zakonowi krzyżackiemu ziemię chełmińską w zamian za pomoc w walce z pogańskimi Prusami.
  - (description) Książę mazowiecki, który podejmował wielokrotne próby zdobycia Krakowa. Najbardziej znany z decyzji o sprowadzeniu Krzyżaków.
  - (relation) Syn Kazimierza Sprawiedliwego, brat Leszka Białego.

### 13. Henryk I Brodaty (1232)

- **keyAssociation**: Śląski Piast bliski zjednoczenia ziem polskich
- **cue**: Mąż św. Jadwigi, śląski książę bliski zjednoczenia
- **funFact**: Jego żona Jadwiga Śląska została kanonizowana — to jedna z najważniejszych świętych w historii Śląska. Brodaty był tak blisko zjednoczenia, że gdyby żył dłużej, historia mogłaby potoczyć się inaczej.
- **mnemonic**: Brodaty = mąż św. Jadwigi, blisko zjednoczenia, Śląsk
- **contextHints**:
  - (event) Stopniowo jednoczył ziemie polskie pod swoją władzą — kontrolował Śląsk, Małopolskę i Wielkopolskę.
  - (description) Śląski Piast, mąż św. Jadwigi. Był najbliższy zjednoczenia ziem polskich od czasów Krzywoustego.
  - (relation) Ojciec Henryka II Pobożnego. Mąż św. Jadwigi Śląskiej.

### 14. Henryk II Pobożny (1238)

- **keyAssociation**: Bitwa pod Legnicą z Mongołami (1241)
- **cue**: Legnica 1241, poległ walcząc z Mongołami
- **funFact**: Poległ w bitwie pod Legnicą 9 kwietnia 1241 r. Mongołowie obcięli mu głowę i zatknęli na włóczni. Mimo klęski, najazd mongolski nie zdołał trwale podbić Polski.
- **mnemonic**: Pobożny = Legnica 1241, Mongołowie, głowa na włóczni
- **contextHints**:
  - (event) Poległ w bitwie pod Legnicą 9 kwietnia 1241 r., broniąc ziem polskich przed najazdem mongolskim.
  - (description) Syn Henryka Brodatego. Kontynuował dzieło ojca w jednoczeniu ziem, ale zginął walcząc z Mongołami.
  - (sequence) Syn Henryka I Brodatego. Po jego śmierci szanse na szybkie zjednoczenie ziem polskich przepadły.

### 15. Bolesław II Rogatka (1241)

- **keyAssociation**: Syn Pobożnego, awanturniczy Piast śląski
- **cue**: Najawanturniejszy z Piastów śląskich
- **funFact**: Zasłynął z niezwykle konfliktowego charakteru — toczył spory z biskupami, braćmi i sąsiadami. W historiografii uchodzi za jednego z najbardziej awanturniczych Piastów.
- **mnemonic**: Rogatka = awanturnik, syn Pobożnego, konflikty z każdym
- **contextHints**:
  - (event) Objął władzę po śmierci ojca pod Legnicą w 1241. Prowadził liczne wojny z własnymi braćmi i sąsiadami.
  - (description) Syn Henryka II Pobożnego. Znany z wyjątkowo konfliktowego charakteru i licznych sporów politycznych.
  - (relation) Syn Henryka Pobożnego. Piast śląski, który nie kontynuował polityki zjednoczenia ojca i dziada.

### 16. Bolesław V Wstydliwy (1243)

- **keyAssociation**: Mąż św. Kingi, odbudowa po najazdach mongolskich
- **cue**: Mąż św. Kingi, książę „wstydliwy"
- **funFact**: Jego przydomek wiąże się z tradycją życia w czystości w małżeństwie ze św. Kingą — co czyni go jedną z najbardziej nietypowych postaci na liście. Kinga jest patronką górników solnych z Wieliczki i Bochni.
- **mnemonic**: Wstydliwy = mąż św. Kingi, czystość w małżeństwie, Wieliczka
- **contextHints**:
  - (event) Rządził Krakowem w okresie odbudowy po najazdach mongolskich (1241, 1259).
  - (description) Książę krakowski, mąż św. Kingi. Przydomek „Wstydliwy" wiąże się z tradycją życia w czystości małżeńskiej.
  - (relation) Mąż Kingi (późniejszej świętej), patronki górników.

### 17. Bolesław Pobożny (1279)

- **keyAssociation**: Statut kaliski — przywilej dla Żydów (1264)
- **cue**: Statut kaliski 1264, przywilej dla Żydów
- **funFact**: Wydał statut kaliski z 1264 roku, jeden z najważniejszych średniowiecznych aktów prawnych regulujących pozycję Żydów w Polsce. Dokument obowiązywał w różnych formach przez setki lat.
- **mnemonic**: Pobożny = statut kaliski 1264, prawa Żydów, Wielkopolska
- **contextHints**:
  - (event) Wydał statut kaliski w 1264 r. — akt nadający prawa Żydom, jeden z najważniejszych dokumentów tolerancji w średniowieczu.
  - (description) Wielkopolski Piast, poprzednik Przemysła II. Przydomek „Pobożny" od religijności.
  - (sequence) Rządził w Wielkopolsce. Po nim władzę objął Przemysł II, który odzyskał koronę królewską.

### 18. Leszek II Czarny (1288)

- **keyAssociation**: Odparcie najazdów litewskich i jaćwieskich
- **cue**: Walczył z Litwinami i Jaćwingami, broniąc Małopolski
- **funFact**: Musiał równocześnie odpierać ambicje innych Piastów i najazdy litewskie oraz jaćwieskie, dlatego jego panowanie było niemal nieustanną walką o utrzymanie władzy i granic.
- **mnemonic**: Czarny = walki z Litwinami i Jaćwingami, niespokojne rządy
- **contextHints**:
  - (event) Bronił Małopolski przed najazdami litewskimi i jaćwieskimi. Jego panowanie to okres ciągłych wojen obronnych.
  - (description) Książę krakowski w schyłkowej fazie rozbicia dzielnicowego. Przydomek „Czarny" od koloru włosów lub cery.
  - (sequence) Rządził Krakowem przed Henrykiem Probusem. Jeden z ostatnich książąt przed zjednoczeniem.

### 19. Henryk IV Probus (1289)

- **keyAssociation**: Przygotowywał koronację, zmarł przed zjednoczeniem
- **cue**: Bliski koronacji, zmarł zanim zdążył ją zrealizować
- **funFact**: Według części badaczy przygotowywał własną koronację królewską, ale zmarł nagle w 1290 r. — prawdopodobnie otruty. Jego testament przekazał prawa do Krakowa Przemysłowi II.
- **mnemonic**: Probus = prawie król, śmierć przed koronacją, testament → Przemysł II
- **contextHints**:
  - (event) Przygotowywał koronację królewską, ale zmarł nagle w 1290 r. — być może otruty.
  - (description) Śląski książę krakowski, jeden z najbliższych zjednoczeniu przed Przemysłem II. Przydomek „Probus" (Prawy) od łacińskiego tytułu.
  - (sequence) Jego testament przekazał prawa do Krakowa Przemysłowi II, torując drogę do odnowienia królestwa.

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
- Utworzyć 19 nowych wpisów z `"rulerType": "książę"` i pełnym schematem (wszystkie pola dydaktyczne)
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
