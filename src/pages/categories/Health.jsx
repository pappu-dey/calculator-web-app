import BackButton from "../../components/BackButton";
import ToolCard from "../../components/ToolCard";
import { IconScale, IconFlame } from "../../components/Icons";

export default function Health() {
  return (
    <div className="main-content">
      <div className="container">
        <BackButton />
        <div className="page-header">
          <h2>Health Tools</h2>
          <p>Track your health metrics</p>
        </div>
        <div className="tool-grid">
          <ToolCard icon={<IconScale size={22} />} title="BMI Calculator" description="Check your Body Mass Index" path="/health/bmi" />
          <ToolCard icon={<IconFlame size={22} />} title="Calorie Calculator" description="Find your daily calorie needs" path="/health/calorie" />
        </div>
      </div>
    </div>
  );
}