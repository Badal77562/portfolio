const projects = [
  {
    title: "Forest Cover Dynamics",
    desc: "Forest change detection using Sentinel-2 imagery."
  },
  {
    title: "Forest Fragmentation",
    desc: "Landscape fragmentation assessment."
  },
  {
    title: "Tree Plantation Suitability",
    desc: "MCDM based plantation site selection."
  },
  {
    title: "ESV Assessment",
    desc: "Ecosystem Service Value estimation."
  }
];

export default function Projects() {
  return (
    <div className="projects">
      <h1>My Work</h1>

      <div className="grid">
        {projects.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}