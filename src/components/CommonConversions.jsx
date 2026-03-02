

const CONVERSIONS = {
    length: [
        { from: "Centimeter", to: "Inch", label: "cm → in" },
        { from: "Kilogram", to: "Pound", label: "kg → lbs", skip: true }, // weight
        { from: "Celsius", to: "Fahrenheit", label: "°C → °F", skip: true }, // temp
        { from: "Millimeter", to: "Inch", label: "mm → in" },
        { from: "Meter", to: "Foot", label: "m → ft" },
        { from: "Kilometer", to: "Mile", label: "km → mi" },
        { from: "Centimeter", to: "Foot", label: "cm → ft" },
        { from: "Inch", to: "Foot", label: "in → ft" },
        { from: "Meter", to: "Yard", label: "m → yd" },
        { from: "Inch", to: "Centimeter", label: "in → cm" },
        { from: "Foot", to: "Meter", label: "ft → m" },
        { from: "Mile", to: "Kilometer", label: "mi → km" },
        { from: "Foot", to: "Centimeter", label: "ft → cm" },
        { from: "Foot", to: "Inch", label: "ft → in" },
        { from: "Yard", to: "Meter", label: "yd → m" },
    ],
    weight: [
        { from: "Kilogram", to: "Pound", label: "kg → lbs" },
        { from: "Gram", to: "Ounce", label: "g → oz" },
        { from: "Pound", to: "Ounce", label: "lb → oz" },
        { from: "Ounce", to: "Gram", label: "oz → g" },
        { from: "Pound", to: "Kilogram", label: "lbs → kg" },
        { from: "Ounce", to: "Pound", label: "oz → lb" },
        { from: "Kilogram", to: "Gram", label: "kg → g" },
        { from: "Gram", to: "Kilogram", label: "g → kg" },
        { from: "Kilogram", to: "Ounce", label: "kg → oz" },
        { from: "Pound", to: "Gram", label: "lb → g" },
        { from: "Metric Ton", to: "Kilogram", label: "t → kg" },
        { from: "Kilogram", to: "Metric Ton", label: "kg → t" },
    ],
    temperature: [
        { from: "Celsius", to: "Fahrenheit", label: "°C → °F" },
        { from: "Fahrenheit", to: "Celsius", label: "°F → °C" },
        { from: "Celsius", to: "Kelvin", label: "°C → K" },
        { from: "Kelvin", to: "Celsius", label: "K → °C" },
        { from: "Fahrenheit", to: "Kelvin", label: "°F → K" },
        { from: "Kelvin", to: "Fahrenheit", label: "K → °F" },
    ],
    speed: [
        { from: "mph", to: "km/h", label: "mph → kph" },
        { from: "km/h", to: "mph", label: "kph → mph" },
        { from: "m/s", to: "km/h", label: "m/s → km/h" },
        { from: "km/h", to: "m/s", label: "km/h → m/s" },
        { from: "m/s", to: "mph", label: "m/s → mph" },
        { from: "mph", to: "m/s", label: "mph → m/s" },
        { from: "knot", to: "km/h", label: "knot → km/h" },
        { from: "km/h", to: "knot", label: "km/h → knot" },
        { from: "ft/s", to: "m/s", label: "ft/s → m/s" },
        { from: "m/s", to: "ft/s", label: "m/s → ft/s" },
    ],
    area: [
        { from: "Acre", to: "sq ft", label: "acres → sq ft" },
        { from: "sq ft", to: "Acre", label: "sq ft → acres" },
        { from: "sq m", to: "sq ft", label: "m² → ft²" },
        { from: "sq ft", to: "sq m", label: "ft² → m²" },
        { from: "Hectare", to: "Acre", label: "ha → acres" },
        { from: "Acre", to: "Hectare", label: "acres → ha" },
        { from: "sq km", to: "sq mile", label: "km² → mi²" },
        { from: "sq mile", to: "sq km", label: "mi² → km²" },
        { from: "sq m", to: "sq cm", label: "m² → cm²" },
        { from: "sq cm", to: "sq m", label: "cm² → m²" },
        { from: "sq yd", to: "sq ft", label: "yd² → ft²" },
        { from: "sq ft", to: "sq yd", label: "ft² → yd²" },
    ],
    volume: [
        { from: "Liter", to: "Gallon", label: "L → gal" },
        { from: "Gallon", to: "Liter", label: "gal → L" },
        { from: "Milliliter", to: "Cup", label: "mL → cups" },
        { from: "Cup", to: "Milliliter", label: "cups → mL" },
        { from: "Liter", to: "Milliliter", label: "L → mL" },
        { from: "Milliliter", to: "Liter", label: "mL → L" },
        { from: "Gallon", to: "Quart", label: "gal → qt" },
        { from: "Quart", to: "Pint", label: "qt → pt" },
        { from: "Pint", to: "Cup", label: "pt → cup" },
        { from: "Cup", to: "Fluid Oz", label: "cup → fl oz" },
        { from: "Liter", to: "Cup", label: "L → cups" },
        { from: "Cup", to: "Liter", label: "cups → L" },
    ],
    power: [
        { from: "Horsepower", to: "Kilowatt", label: "hp → kW" },
        { from: "Kilowatt", to: "Horsepower", label: "kW → hp" },
        { from: "Watt", to: "Kilowatt", label: "W → kW" },
        { from: "Kilowatt", to: "Watt", label: "kW → W" },
        { from: "Kilowatt", to: "Megawatt", label: "kW → MW" },
        { from: "Megawatt", to: "Kilowatt", label: "MW → kW" },
        { from: "Watt", to: "Horsepower", label: "W → hp" },
        { from: "Horsepower", to: "Watt", label: "hp → W" },
        { from: "BTU/h", to: "Watt", label: "BTU/h → W" },
        { from: "Watt", to: "BTU/h", label: "W → BTU/h" },
    ],
    pressure: [
        { from: "Bar", to: "PSI", label: "bar → psi" },
        { from: "PSI", to: "Bar", label: "psi → bar" },
        { from: "Atmosphere", to: "PSI", label: "atm → psi" },
        { from: "PSI", to: "Atmosphere", label: "psi → atm" },
        { from: "Pascal", to: "Kilopascal", label: "Pa → kPa" },
        { from: "Kilopascal", to: "Pascal", label: "kPa → Pa" },
        { from: "Bar", to: "Atmosphere", label: "bar → atm" },
        { from: "Atmosphere", to: "Bar", label: "atm → bar" },
        { from: "Torr", to: "Pascal", label: "Torr → Pa" },
        { from: "Kilopascal", to: "Bar", label: "kPa → bar" },
    ],
    time: [
        { from: "Hour", to: "Minute", label: "hr → min" },
        { from: "Minute", to: "Second", label: "min → sec" },
        { from: "Day", to: "Hour", label: "day → hr" },
        { from: "Week", to: "Day", label: "week → day" },
        { from: "Year", to: "Day", label: "yr → day" },
        { from: "Month", to: "Day", label: "month → day" },
        { from: "Hour", to: "Second", label: "hr → sec" },
        { from: "Second", to: "Millisecond", label: "s → ms" },
        { from: "Day", to: "Minute", label: "day → min" },
        { from: "Year", to: "Month", label: "yr → month" },
        { from: "Year", to: "Hour", label: "yr → hr" },
        { from: "Week", to: "Hour", label: "week → hr" },
    ],
    data: [
        { from: "Megabyte", to: "Gigabyte", label: "MB → GB" },
        { from: "Gigabyte", to: "Megabyte", label: "GB → MB" },
        { from: "Kilobyte", to: "Megabyte", label: "KB → MB" },
        { from: "Megabyte", to: "Kilobyte", label: "MB → KB" },
        { from: "Gigabyte", to: "Terabyte", label: "GB → TB" },
        { from: "Terabyte", to: "Gigabyte", label: "TB → GB" },
        { from: "Byte", to: "Kilobyte", label: "B → KB" },
        { from: "Bit", to: "Byte", label: "bit → B" },
        { from: "Megabit", to: "Megabyte", label: "Mb → MB" },
        { from: "Megabyte", to: "Megabit", label: "MB → Mb" },
        { from: "Kilobit", to: "Kilobyte", label: "Kb → KB" },
        { from: "Gigabyte", to: "Kilobyte", label: "GB → KB" },
    ],
};

// Filter out entries with `skip: true` and deduplicate
function getConversions(type) {
    return (CONVERSIONS[type] || []).filter((c) => !c.skip);
}

export default function CommonConversions({ type, onSelect }) {
    const items = getConversions(type);
    if (!items.length) return null;

    return (
        <div className="common-conversions">
            <h3 className="common-conversions-title">Common Conversions</h3>
            <div className="common-conversions-grid">
                {items.map((item, i) => (
                    <button
                        key={i}
                        className="conversion-chip"
                        onClick={() => onSelect(item.from, item.to)}
                        title={`Convert ${item.from} to ${item.to}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
