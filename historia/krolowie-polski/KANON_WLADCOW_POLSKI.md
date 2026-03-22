# Kanon władców Polski do quizu

Ten plik zapisuje przyjęty kanon materiału dla quizu "Władcy Polski".

Założenia:
- zakres quizu to `władcy`, nie tylko `królowie`,
- dla okresu rozbicia dzielnicowego uwzględniamy tylko `princepsów`,
- w warstwie technicznej pole `coronationYear` pozostaje bez zmian, ale dla władców niekoronowanych oznacza rok objęcia władzy,
- kanon jest oparty na liście wymaganej przez nauczyciela.

## Pełna lista chronologiczna

| # | Imię | Typ | Rok quizowy |
|---|------|-----|-------------|
| 1 | Mieszko I | książę | 960 |
| 2 | Bolesław I Chrobry | król | 1025 |
| 3 | Mieszko II Lambert | król | 1025 |
| 4 | Kazimierz I Odnowiciel | książę | 1039 |
| 5 | Bolesław II Śmiały | król | 1076 |
| 6 | Władysław I Herman | książę | 1079 |
| 7 | Bolesław III Krzywousty | książę | 1102 |
| 8 | Władysław II Wygnaniec | książę | 1138 |
| 9 | Bolesław IV Kędzierzawy | książę | 1146 |
| 10 | Mieszko III Stary | książę | 1173 |
| 11 | Kazimierz II Sprawiedliwy | książę | 1177 |
| 12 | Leszek Biały | książę | 1194 |
| 13 | Mieszko Plątonogi | książę | 1198 |
| 14 | Władysław III Laskonogi | książę | 1202 |
| 15 | Konrad I Mazowiecki | książę | 1229 |
| 16 | Henryk I Brodaty | książę | 1232 |
| 17 | Henryk II Pobożny | książę | 1238 |
| 18 | Bolesław II Rogatka | książę | 1241 |
| 19 | Bolesław V Wstydliwy | książę | 1243 |
| 20 | Bolesław Pobożny | książę | 1279 |
| 21 | Leszek II Czarny | książę | 1288 |
| 22 | Henryk IV Probus | książę | 1289 |
| 23 | Przemysł II | król | 1295 |
| 24 | Wacław II | król | 1300 |
| 25 | Władysław I Łokietek | król | 1320 |
| 26 | Kazimierz III Wielki | król | 1333 |
| 27 | Ludwik Węgierski | król | 1370 |
| 28 | Jadwiga Andegaweńska | król | 1384 |
| 29 | Władysław II Jagiełło | król | 1386 |
| 30 | Władysław III Warneńczyk | król | 1434 |
| 31 | Kazimierz IV Jagiellończyk | król | 1447 |
| 32 | Jan I Olbracht | król | 1492 |
| 33 | Aleksander Jagiellończyk | król | 1501 |
| 34 | Zygmunt I Stary | król | 1506 |
| 35 | Zygmunt II August | król | 1529 |
| 36 | Henryk Walezy | król | 1574 |
| 37 | Stefan Batory | król | 1576 |
| 38 | Zygmunt III Waza | król | 1587 |
| 39 | Władysław IV Waza | król | 1632 |
| 40 | Jan II Kazimierz | król | 1648 |
| 41 | Michał Korybut Wiśniowiecki | król | 1669 |
| 42 | Jan III Sobieski | król | 1674 |
| 43 | August II Mocny | król | 1697 |
| 44 | Stanisław Leszczyński | król | 1704 |
| 45 | August III Sas | król | 1734 |
| 46 | Stanisław August Poniatowski | król | 1764 |

## Noty implementacyjne

- `Anna Jagiellonka` nie należy do tego kanonu i nie powinna być liczona jako osobna postać do opanowania, jeśli quiz ma trzymać się dokładnie listy nauczyciela.
- Dla władców niekoronowanych warto zachować pełny zestaw pól dydaktycznych: `keyAssociation`, `keyEvents`, `funFact`, `mnemonic`, `contextHints`.
- Dla postaci o spornej lub przybliżonej dacie pole `coronationFull` powinno przechowywać doprecyzowanie, a `coronationYear` tylko kanoniczny rok quizowy.
