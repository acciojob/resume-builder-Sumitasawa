import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  updateProject,
  deleteProject
} from "../store/resumeSlice";

function ProjectsPage() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.resume.projects);

  const [form, setForm] = useState({
    projectName: "",
    techStack: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update
  const handleAdd = () => {
    const { projectName, techStack, description } = form;

    if (!projectName || !techStack || !description) {
      alert("Please fill all fields!");
      return;
    }

    if (editingId) {
      // Update existing
      dispatch(updateProject({ id: editingId, ...form }));
      setEditingId(null);
    } else {
      // Add new
      dispatch(addProject(form));
    }

    // Reset form
    setForm({ projectName: "", techStack: "", description: "" });
  };

  // Edit a specific project
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      projectName: item.projectName,
      techStack: item.techStack,
      description: item.description,
    });
  };

  // Delete
  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Add your Mini Projects</h2>

      {/* Form */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>

        <input
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          className="inputBox"
        />

        <input
          name="techStack"
          placeholder="Tech Stack (e.g., React, Node, MongoDB)"
          value={form.techStack}
          onChange={handleChange}
          className="inputBox"
        />

        <textarea
          name="description"
          placeholder="Short project description"
          value={form.description}
          onChange={handleChange}
          className="inputBox"
          rows="3"
        ></textarea>
      </div>

      {/* Add Button */}
      <button
        id="add_project"
        onClick={handleAdd}
        style={{ padding: "8px 20px", cursor: "pointer", marginTop: "10px" }}
      >
        {editingId ? "Update Project" : "Add Project"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* Project List */}
      <h3>Added Projects</h3>

      {projectList.length === 0 && <p>No projects added yet.</p>}

      <ul style={{ marginTop: "15px" }}>
        {projectList.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              marginBottom: "12px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{item.projectName}</strong>
              <br />
              <em>{item.techStack}</em>
              <br />
              <span>{item.description}</span>
            </div>

            <div>
              <button
                style={{ marginRight: "10px" }}
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>

              <button
                id="delete"
                onClick={() => handleDelete(item.id)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
