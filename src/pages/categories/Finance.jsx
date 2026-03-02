import BackButton from "../../components/BackButton";
import ToolCard from "../../components/ToolCard";
import { IconBank, IconTrendUp, IconReceipt } from "../../components/Icons";

export default function Finance() {
  return (
    <div className="main-content">
      <div className="container">
        <BackButton />
        <div className="page-header">
          <h2>Finance Tools</h2>
          <p>Manage your money smarter</p>
        </div>
        <div className="tool-grid">
          <ToolCard icon={<IconBank size={22} />} title="EMI Calculator" description="Calculate your loan EMI" path="/finance/emi" />
          <ToolCard icon={<IconTrendUp size={22} />} title="SIP Calculator" description="Plan your SIP investments" path="/finance/sip" />
          <ToolCard icon={<IconReceipt size={22} />} title="GST Calculator" description="Calculate GST amounts" path="/finance/gst" />
        </div>
      </div>
    </div>
  );
}