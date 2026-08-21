import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Remote Sensing & GIS</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
      </div>
    </nav>
  );
}