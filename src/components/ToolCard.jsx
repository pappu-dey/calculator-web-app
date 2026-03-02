import { Link } from "react-router-dom";

export default function ToolCard({ icon, title, description, path }) {
    return (
        <Link to={path} className="tool-card">
            <span className="tool-icon">{icon}</span>
            <div className="tool-info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </Link>
    );
}
