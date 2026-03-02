import BackButton from "../../components/BackButton";
import ToolCard from "../../components/ToolCard";
import {
    IconRuler, IconWeight, IconThermometer, IconZap, IconDatabase,
    IconCalculator, IconChart, IconClipboard, IconCalendar,
    IconFlame, IconScale, IconPercent,
} from "../../components/Icons";

export default function Converter() {
    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-header">
                    <h2>Unit Converters</h2>
                    <p>Convert between different units instantly</p>
                </div>

                <h3 className="section-subtitle">Common Converters</h3>
                <div className="tool-grid">
                    <ToolCard icon={<IconRuler size={22} />} title="Length Converter" description="Meters, km, miles, feet & more" path="/converter/length" />
                    <ToolCard icon={<IconWeight size={22} />} title="Weight Converter" description="Kg, pounds, ounces, tons & more" path="/converter/weight" />
                    <ToolCard icon={<IconThermometer size={22} />} title="Temperature Converter" description="Celsius, Fahrenheit, Kelvin" path="/converter/temperature" />
                    <ToolCard icon={<IconZap size={22} />} title="Speed Converter" description="m/s, km/h, mph, knots" path="/converter/speed" />
                    <ToolCard icon={<IconScale size={22} />} title="Area Converter" description="sq m, acres, hectares, sq ft" path="/converter/area" />
                    <ToolCard icon={<IconFlame size={22} />} title="Volume Converter" description="Liters, gallons, cups, ml" path="/converter/volume" />
                </div>

                <h3 className="section-subtitle">Engineering Converters</h3>
                <div className="tool-grid">
                    <ToolCard icon={<IconZap size={22} />} title="Power Converter" description="Watts, kW, horsepower" path="/converter/power" />
                    <ToolCard icon={<IconChart size={22} />} title="Pressure Converter" description="Bar, PSI, atm, Pascal" path="/converter/pressure" />
                    <ToolCard icon={<IconDatabase size={22} />} title="Data Converter" description="Bytes, KB, MB, GB, TB" path="/converter/data" />
                    <ToolCard icon={<IconCalendar size={22} />} title="Time Converter" description="Seconds, minutes, hours, days" path="/converter/time" />
                </div>

                <h3 className="section-subtitle">Academic Converters</h3>
                <div className="tool-grid">
                    <ToolCard icon={<IconPercent size={22} />} title="SGPA to Percentage" description="Convert SGPA using university formulas" path="/converter/sgpa" />
                    <ToolCard icon={<IconClipboard size={22} />} title="CGPA to Percentage" description="CBSE, VTU, Mumbai & more" path="/converter/cgpa-percentage" />
                    <ToolCard icon={<IconCalculator size={22} />} title="Number System" description="Binary, Octal, Decimal, Hex" path="/converter/number-system" />
                </div>
            </div>
        </div>
    );
}
