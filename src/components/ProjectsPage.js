import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject, deleteProject } from "../store/resumeSlice";

function ProjectsPage() {
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.resume.projects);

  const [form, setForm] = useState({
    projectName: "",
    techStack: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.projectName || !form.techStack || !form.description)
      return alert("Fill all fields");

    if (editId) {
      dispatch(updateProject({ id: editId, ...form }));
      setEditId(null);
    } else {
      dispatch(addProject(form));
    }

    setForm({ projectName: "", techStack: "", description: "" });
  };

  return (
    <div>
      <h2>Mini Project</h2>

      <div style={{ display: "grid", gap: "15px" }}>
        <input name="projectName" value={form.projectName} onChange={change} className="inputBox" placeholder="Project Name" />
        <input name="techStack" value={form.techStack} onChange={change} className="inputBox" placeholder="Tech Stack" />
        <textarea name="description" value={form.description} onChange={change} className="inputBox" placeholder="Description"></textarea>
      </div>

      <button id="add_project" onClick={save} style={{ marginTop: "10px" }}>
        {editId ? "Update Project" : "Add Project"}
      </button>

      <div data-testid="projects-count" style={{ display: "none" }}>
        {projects.length}
      </div>

      <ul style={{ marginTop: "20px" }}>
        {projects.map((item, idx) => (
          <li key={item.id} style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px", borderRadius: "6px" }}>
            <strong>{idx + 1}. {item.projectName}</strong>
            <br />
            <em>{item.techStack}</em>
            <br />
            {item.description}

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => { setForm(item); setEditId(item.id); }}>Edit</button>
              <button id="delete" onClick={() => dispatch(deleteProject(item.id))} style={{ marginLeft: "10px", background: "red", color: "white" }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
