import BackButton from "../../components/BackButton";
import ToolCard from "../../components/ToolCard";
import { IconCalculator, IconScientific, IconPercent } from "../../components/Icons";

export default function Math() {
  return (
    <div className="main-content">
      <div className="container">
        <BackButton />
        <div className="page-header">
          <h2>Math Tools</h2>
          <p>Essential math calculators</p>
        </div>
        <div className="tool-grid">
          <ToolCard icon={<IconCalculator size={22} />} title="Basic Calculator" description="Add, subtract, multiply, divide" path="/math/basic" />
          <ToolCard icon={<IconScientific size={22} />} title="Scientific Calculator" description="Trigonometry, logs, powers & more" path="/math/scientific" />
          <ToolCard icon={<IconPercent size={22} />} title="Percentage Calculator" description="Find percentages quickly" path="/math/percentage" />
        </div>
      </div>
    </div>
  );
}