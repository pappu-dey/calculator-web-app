import BackButton from "../../components/BackButton";
import ToolCard from "../../components/ToolCard";
import { IconCalendar, IconTag } from "../../components/Icons";

export default function Daily() {
  return (
    <div className="main-content">
      <div className="container">
        <BackButton />
        <div className="page-header">
          <h2>Daily Tools</h2>
          <p>Handy everyday calculators</p>
        </div>
        <div className="tool-grid">
          <ToolCard icon={<IconCalendar size={22} />} title="Age Calculator" description="Calculate your exact age" path="/daily/age" />
          <ToolCard icon={<IconTag size={22} />} title="Discount Calculator" description="Find discounted prices" path="/daily/discount" />
        </div>
      </div>
    </div>
  );
}