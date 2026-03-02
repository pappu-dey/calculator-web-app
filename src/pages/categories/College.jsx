import BackButton from "../../components/BackButton";
import ToolCard from "../../components/ToolCard";
import { IconChart, IconClipboard } from "../../components/Icons";

export default function College() {
  return (
    <div className="main-content">
      <div className="container">
        <BackButton />
        <div className="page-header">
          <h2>College Tools</h2>
          <p>Academic calculators for students</p>
        </div>
        <div className="tool-grid">
          <ToolCard icon={<IconChart size={22} />} title="GPA Calculator" description="Calculate your semester GPA" path="/college/gpa" />
          <ToolCard icon={<IconClipboard size={22} />} title="CGPA Calculator" description="Calculate cumulative GPA" path="/college/cgpa" />
        </div>
      </div>
    </div>
  );
}