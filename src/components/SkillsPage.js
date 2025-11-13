import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  updateSkill,
  deleteSkill
} from "../store/resumeSlice";

function SkillsPage() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);

  const [skillInput, setSkillInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Add or update skill
  const handleAdd = () => {
    if (!skillInput.trim()) {
      alert("Enter a skill!");
      return;
    }

    if (editingId) {
      dispatch(updateSkill({ id: editingId, skill: skillInput }));
      setEditingId(null);
    } else {
      dispatch(addSkill({ skill: skillInput }));
    }

    setSkillInput("");
  };

  // Load skill for editing
  const handleEdit = (item) => {
    setEditingId(item.id);
    setSkillInput(item.skill);
  };

  // Delete skill
  const handleDelete = (id) => {
    dispatch(deleteSkill(id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Skills Sector</h2>

      {/* Skill Input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          name="skill"
          placeholder="Enter a skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="inputBox"
          style={{ flex: 1 }}
        />

        <button
          id="add_skill"
          onClick={handleAdd}
          style={{ padding: "8px 20px", cursor: "pointer" }}
        >
          {editingId ? "Update" : "Add Skill"}
        </button>
      </div>

      {/* Skills list */}
      <h3>Added Skills</h3>

      {skills.length === 0 && <p>No skills added yet.</p>}

      <div style={{ marginTop: "15px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {skills.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "10px 15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>{item.skill}</span>

            <button
              onClick={() => handleEdit(item)}
              style={{ padding: "5px 10px" }}
            >
              Edit
            </button>

            <button
              id="delete_skill"
              onClick={() => handleDelete(item.id)}
              style={{ padding: "5px 10px", backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
