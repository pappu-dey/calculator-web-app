import { Link } from "react-router-dom";

export default function CategoryCard({ icon, title, path }) {
  return (
    <Link to={path} className="card">
      <span className="card-icon">{icon}</span>
      {title}
    </Link>
  );
}