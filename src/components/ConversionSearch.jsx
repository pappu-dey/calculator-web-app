/**
 * ConversionSearch — a smart search bar for converter pages.
 *
 * Accepts queries like:
 *   "kg to gm"  |  "100 kg to lbs"  |  "cm inches"  |  "celsius to f"
 *
 * Props:
 *   converterType  — 'length' | 'weight' | 'temperature' | 'speed' | ...
 *   unitKeys       — array of exact unit keys accepted by this converter
 *   onSelect(value?, from, to) — called when a match is found for THIS converter
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Master alias map ─────────────────────────────────────────────────────────
// Maps every recognised alias → { canonical, type, path }
// 'canonical' must exactly match a key in the converter's units object
const ALIASES = {
    // ── Length ────────────────────────────────────────────────────────────────
    m: { canonical: "Meter", type: "length" },
    meter: { canonical: "Meter", type: "length" },
    meters: { canonical: "Meter", type: "length" },
    metre: { canonical: "Meter", type: "length" },
    metres: { canonical: "Meter", type: "length" },
    km: { canonical: "Kilometer", type: "length" },
    kilometer: { canonical: "Kilometer", type: "length" },
    kilometers: { canonical: "Kilometer", type: "length" },
    kilometre: { canonical: "Kilometer", type: "length" },
    kilometres: { canonical: "Kilometer", type: "length" },
    cm: { canonical: "Centimeter", type: "length" },
    centimeter: { canonical: "Centimeter", type: "length" },
    centimeters: { canonical: "Centimeter", type: "length" },
    centimetre: { canonical: "Centimeter", type: "length" },
    centimetres: { canonical: "Centimeter", type: "length" },
    mm: { canonical: "Millimeter", type: "length" },
    millimeter: { canonical: "Millimeter", type: "length" },
    millimeters: { canonical: "Millimeter", type: "length" },
    millimetre: { canonical: "Millimeter", type: "length" },
    millimetres: { canonical: "Millimeter", type: "length" },
    mile: { canonical: "Mile", type: "length" },
    miles: { canonical: "Mile", type: "length" },
    mi: { canonical: "Mile", type: "length" },
    yard: { canonical: "Yard", type: "length" },
    yards: { canonical: "Yard", type: "length" },
    yd: { canonical: "Yard", type: "length" },
    yds: { canonical: "Yard", type: "length" },
    foot: { canonical: "Foot", type: "length" },
    feet: { canonical: "Foot", type: "length" },
    ft: { canonical: "Foot", type: "length" },
    inch: { canonical: "Inch", type: "length" },
    inches: { canonical: "Inch", type: "length" },
    "in": { canonical: "Inch", type: "length" },
    '"': { canonical: "Inch", type: "length" },

    // ── Weight ────────────────────────────────────────────────────────────────
    kg: { canonical: "Kilogram", type: "weight" },
    kilogram: { canonical: "Kilogram", type: "weight" },
    kilograms: { canonical: "Kilogram", type: "weight" },
    kilo: { canonical: "Kilogram", type: "weight" },
    kilos: { canonical: "Kilogram", type: "weight" },
    g: { canonical: "Gram", type: "weight" },
    gm: { canonical: "Gram", type: "weight" },
    gram: { canonical: "Gram", type: "weight" },
    grams: { canonical: "Gram", type: "weight" },
    mg: { canonical: "Milligram", type: "weight" },
    milligram: { canonical: "Milligram", type: "weight" },
    milligrams: { canonical: "Milligram", type: "weight" },
    "metric ton": { canonical: "Metric Ton", type: "weight" },
    "metric tons": { canonical: "Metric Ton", type: "weight" },
    tonne: { canonical: "Metric Ton", type: "weight" },
    tonnes: { canonical: "Metric Ton", type: "weight" },
    t: { canonical: "Metric Ton", type: "weight" },
    lb: { canonical: "Pound", type: "weight" },
    lbs: { canonical: "Pound", type: "weight" },
    pound: { canonical: "Pound", type: "weight" },
    pounds: { canonical: "Pound", type: "weight" },
    oz: { canonical: "Ounce", type: "weight" },
    ounce: { canonical: "Ounce", type: "weight" },
    ounces: { canonical: "Ounce", type: "weight" },

    // ── Temperature ───────────────────────────────────────────────────────────
    celsius: { canonical: "Celsius", type: "temperature" },
    centigrade: { canonical: "Celsius", type: "temperature" },
    "°c": { canonical: "Celsius", type: "temperature" },
    c: { canonical: "Celsius", type: "temperature" },
    fahrenheit: { canonical: "Fahrenheit", type: "temperature" },
    "°f": { canonical: "Fahrenheit", type: "temperature" },
    f: { canonical: "Fahrenheit", type: "temperature" },
    kelvin: { canonical: "Kelvin", type: "temperature" },
    k: { canonical: "Kelvin", type: "temperature" },

    // ── Speed ─────────────────────────────────────────────────────────────────
    "m/s": { canonical: "m/s", type: "speed" },
    mps: { canonical: "m/s", type: "speed" },
    "km/h": { canonical: "km/h", type: "speed" },
    kph: { canonical: "km/h", type: "speed" },
    kmph: { canonical: "km/h", type: "speed" },
    "km/hr": { canonical: "km/h", type: "speed" },
    mph: { canonical: "mph", type: "speed" },
    "mi/h": { canonical: "mph", type: "speed" },
    knot: { canonical: "knot", type: "speed" },
    knots: { canonical: "knot", type: "speed" },
    kt: { canonical: "knot", type: "speed" },
    "ft/s": { canonical: "ft/s", type: "speed" },
    fps: { canonical: "ft/s", type: "speed" },

    // ── Area ──────────────────────────────────────────────────────────────────
    "sq m": { canonical: "sq m", type: "area" },
    "m2": { canonical: "sq m", type: "area" },
    "m²": { canonical: "sq m", type: "area" },
    "sq km": { canonical: "sq km", type: "area" },
    "km2": { canonical: "sq km", type: "area" },
    "km²": { canonical: "sq km", type: "area" },
    "sq cm": { canonical: "sq cm", type: "area" },
    "cm2": { canonical: "sq cm", type: "area" },
    "sq mm": { canonical: "sq mm", type: "area" },
    hectare: { canonical: "Hectare", type: "area" },
    hectares: { canonical: "Hectare", type: "area" },
    ha: { canonical: "Hectare", type: "area" },
    acre: { canonical: "Acre", type: "area" },
    acres: { canonical: "Acre", type: "area" },
    "sq ft": { canonical: "sq ft", type: "area" },
    "ft2": { canonical: "sq ft", type: "area" },
    "ft²": { canonical: "sq ft", type: "area" },
    "sq in": { canonical: "sq in", type: "area" },
    "sq yd": { canonical: "sq yd", type: "area" },
    "sq mile": { canonical: "sq mile", type: "area" },
    "sq miles": { canonical: "sq mile", type: "area" },
    "mi2": { canonical: "sq mile", type: "area" },

    // ── Volume ────────────────────────────────────────────────────────────────
    liter: { canonical: "Liter", type: "volume" },
    liters: { canonical: "Liter", type: "volume" },
    litre: { canonical: "Liter", type: "volume" },
    litres: { canonical: "Liter", type: "volume" },
    l: { canonical: "Liter", type: "volume" },
    ml: { canonical: "Milliliter", type: "volume" },
    milliliter: { canonical: "Milliliter", type: "volume" },
    milliliters: { canonical: "Milliliter", type: "volume" },
    millilitre: { canonical: "Milliliter", type: "volume" },
    millilitres: { canonical: "Milliliter", type: "volume" },
    "cubic meter": { canonical: "Cubic Meter", type: "volume" },
    "cubic metre": { canonical: "Cubic Meter", type: "volume" },
    "m3": { canonical: "Cubic Meter", type: "volume" },
    gallon: { canonical: "Gallon", type: "volume" },
    gallons: { canonical: "Gallon", type: "volume" },
    gal: { canonical: "Gallon", type: "volume" },
    quart: { canonical: "Quart", type: "volume" },
    quarts: { canonical: "Quart", type: "volume" },
    qt: { canonical: "Quart", type: "volume" },
    pint: { canonical: "Pint", type: "volume" },
    pints: { canonical: "Pint", type: "volume" },
    pt: { canonical: "Pint", type: "volume" },
    cup: { canonical: "Cup", type: "volume" },
    cups: { canonical: "Cup", type: "volume" },
    "fluid oz": { canonical: "Fluid Oz", type: "volume" },
    "fl oz": { canonical: "Fluid Oz", type: "volume" },
    "fluid ounce": { canonical: "Fluid Oz", type: "volume" },
    tablespoon: { canonical: "Tablespoon", type: "volume" },
    tablespoons: { canonical: "Tablespoon", type: "volume" },
    tbsp: { canonical: "Tablespoon", type: "volume" },
    teaspoon: { canonical: "Teaspoon", type: "volume" },
    teaspoons: { canonical: "Teaspoon", type: "volume" },
    tsp: { canonical: "Teaspoon", type: "volume" },

    // ── Power ─────────────────────────────────────────────────────────────────
    watt: { canonical: "Watt", type: "power" },
    watts: { canonical: "Watt", type: "power" },
    w: { canonical: "Watt", type: "power" },
    kilowatt: { canonical: "Kilowatt", type: "power" },
    kilowatts: { canonical: "Kilowatt", type: "power" },
    kw: { canonical: "Kilowatt", type: "power" },
    megawatt: { canonical: "Megawatt", type: "power" },
    megawatts: { canonical: "Megawatt", type: "power" },
    mw: { canonical: "Megawatt", type: "power" },
    horsepower: { canonical: "Horsepower", type: "power" },
    hp: { canonical: "Horsepower", type: "power" },
    "btu/h": { canonical: "BTU/h", type: "power" },
    "btu": { canonical: "BTU/h", type: "power" },

    // ── Pressure ──────────────────────────────────────────────────────────────
    pascal: { canonical: "Pascal", type: "pressure" },
    pa: { canonical: "Pascal", type: "pressure" },
    kilopascal: { canonical: "Kilopascal", type: "pressure" },
    kpa: { canonical: "Kilopascal", type: "pressure" },
    bar: { canonical: "Bar", type: "pressure" },
    psi: { canonical: "PSI", type: "pressure" },
    atmosphere: { canonical: "Atmosphere", type: "pressure" },
    atm: { canonical: "Atmosphere", type: "pressure" },
    torr: { canonical: "Torr", type: "pressure" },
    mmhg: { canonical: "mmHg", type: "pressure" },

    // ── Time ──────────────────────────────────────────────────────────────────
    second: { canonical: "Second", type: "time" },
    seconds: { canonical: "Second", type: "time" },
    sec: { canonical: "Second", type: "time" },
    s: { canonical: "Second", type: "time" },
    millisecond: { canonical: "Millisecond", type: "time" },
    milliseconds: { canonical: "Millisecond", type: "time" },
    ms: { canonical: "Millisecond", type: "time" },
    microsecond: { canonical: "Microsecond", type: "time" },
    microseconds: { canonical: "Microsecond", type: "time" },
    μs: { canonical: "Microsecond", type: "time" },
    us: { canonical: "Microsecond", type: "time" },
    minute: { canonical: "Minute", type: "time" },
    minutes: { canonical: "Minute", type: "time" },
    min: { canonical: "Minute", type: "time" },
    mins: { canonical: "Minute", type: "time" },
    hour: { canonical: "Hour", type: "time" },
    hours: { canonical: "Hour", type: "time" },
    hr: { canonical: "Hour", type: "time" },
    hrs: { canonical: "Hour", type: "time" },
    h: { canonical: "Hour", type: "time" },
    day: { canonical: "Day", type: "time" },
    days: { canonical: "Day", type: "time" },
    week: { canonical: "Week", type: "time" },
    weeks: { canonical: "Week", type: "time" },
    month: { canonical: "Month", type: "time" },
    months: { canonical: "Month", type: "time" },
    year: { canonical: "Year", type: "time" },
    years: { canonical: "Year", type: "time" },
    yr: { canonical: "Year", type: "time" },
    yrs: { canonical: "Year", type: "time" },

    // ── Data ──────────────────────────────────────────────────────────────────
    byte: { canonical: "Byte", type: "data" },
    bytes: { canonical: "Byte", type: "data" },
    b: { canonical: "Byte", type: "data" },
    kilobyte: { canonical: "Kilobyte", type: "data" },
    kilobytes: { canonical: "Kilobyte", type: "data" },
    kb: { canonical: "Kilobyte", type: "data" },
    megabyte: { canonical: "Megabyte", type: "data" },
    megabytes: { canonical: "Megabyte", type: "data" },
    mb: { canonical: "Megabyte", type: "data" },
    gigabyte: { canonical: "Gigabyte", type: "data" },
    gigabytes: { canonical: "Gigabyte", type: "data" },
    gb: { canonical: "Gigabyte", type: "data" },
    terabyte: { canonical: "Terabyte", type: "data" },
    terabytes: { canonical: "Terabyte", type: "data" },
    tb: { canonical: "Terabyte", type: "data" },
    bit: { canonical: "Bit", type: "data" },
    bits: { canonical: "Bit", type: "data" },
    kilobit: { canonical: "Kilobit", type: "data" },
    kilobits: { canonical: "Kilobit", type: "data" },
    kbit: { canonical: "Kilobit", type: "data" },
    megabit: { canonical: "Megabit", type: "data" },
    megabits: { canonical: "Megabit", type: "data" },
    mbit: { canonical: "Megabit", type: "data" },
};

const TYPE_PATHS = {
    length: "/converter/length",
    weight: "/converter/weight",
    temperature: "/converter/temperature",
    speed: "/converter/speed",
    area: "/converter/area",
    volume: "/converter/volume",
    power: "/converter/power",
    pressure: "/converter/pressure",
    time: "/converter/time",
    data: "/converter/data",
};

const TYPE_LABELS = {
    length: "Length Converter",
    weight: "Weight Converter",
    temperature: "Temperature Converter",
    speed: "Speed Converter",
    area: "Area Converter",
    volume: "Volume Converter",
    power: "Power Converter",
    pressure: "Pressure Converter",
    time: "Time Converter",
    data: "Data Converter",
};

/**
 * Parse a query string and return { numValue, fromAlias, toAlias }
 * Handles:
 *   "kg to gm"
 *   "100 kg to gm"
 *   "100kg to gram"
 *   "kg gram"          (no "to" keyword)
 *   "celsius fahrenheit"
 *   "km/h mph"
 */
function parseQuery(raw) {
    const q = raw.trim().toLowerCase();
    if (!q) return null;

    // Try to extract a leading number
    const numMatch = q.match(/^(\d+\.?\d*)\s*/);
    let numValue = null;
    let rest = q;
    if (numMatch) {
        numValue = parseFloat(numMatch[1]);
        rest = q.slice(numMatch[0].length);
    }

    // Split on " to " or just a space
    let parts;
    if (rest.includes(" to ")) {
        parts = rest.split(" to ").map((p) => p.trim());
    } else {
        // Try splitting on space — take last word as "to"
        const tokens = rest.split(/\s+/);
        if (tokens.length >= 2) {
            // If there's a number-attached prefix like "100km" it was already stripped
            parts = [tokens.slice(0, -1).join(" "), tokens[tokens.length - 1]];
        } else {
            parts = [rest, ""];
        }
    }

    const fromRaw = parts[0]?.trim() || "";
    const toRaw = parts[1]?.trim() || "";

    return { numValue, fromRaw, toRaw };
}

function lookupAlias(alias) {
    return ALIASES[alias.toLowerCase()] || null;
}

export default function ConversionSearch({ converterType, unitKeys, onSelect }) {
    const [query, setQuery] = useState("");
    const [match, setMatch] = useState(null); // { from, to, type, numValue }
    const [noMatch, setNoMatch] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const val = e.target.value;
        setQuery(val);
        setNoMatch(false);

        if (!val.trim()) { setMatch(null); return; }

        const parsed = parseQuery(val);
        if (!parsed || !parsed.fromRaw) { setMatch(null); return; }

        const fromInfo = lookupAlias(parsed.fromRaw);
        const toInfo = parsed.toRaw ? lookupAlias(parsed.toRaw) : null;

        if (!fromInfo) { setMatch(null); return; }

        // Need both units to do anything useful
        if (!toInfo) { setMatch(null); return; }

        setMatch({
            from: fromInfo.canonical,
            to: toInfo.canonical,
            type: fromInfo.type,  // type of the from unit
            numValue: parsed.numValue,
        });
    };

    const handleApply = () => {
        if (!match) return;

        if (match.type === converterType) {
            // Same converter — fill in and convert
            onSelect(match.numValue != null ? String(match.numValue) : null, match.from, match.to);
            setQuery("");
            setMatch(null);
        } else {
            // Different converter — navigate there
            const path = TYPE_PATHS[match.type];
            if (path) navigate(path);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleApply();
    };

    const isSameConverter = match && match.type === converterType;
    const isDifferentConverter = match && match.type !== converterType;

    return (
        <div className="conversion-search">
            <div className="cs-input-row">
                <span className="cs-icon">🔍</span>
                <input
                    className="cs-input"
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder='Search — e.g. "kg to gm" or "100 cm to inches"'
                    aria-label="Smart conversion search"
                    autoComplete="off"
                    spellCheck="false"
                />
                {query && (
                    <button
                        className="cs-clear"
                        onClick={() => { setQuery(""); setMatch(null); setNoMatch(false); }}
                        aria-label="Clear search"
                    >✕</button>
                )}
            </div>

            {match && (
                <div className={`cs-result ${isSameConverter ? "cs-result--same" : "cs-result--redirect"}`}>
                    <div className="cs-result-info">
                        <span className="cs-from">{match.from}</span>
                        <span className="cs-arrow">→</span>
                        <span className="cs-to">{match.to}</span>
                        {match.numValue != null && (
                            <span className="cs-val">({match.numValue})</span>
                        )}
                        {isDifferentConverter && (
                            <span className="cs-redirect-badge">
                                {TYPE_LABELS[match.type]}
                            </span>
                        )}
                    </div>
                    <button className="cs-apply-btn" onClick={handleApply}>
                        {isSameConverter ? "Convert ↵" : "Go →"}
                    </button>
                </div>
            )}

            {noMatch && (
                <div className="cs-no-match">No matching units found. Try "kg to lbs" or "cm to inches".</div>
            )}
        </div>
    );
}
