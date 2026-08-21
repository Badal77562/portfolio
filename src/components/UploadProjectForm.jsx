import { useState } from "react";
import { X, Plus, Trash2, Upload, AlertCircle } from "lucide-react";

export default function UploadProjectForm({ editingProject, onSave, onCancel }) {
  const initialFormState = {
    title: "",
    shortDesc: "",
    fullDesc: "",
    tech: "",
    category: "GIS",
    date: "",
    featured: false,
    image: "",
    screenshots: [],
    workflow: [""],
    features: "",
    challenges: "",
    results: "",
  };

  const [formData, setFormData] = useState(() => {
    if (editingProject) {
      return {
        ...initialFormState,
        ...editingProject,
        tech: Array.isArray(editingProject.tech)
          ? editingProject.tech.join(", ")
          : editingProject.tech || "",
        features: Array.isArray(editingProject.features)
          ? editingProject.features.join(", ")
          : editingProject.features || "",
        workflow: editingProject.workflow && editingProject.workflow.length > 0
          ? editingProject.workflow
          : [""],
      };
    }
    return initialFormState;
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Base64 file loaders
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Cover image size exceeds 2MB limit.");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotsChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setError("");
    const loadedScreenshots = [];
    let oversizeFile = false;

    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        oversizeFile = true;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        loadedScreenshots.push(reader.result);
        if (loadedScreenshots.length === files.length) {
          setFormData((prev) => ({
            ...prev,
            screenshots: [...(prev.screenshots || []), ...loadedScreenshots],
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    if (oversizeFile) {
      setError("Some screenshots were skipped because they exceed the 2MB limit.");
    }
  };

  const removeScreenshot = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Workflow steps handlers
  const handleWorkflowStepChange = (index, value) => {
    const newWorkflow = [...formData.workflow];
    newWorkflow[index] = value;
    setFormData((prev) => ({ ...prev, workflow: newWorkflow }));
  };

  const addWorkflowStep = () => {
    setFormData((prev) => ({ ...prev, workflow: [...prev.workflow, ""] }));
  };

  const removeWorkflowStep = (index) => {
    const newWorkflow = formData.workflow.filter((_, idx) => idx !== index);
    setFormData((prev) => ({
      ...prev,
      workflow: newWorkflow.length === 0 ? [""] : newWorkflow,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDesc || !formData.date) {
      setError("Project Title, Short Description, and Project Date are required.");
      return;
    }

    // Process string lists into arrays
    const formattedProject = {
      ...formData,
      id: editingProject?.id || Date.now().toString(),
      tech: formData.tech
        ? formData.tech.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      features: formData.features
        ? formData.features.split(",").map((f) => f.trim()).filter(Boolean)
        : [],
      workflow: formData.workflow.map((w) => w.trim()).filter(Boolean),
    };

    onSave(formattedProject);
    setFormData(initialFormState);
    setError("");
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative space-y-8"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-2xl font-bold text-white font-outfit">
          {editingProject ? "Edit Project Details" : "Upload New GIS Project"}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-brand-red/10 border border-brand-red/20 rounded-2xl text-brand-red text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid segments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Flood Risk Zonation"
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-neutral-900 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all cursor-pointer"
          >
            <option value="GIS">GIS</option>
            <option value="Remote Sensing">Remote Sensing</option>
            <option value="Web GIS">Web GIS</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Python">Python</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Short Description */}
        <div className="flex flex-col space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Short Description *
          </label>
          <input
            type="text"
            name="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            placeholder="A single brief summary sentence shown on the project card grid."
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all"
            maxLength={180}
            required
          />
        </div>

        {/* Full Description */}
        <div className="flex flex-col space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Full Description / Case Study Narrative
          </label>
          <textarea
            name="fullDesc"
            value={formData.fullDesc}
            onChange={handleChange}
            rows={5}
            placeholder="Write a detailed description, listing methodology, source files, spatial layers used, and general mapping parameters."
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all resize-none"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Project Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all"
            required
          />
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center h-full pt-6">
          <label className="flex items-center gap-3 cursor-pointer group text-sm text-neutral-300">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 rounded bg-neutral-900 border border-white/10 text-brand-red focus:ring-brand-red/30 cursor-pointer"
            />
            <span className="group-hover:text-white transition-colors uppercase font-mono tracking-wider text-xs font-bold text-neutral-400">
              Featured Project (Display Ribbons)
            </span>
          </label>
        </div>

        {/* Technologies Used */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Technologies (Comma-separated)
          </label>
          <input
            type="text"
            name="tech"
            value={formData.tech}
            onChange={handleChange}
            placeholder="QGIS, ArcGIS Pro, Python, GDAL, DEM"
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all"
          />
        </div>

        {/* Key Features */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Project Features (Comma-separated)
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="High resolution LULC maps, Automated workflows, 3D viz"
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all"
          />
        </div>


        {/* GIS Workflow steps */}
        <div className="flex flex-col space-y-3 md:col-span-2 border-t border-white/5 pt-6">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
              GIS Methodology / Workflow Steps
            </label>
            <button
              type="button"
              onClick={addWorkflowStep}
              className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-brand-red hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>
          <div className="space-y-3">
            {formData.workflow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500 w-6">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleWorkflowStepChange(idx, e.target.value)}
                  placeholder={`Step ${idx + 1}: e.g. Acquire Sentinel-2 bands & perform atmospheric correction`}
                  className="flex-1 bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => removeWorkflowStep(idx)}
                  className="p-3 bg-white/5 hover:bg-brand-red/10 border border-white/10 hover:border-brand-red/20 text-neutral-400 hover:text-brand-red rounded-xl transition-all cursor-pointer"
                  title="Remove step"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Results */}
        <div className="flex flex-col space-y-2 md:col-span-2 border-t border-white/5 pt-6">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Key Technical Challenges
          </label>
          <textarea
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. Spatial resolution limitations, cloud cover percentages, or multi-sensor calibration inconsistencies."
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all resize-none"
          />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Methodology Results & Conservation Impact
          </label>
          <textarea
            name="results"
            value={formData.results}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. Accuracy index validation of 92%, mapping of 14 key conservation sites."
            className="bg-black/40 border border-white/10 focus:border-brand-red/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,42,42,0.1)] transition-all resize-none"
          />
        </div>

        {/* Cover image upload */}
        <div className="flex flex-col space-y-3 border-t border-white/5 pt-6">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Cover Image File (Max 2MB)
          </label>
          <div className="flex items-center gap-4">
            <div className="relative group/upload flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
              />
              <div className="bg-black/40 border border-dashed border-white/15 hover:border-brand-red/40 rounded-xl px-4 py-6 text-center text-sm text-neutral-400 hover:text-white transition-all flex flex-col items-center justify-center gap-2">
                <Upload className="w-6 h-6 text-neutral-500 group-hover/upload:text-brand-red transition-colors" />
                <span>Upload cover image</span>
              </div>
            </div>
            {formData.image && (
              <div className="w-24 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-neutral-900">
                <img
                  src={formData.image}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Screenshots upload */}
        <div className="flex flex-col space-y-3 border-t border-white/5 pt-6">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Gallery Screenshots (Max 2MB each)
          </label>
          <div className="relative group/upload">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleScreenshotsChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
            />
            <div className="bg-black/40 border border-dashed border-white/15 hover:border-brand-red/40 rounded-xl px-4 py-6 text-center text-sm text-neutral-400 hover:text-white transition-all flex flex-col items-center justify-center gap-2">
              <Upload className="w-6 h-6 text-neutral-500 group-hover/upload:text-brand-red transition-colors" />
              <span>Upload multiple screenshots</span>
            </div>
          </div>
        </div>

        {/* Screenshots Preview list */}
        {formData.screenshots && formData.screenshots.length > 0 && (
          <div className="md:col-span-2 flex flex-wrap gap-4 mt-2">
            {formData.screenshots.map((shot, idx) => (
              <div
                key={idx}
                className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10 group/preview bg-neutral-900"
              >
                <img
                  src={shot}
                  alt={`Screenshot ${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeScreenshot(idx)}
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-brand-red hover:text-white transition-opacity duration-200 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 border-t border-white/5 pt-6">
        <button
          type="submit"
          className="flex-1 py-4 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(255,42,42,0.25)] hover:shadow-[0_4px_20px_rgba(255,42,42,0.4)] hover:scale-[1.01] cursor-pointer"
        >
          {editingProject ? "Save Project Changes" : "Upload GIS Project"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
