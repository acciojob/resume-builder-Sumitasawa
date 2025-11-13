import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEducation, updateEducation, deleteEducation } from "../store/resumeSlice";

function EducationPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.resume.education);

  const [form, setForm] = useState({
    courseName: "",
    completionYear: "",
    college: "",
    percentage: "",
  });

  const [editId, setEditId] = useState(null);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.courseName || !form.college)
      return alert("Fill all fields");

    if (editId) {
      dispatch(updateEducation({ id: editId, ...form }));
      setEditId(null);
    } else {
      dispatch(addEducation(form));
    }

    setForm({
      courseName: "",
      completionYear: "",
      college: "",
      percentage: "",
    });
  };

  return (
    <div>
      <h2>Education Details</h2>

      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "1fr 1fr" }}>
        <input name="courseName" placeholder="Course" value={form.courseName} onChange={change} className="inputBox" />
        <input name="completionYear" placeholder="Year" value={form.completionYear} onChange={change} className="inputBox" />
        <input name="college" placeholder="College" value={form.college} onChange={change} className="inputBox" style={{ gridColumn: "span 2" }} />
        <input name="percentage" placeholder="Percentage" value={form.percentage} onChange={change} className="inputBox" />
      </div>

      <button id="add_education" onClick={save} style={{ marginTop: "10px" }}>
        {editId ? "Update" : "Add Education"}
      </button>

      <div data-testid="education-count" style={{ display: "none" }}>
        {items.length}
      </div>

      <ul style={{ marginTop: "20px" }}>
        {items.map((item, idx) => (
          <li
            key={item.id}
            style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px", borderRadius: "6px" }}
          >
            <strong>{idx + 1}. {item.courseName}</strong> ({item.completionYear})
            <br />
            {item.college}
            <br />
            {item.percentage}

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => { setForm(item); setEditId(item.id); }}>Edit</button>
              <button id="delete" onClick={() => dispatch(deleteEducation(item.id))} style={{ marginLeft: "10px", background: "red", color: "white" }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EducationPage;
