# Quizy edukacyjne

Interaktywne quizy edukacyjne hostowane lokalnie na kontenerze LXC (Proxmox VE).

## Dostępne quizy

| Quiz | Ścieżka | Typ |
|------|---------|-----|
| Stolice Europy | `/geografia/stolice-europy/` | Mapa + klikanie (D3.js) |
| Budowa komórki jajowej | `/biologia/budowa-komorki-jajowej/` | Diagram SVG + klikanie |
| Rewolucja przemysłowa | `/historia/rewolucja-przemyslowa/` | Dopasowywanie dat/wydarzeń |

## Struktura

```
quizy/
  index.html                                    # Landing page
  geografia/stolice-europy/index.html           # 46 stolic Europy na mapie
  biologia/budowa-komorki-jajowej/index.html    # Elementy komórki jajowej
  historia/rewolucja-przemyslowa/index.html     # Wydarzenia rewolucji przemysłowej
```

Każdy quiz to samodzielny `index.html` — zero zależności między quizami.

## Dodawanie nowego quizu

1. Utwórz katalog: `<przedmiot>/<nazwa-quizu>/`
2. Dodaj `index.html` (samodzielny plik ze stylami i logiką)
3. Dodaj kafelek na landing page (`index.html` w katalogu głównym)
4. Push na GitHub, potem aktualizacja na serwerze

## Infrastruktura

### Hosting — LXC 220 (`webserver`) na Proxmox VE

- **OS:** Debian 12 (Bookworm)
- **Zasoby:** 1 CPU, 256 MB RAM, 2 GB dysk
- **Sieć:** vmbr1, IP `10.200.100.30/16`, gateway `10.200.0.1`
- **Serwer WWW:** Nginx
- **Pliki:** `/var/www/quizy/` (klon tego repozytorium)
- **URL:** `http://10.200.100.30/`

### Aktualizacja po zmianach w repo

```bash
ssh root@192.168.200.1 "pct exec 220 -- update-quizy.sh"
```

Skrypt `/usr/local/bin/update-quizy.sh` w kontenerze wykonuje `git pull --ff-only`.

### Proxmox VE — kontekst

- **Host:** `192.168.200.1` (PVE 8.4)
- **LXC 220** (`webserver`) — ten serwer quizów
- **LXC 210** (`vault`) — Vault, `10.200.100.20`
- **VM 200** (`igor`) — OpenClaw, `10.200.100.10`
