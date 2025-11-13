import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkill, updateSkill, deleteSkill } from "../store/resumeSlice";

function SkillsPage() {
  const dispatch = useDispatch();
  const skills = useSelector((s) => s.resume.skills);

  const [skill, setSkill] = useState("");
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!skill.trim()) return alert("Enter a skill");

    if (editId) {
      dispatch(updateSkill({ id: editId, skill }));
      setEditId(null);
    } else {
      dispatch(addSkill({ skill }));
    }
    setSkill("");
  };

  return (
    <div>
      <h2>Skills</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          name="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="inputBox"
          placeholder="Skill"
          style={{ flex: 1 }}
        />

        <button id="add_skill" onClick={save}>
          {editId ? "Update" : "Add Skill"}
        </button>
      </div>

      <div data-testid="skills-count" style={{ display: "none" }}>
        {skills.length}
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {skills.map((item, idx) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "6px", display: "flex", gap: "10px" }}>
            <strong>{idx + 1}.</strong> {item.skill}
            <button onClick={() => { setEditId(item.id); setSkill(item.skill); }}>Edit</button>
            <button id="delete_skill" onClick={() => dispatch(deleteSkill(item.id))} style={{ background: "red", color: "white" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
