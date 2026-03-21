#!/usr/bin/env python3
"""
Extract historical borders of Poland from aourednik/historical-basemaps.

Downloads GeoJSON files for 12 source years, extracts Poland/Lithuania
polygons, converts to SVG path data, and writes maps_data.json.

Usage:
    uv venv
    uv pip install shapely requests
    uv run python scripts/extract_borders.py
"""

import json
import pathlib
import sys

import requests
from shapely.geometry import shape, MultiPolygon, Polygon
from shapely.ops import unary_union

BASE_URL = "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson"

BBOX = {"min_lon": 14, "max_lon": 34, "min_lat": 49, "max_lat": 57}
SVG_WIDTH = 280
SVG_HEIGHT = 200

MAP_VARIANTS = [
    {
        "id": "piast-peak",
        "label": "Państwo Piastów u szczytu",
        "fromYear": 1000,
        "toYear": 1038,
        "sourceYear": 1000,
        "searchNames": ["Poland"],
        "splitCrownLithuania": False,
        "legend": ["Korona Polska"],
        "historicalNote": "Państwo Bolesława Chrobrego — od Łaby po Bug",
        "sourceRef": "aourednik/historical-basemaps world_1000",
    },
    {
        "id": "piast-rebuilt",
        "label": "Odbudowane państwo Piastów",
        "fromYear": 1058,
        "toYear": 1079,
        "sourceYear": 1100,
        "searchNames": ["Poland"],
        "splitCrownLithuania": False,
        "legend": ["Korona Polska"],
        "historicalNote": "Odbudowa po kryzysie lat 30. XI w., mniejsze terytorium niż za Chrobrego",
        "sourceRef": "aourednik/historical-basemaps world_1100",
    },
    {
        "id": "piast-reunited-early",
        "label": "Zjednoczona Wielkopolska i Małopolska",
        "fromYear": 1295,
        "toYear": 1300,
        "sourceYear": 1279,
        "searchNames": ["Poland"],
        "splitCrownLithuania": False,
        "legend": ["Korona Polska"],
        "historicalNote": "Zjednoczenie po rozbiciu dzielnicowym — Przemysł II i Wacław II",
        "sourceRef": "aourednik/historical-basemaps world_1279",
    },
    {
        "id": "piast-reunited",
        "label": "Zjednoczone Królestwo",
        "fromYear": 1320,
        "toYear": 1370,
        "sourceYear": 1300,
        "searchNames": ["Poland"],
        "splitCrownLithuania": False,
        "legend": ["Korona Polska"],
        "historicalNote": "Królestwo Łokietka i Kazimierza Wielkiego — stabilne, zjednoczone",
        "sourceRef": "aourednik/historical-basemaps world_1300",
    },
    {
        "id": "crown-angevin",
        "label": "Korona Polska (Andegawenowie)",
        "fromYear": 1370,
        "toYear": 1384,
        "sourceYear": 1400,
        "searchNames": ["Poland-Lithuania"],
        "splitCrownLithuania": True,
        "crownOnly": True,
        "splitVerified": False,
        "legend": ["Korona Polska"],
        "historicalNote": "Sama Korona pod rządami Andegawenów — Litwa jeszcze osobna",
        "sourceRef": "aourednik/historical-basemaps world_1400 (Crown only)",
    },
    {
        "id": "crown-lithuania-union",
        "label": "Polska i Litwa w unii personalnej",
        "fromYear": 1386,
        "toYear": 1434,
        "sourceYear": 1400,
        "searchNames": ["Poland-Lithuania"],
        "splitCrownLithuania": True,
        "crownOnly": False,
        "splitVerified": False,
        "legend": ["Korona", "Wielkie Księstwo Litewskie"],
        "historicalNote": "Unia personalna — wspólny władca, odrębne struktury",
        "sourceRef": "aourednik/historical-basemaps world_1400",
    },
    {
        "id": "crown-lithuania-jagiello",
        "label": "Korona i Litwa (Jagiellonowie)",
        "fromYear": 1434,
        "toYear": 1492,
        "sourceYear": 1492,
        "searchNames": ["Poland-Lithuania"],
        "splitCrownLithuania": True,
        "crownOnly": False,
        "splitVerified": False,
        "legend": ["Korona", "Wielkie Księstwo Litewskie"],
        "historicalNote": "Polska i Litwa w unii pod Jagiellonami — ekspansja terytorialna",
        "sourceRef": "aourednik/historical-basemaps world_1492",
    },
    {
        "id": "crown-lithuania-pre-lublin",
        "label": "Korona i Litwa przed Unią Lubelską",
        "fromYear": 1492,
        "toYear": 1569,
        "sourceYear": 1530,
        "searchNames": ["Poland-Llituania", "Poland-Lithuania"],
        "splitCrownLithuania": True,
        "crownOnly": False,
        "splitVerified": False,
        "legend": ["Korona", "Wielkie Księstwo Litewskie"],
        "historicalNote": "Ostatnie dekady unii personalnej przed unią realną (Lublin 1569)",
        "sourceRef": "aourednik/historical-basemaps world_1530",
    },
    {
        "id": "commonwealth",
        "label": "Rzeczpospolita Obojga Narodów",
        "fromYear": 1569,
        "toYear": 1654,
        "sourceYear": 1600,
        "searchNames": ["Poland-Llituania", "Poland-Lithuania"],
        "splitCrownLithuania": True,
        "crownOnly": False,
        "splitVerified": False,
        "legend": ["Korona", "Wielkie Księstwo Litewskie"],
        "historicalNote": "Po Unii Lubelskiej — jedno państwo, dwa narody; przed Potopem szwedzkim",
        "sourceRef": "aourednik/historical-basemaps world_1600",
    },
    {
        "id": "commonwealth-post-deluge",
        "label": "Rzeczpospolita w II poł. XVII w.",
        "fromYear": 1655,
        "toYear": 1700,
        "sourceYear": 1650,
        "searchNames": ["Polish\u2013Lithuanian Commonwealth", "Polish-Lithuanian Commonwealth"],
        "splitCrownLithuania": True,
        "crownOnly": False,
        "splitVerified": False,
        "legend": ["Korona", "Wielkie Księstwo Litewskie"],
        "historicalNote": "Źródło bazowe: world_1650 (tuż przed Potopem). Granice przybliżone — rzeczywiste straty terytorialne po 1660 nie są w pełni odzwierciedlone.",
        "sourceRef": "aourednik/historical-basemaps world_1650",
    },
    {
        "id": "commonwealth-late",
        "label": "Późna Rzeczpospolita",
        "fromYear": 1697,
        "toYear": 1736,
        "sourceYear": 1715,
        "searchNames": ["Polish\u2013Lithuanian Commonwealth", "Polish-Lithuanian Commonwealth"],
        "splitCrownLithuania": True,
        "crownOnly": False,
        "splitVerified": False,
        "legend": ["Korona", "Wielkie Księstwo Litewskie"],
        "historicalNote": "Era saskich królów — rosnąca zależność od Rosji",
        "sourceRef": "aourednik/historical-basemaps world_1715",
    },
    {
        "id": "commonwealth-pre-partitions",
        "label": "Rzeczpospolita przed rozbiorami",
        "fromYear": 1736,
        "toYear": 1795,
        "sourceYear": 1783,
        "searchNames": ["Poland"],
        "splitCrownLithuania": False,
        "legend": ["Rzeczpospolita Obojga Narodów"],
        "historicalNote": "Ostatnie lata Rzeczypospolitej — Poniatowski, Konstytucja 3 Maja, rozbiory",
        "sourceRef": "aourednik/historical-basemaps world_1783",
    },
]

SPLIT_LON = 23.5


def download_geojson(year: int) -> dict:
    url = f"{BASE_URL}/world_{year}.geojson"
    print(f"  Downloading world_{year}.geojson...")
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.json()


def find_feature(geojson: dict, search_names: list[str]) -> Polygon | MultiPolygon | None:
    for feat in geojson["features"]:
        name = feat["properties"].get("NAME", "") or ""
        if name in search_names:
            return shape(feat["geometry"])
    return None


def clip_to_bbox(geom, bbox=BBOX):
    box = Polygon([
        (bbox["min_lon"], bbox["min_lat"]),
        (bbox["max_lon"], bbox["min_lat"]),
        (bbox["max_lon"], bbox["max_lat"]),
        (bbox["min_lon"], bbox["max_lat"]),
    ])
    return geom.intersection(box)


def split_crown_lithuania(geom, split_lon=SPLIT_LON):
    """Split combined Poland-Lithuania along a longitude line.

    Rough heuristic: western part (~Crown), eastern part (~Lithuania).
    Needs manual verification.
    """
    min_lat, max_lat = BBOX["min_lat"] - 1, BBOX["max_lat"] + 1
    min_lon, max_lon = BBOX["min_lon"] - 1, BBOX["max_lon"] + 1

    west_box = Polygon([
        (min_lon, min_lat), (split_lon, min_lat),
        (split_lon, max_lat), (min_lon, max_lat),
    ])
    east_box = Polygon([
        (split_lon, min_lat), (max_lon, min_lat),
        (max_lon, max_lat), (split_lon, max_lat),
    ])

    crown = geom.intersection(west_box)
    lithuania = geom.intersection(east_box)
    return crown, lithuania


def lonlat_to_svg(lon: float, lat: float) -> tuple[float, float]:
    x = (lon - BBOX["min_lon"]) / (BBOX["max_lon"] - BBOX["min_lon"]) * SVG_WIDTH
    y = (BBOX["max_lat"] - lat) / (BBOX["max_lat"] - BBOX["min_lat"]) * SVG_HEIGHT
    return round(x, 1), round(y, 1)


def geom_to_svg_path(geom) -> str:
    if geom is None or geom.is_empty:
        return ""

    polygons = []
    if isinstance(geom, Polygon):
        polygons = [geom]
    elif isinstance(geom, MultiPolygon):
        polygons = list(geom.geoms)
    else:
        return ""

    parts = []
    for poly in polygons:
        coords = list(poly.exterior.coords)
        if len(coords) < 3:
            continue
        simplified = Polygon(coords).simplify(0.15, preserve_topology=True)
        coords = list(simplified.exterior.coords)

        sx, sy = lonlat_to_svg(*coords[0])
        path = [f"M{sx} {sy}"]
        for lon, lat in coords[1:]:
            px, py = lonlat_to_svg(lon, lat)
            path.append(f"L{px} {py}")
        path.append("Z")
        parts.append("".join(path))

    return "".join(parts)


def process_variant(variant: dict, cache: dict, existing_sources: list) -> dict:
    year = variant["sourceYear"]
    if year not in cache:
        cache[year] = download_geojson(year)

    geojson = cache[year]
    feature = find_feature(geojson, variant["searchNames"])

    sources = existing_sources

    if feature is None:
        print(f"  WARNING: No feature found for {variant['id']} (year {year}, names {variant['searchNames']})")
        return {
            "id": variant["id"],
            "label": variant["label"],
            "fromYear": variant["fromYear"],
            "toYear": variant["toYear"],
            "paths": {"crown": "", "lithuania": ""},
            "splitVerified": variant.get("splitVerified", False),
            "curationSources": sources,
            "legend": variant["legend"],
            "historicalNote": variant["historicalNote"],
            "sourceRef": variant["sourceRef"],
        }

    clipped = clip_to_bbox(feature)

    if variant.get("splitCrownLithuania") and not variant.get("crownOnly"):
        crown, lithuania = split_crown_lithuania(clipped)
        paths = {
            "crown": geom_to_svg_path(crown),
            "lithuania": geom_to_svg_path(lithuania),
        }
    elif variant.get("crownOnly"):
        crown, _ = split_crown_lithuania(clipped)
        paths = {"crown": geom_to_svg_path(crown)}
    else:
        paths = {"crown": geom_to_svg_path(clipped)}

    return {
        "id": variant["id"],
        "label": variant["label"],
        "fromYear": variant["fromYear"],
        "toYear": variant["toYear"],
        "paths": paths,
        "splitVerified": variant.get("splitVerified", False),
        "curationSources": sources,
        "legend": variant["legend"],
        "historicalNote": variant["historicalNote"],
        "sourceRef": variant["sourceRef"],
    }


def load_existing_variants(path: pathlib.Path) -> dict[str, dict]:
    """Load existing maps_data.json entries, keyed by variant id."""
    if not path.exists():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return {entry["id"]: entry for entry in data}
    except (json.JSONDecodeError, KeyError):
        return {}


def main():
    force = "--force" in sys.argv
    print("Extracting historical borders of Poland...")
    if force:
        print("  --force: all variants will be regenerated from baseline")

    out_path = pathlib.Path("historia/krolowie-polski/maps_data.json")
    existing = load_existing_variants(out_path)
    curated_ids = set() if force else {
        vid for vid, entry in existing.items()
        if entry.get("curationSources")
    }
    if curated_ids:
        print(f"  {len(curated_ids)} curated variant(s) will be preserved: "
              + ", ".join(sorted(curated_ids)))

    cache = {}
    results = []

    for variant in MAP_VARIANTS:
        vid = variant["id"]
        print(f"\nProcessing: {vid} ({variant['label']})")

        if vid in curated_ids:
            print("  SKIP regeneration — curated variant preserved as-is")
            results.append(existing[vid])
            continue

        sources = existing.get(vid, {}).get("curationSources", [])
        result = process_variant(variant, cache, sources)
        crown_len = len(result["paths"].get("crown", ""))
        lith_len = len(result["paths"].get("lithuania", ""))
        print(f"  Crown SVG path: {crown_len} chars")
        if lith_len:
            print(f"  Lithuania SVG path: {lith_len} chars")
        results.append(result)

    out_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nWrote {len(results)} map variants to {out_path}")
    print("\nIMPORTANT: Crown/Lithuania split uses a rough longitude heuristic.")
    print("Manual verification and adjustment of SVG paths is required.")


if __name__ == "__main__":
    main()
