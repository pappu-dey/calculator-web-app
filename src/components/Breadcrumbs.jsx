import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();

    // Don't show breadcrumbs on home page
    if (location.pathname === "/") {
        return null;
    }

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs-container">
            <ol className="breadcrumbs-list">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    // Format the name (e.g., 'emi-calculator' -> 'EMI Calculator', 'finance' -> 'Finance')
                    const formattedName = name
                        .split('-')
                        .map(word => {
                            if (word.toLowerCase() === 'bmi' || word.toLowerCase() === 'emi' || word.toLowerCase() === 'gst' || word.toLowerCase() === 'sip' || word.toLowerCase() === 'cgpa' || word.toLowerCase() === 'sgpa' || word.toLowerCase() === 'gpa') {
                                return word.toUpperCase();
                            }
                            return word.charAt(0).toUpperCase() + word.slice(1);
                        })
                        .join(' ');

                    return (
                        <li key={name} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? "page" : undefined}>
                            {isLast ? (
                                <span>{formattedName}</span>
                            ) : (
                                <Link to={routeTo}>{formattedName}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
