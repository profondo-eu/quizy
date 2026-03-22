# Quizy edukacyjne

Interaktywne quizy edukacyjne hostowane lokalnie na kontenerze LXC (Proxmox VE).

## Dostępne quizy

| Quiz | Ścieżka | Typ |
|------|---------|-----|
| Stolice Europy | `/geografia/stolice-europy/` | Mapa + klikanie (D3.js) |
| Stolice Europy (tekstowy) | `/geografia/stolice-europy-tekstowy/` | Wpisywanie stolic |
| Budowa komórki jajowej | `/biologia/budowa-komorki-jajowej/` | Diagram SVG + klikanie |
| Rewolucja przemysłowa | `/historia/rewolucja-przemyslowa/` | Dopasowywanie dat/wydarzeń |
| Królowie Polski | `/historia/krolowie-polski/` | 4 tryby: wpisywanie, wybór, oś czasu, kontekst |

## Struktura

```
quizy/
  index.html                                    # Landing page
  geografia/stolice-europy/index.html           # 46 stolic Europy na mapie
  geografia/stolice-europy-tekstowy/index.html  # 46 stolic Europy — wersja tekstowa
  biologia/budowa-komorki-jajowej/index.html    # Elementy komórki jajowej
  historia/rewolucja-przemyslowa/index.html     # Wydarzenia rewolucji przemysłowej
  historia/krolowie-polski/index.html           # 28 królów Polski — koronacje
```

Każdy quiz to samodzielny `index.html` — zero zależności między quizami.

## Uruchomienie lokalne

Wystarczy dowolny serwer HTTP w katalogu głównym:

```bash
# Python (wbudowany)
python3 -m http.server 8000

# Node.js (npx, bez instalacji)
npx serve .
```

Otwórz `http://localhost:8000/` w przeglądarce.

> **Uwaga:** Otwieranie `index.html` bezpośrednio z dysku (`file://`) nie zadziała poprawnie w quizach korzystających z `fetch()` lub D3.js — potrzebny jest serwer HTTP.

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
ssh root@192.168.200.1 "pct exec 220 -- /usr/local/bin/update-quizy.sh"
```

Skrypt `/usr/local/bin/update-quizy.sh` w kontenerze wykonuje `git pull --ff-only`.

### Proxmox VE — kontekst

- **Host:** `192.168.200.1` (PVE 8.4)
- **LXC 220** (`webserver`) — ten serwer quizów
- **LXC 210** (`vault`) — Vault, `10.200.100.20`
- **VM 200** (`igor`) — OpenClaw, `10.200.100.10`

### Sieć PVE — reguły iptables (FORWARD)

Założenie architektoniczne: jeśli PVE jest osiągalny z danej sieci, to kontenery na nim też mają być osiągalne. Routing klientów nie jest modyfikowany — PVE (`192.168.200.1`) jest bramą domyślną dla sieci WiFi AP (dnsmasq na `wlp5s0`).

**Interfejsy na PVE:**

| Interfejs | Sieć | Rola |
|-----------|------|------|
| `wlo1` | `192.168.1.0/24` | LAN (internet via `192.168.1.1`) |
| `wlp5s0` | `192.168.200.0/24` | WiFi AP (klienci, DHCP) |
| `vmbr1` | `10.200.0.0/16` | Bridge kontenerów/VM |

**Reguły forwardowania (`iptables -L FORWARD`):**

```
# WiFi klienci ↔ internet
ACCEPT  in:wlp5s0  out:wlo1
ACCEPT  in:wlo1    out:wlp5s0  state RELATED,ESTABLISHED

# Kontenery ↔ internet
ACCEPT  in:vmbr1   out:wlo1
ACCEPT  in:wlo1    out:vmbr1   state RELATED,ESTABLISHED

# WiFi klienci → kontenery
ACCEPT  in:wlp5s0  out:vmbr1   dst 10.200.0.0/16
ACCEPT  in:vmbr1   out:wlp5s0  src 10.200.0.0/16  state RELATED,ESTABLISHED
```

**NAT (POSTROUTING):** MASQUERADE na `wlo1` dla ruchu z `192.168.200.0/24` i `10.200.0.0/16` do internetu. Ruch między `wlp5s0` a `vmbr1` nie jest NATowany.

Reguły zapisane przez `netfilter-persistent save` (`iptables-persistent`). Uwaga: restart usługi `pve-firewall` może przebudować łańcuch FORWARD — wtedy reguły trzeba ponownie dodać.
