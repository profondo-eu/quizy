#!/usr/bin/env python3
"""Validate kings_data.json and maps_data.json for internal consistency.

Run after any data change to catch regressions:
    uv run python scripts/validate_data.py

Exits with code 1 if any errors are found.
"""

import json
import pathlib
import sys
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parent.parent
KINGS_PATH = ROOT / "historia" / "krolowie-polski" / "kings_data.json"
MAPS_PATH = ROOT / "historia" / "krolowie-polski" / "maps_data.json"

REQUIRED_KING_FIELDS = [
    "name", "coronationYear", "coronationFull", "place", "dynasty",
    "eraLabel", "mapVariant", "predecessor", "successor",
    "keyAssociation", "keyEvents", "funFact", "mnemonic", "contextHints",
]
HINT_TYPES = {"event", "relation", "sequence", "description", "dual"}


def load_json(path: pathlib.Path) -> list:
    if not path.exists():
        print(f"FATAL: {path} not found")
        sys.exit(1)
    return json.loads(path.read_text(encoding="utf-8"))


def validate() -> list[str]:
    kings = load_json(KINGS_PATH)
    maps = load_json(MAPS_PATH)
    maps_by_id = {m["id"]: m for m in maps}
    errors: list[str] = []

    # --- Schema checks ---
    for i, k in enumerate(kings):
        for field in REQUIRED_KING_FIELDS:
            if field not in k:
                errors.append(f"[{i}] {k.get('name','?')}: missing field '{field}'")

    # --- coronationYear ∈ [fromYear, toYear] ---
    for k in kings:
        mv = k.get("mapVariant")
        if mv not in maps_by_id:
            errors.append(f"{k['name']}: mapVariant '{mv}' not found in maps_data")
            continue
        m = maps_by_id[mv]
        cy = k["coronationYear"]
        if not (m["fromYear"] <= cy <= m["toYear"]):
            errors.append(
                f"{k['name']}: coronationYear {cy} outside "
                f"{mv} range [{m['fromYear']}, {m['toYear']}]"
            )

    # --- coRuler symmetry ---
    for k in kings:
        cr = k.get("coRuler")
        if not cr:
            continue
        match = [x for x in kings if x["name"] == cr]
        if not match:
            errors.append(f"{k['name']}: coRuler '{cr}' not found in kings list")
        elif match[0].get("coRuler") != k["name"]:
            errors.append(
                f"{k['name']}: coRuler is '{cr}' but "
                f"{cr}.coRuler is '{match[0].get('coRuler')}'"
            )

    # --- contextHints: count, type diversity, non-empty ---
    for k in kings:
        hints = k.get("contextHints", [])
        if len(hints) != 3:
            errors.append(f"{k['name']}: expected 3 contextHints, got {len(hints)}")
        types = [h.get("type") for h in hints]
        for t in types:
            if t not in HINT_TYPES:
                errors.append(f"{k['name']}: unknown hint type '{t}'")
        if len(set(types)) < 2:
            errors.append(f"{k['name']}: hint types not diversified: {types}")
        for j, h in enumerate(hints):
            if not h.get("text", "").strip():
                errors.append(f"{k['name']}: contextHints[{j}] has empty text")

    # --- disambiguationCue for shared coronation years ---
    year_counts = Counter(k["coronationYear"] for k in kings)
    shared_years = {y for y, c in year_counts.items() if c > 1}
    for k in kings:
        if k["coronationYear"] in shared_years and not k.get("disambiguationCue"):
            errors.append(
                f"{k['name']}: shared year {k['coronationYear']} "
                f"but no disambiguationCue"
            )

    # --- predecessor/successor chain (co-ruler aware) ---
    last = len(kings) - 1
    for i, k in enumerate(kings):
        # predecessor checks
        if i == 0:
            if k["predecessor"] is not None:
                errors.append(f"{k['name']}: first king should have predecessor=null")
        else:
            prev = kings[i - 1]
            is_co = (
                k.get("coRuler") == prev["name"]
                or prev.get("coRuler") == k["name"]
            )
            if not is_co and k["predecessor"] != prev["name"]:
                errors.append(
                    f"{k['name']}: predecessor is '{k['predecessor']}' "
                    f"but previous entry is '{prev['name']}'"
                )

        # successor checks
        if i == last:
            if k["successor"] is not None:
                errors.append(f"{k['name']}: last king should have successor=null")
        else:
            nxt = kings[i + 1]
            is_co = (
                k.get("coRuler") == nxt["name"]
                or nxt.get("coRuler") == k["name"]
            )
            if is_co:
                expected = kings[i + 2]["name"] if i + 2 <= last else None
                if k["successor"] != expected:
                    errors.append(
                        f"{k['name']}: successor is '{k['successor']}' "
                        f"but expected '{expected}' (next is co-ruler)"
                    )
            elif k["successor"] != nxt["name"]:
                errors.append(
                    f"{k['name']}: successor is '{k['successor']}' "
                    f"but next entry is '{nxt['name']}'"
                )

    # --- every mapVariant referenced by kings exists in maps_data ---
    used_variants = {k["mapVariant"] for k in kings}
    available_variants = set(maps_by_id.keys())
    missing = used_variants - available_variants
    if missing:
        errors.append(f"mapVariants in kings but not in maps: {missing}")

    return errors


def main():
    errors = validate()
    if errors:
        print(f"VALIDATION FAILED — {len(errors)} error(s):\n")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    else:
        kings = load_json(KINGS_PATH)
        maps = load_json(MAPS_PATH)
        print(f"VALIDATION PASSED — {len(kings)} kings, {len(maps)} maps, 0 errors")


if __name__ == "__main__":
    main()
