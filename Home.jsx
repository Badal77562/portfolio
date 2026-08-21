import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Remote Sensing & GIS Portfolio</h1>

        <p>
          GIS Analyst • Remote Sensing Specialist • Geospatial Researcher
        </p>

        <Link to="/projects" className="btn">
          Explore Projects
        </Link>
      </section>

      <section className="about">
        <h2>About Me</h2>

        <p>
          Specialized in Forest Cover Mapping, Land Use Land Cover Analysis,
          Ecosystem Service Valuation, Spatial Modeling, Drone Mapping and
          WebGIS Development.
        </p>
      </section>
    </div>
  );
}