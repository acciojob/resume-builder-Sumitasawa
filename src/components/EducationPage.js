import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  updateEducation,
  deleteEducation
} from "../store/resumeSlice";

function EducationPage() {
  const dispatch = useDispatch();
  const educationList = useSelector((state) => state.resume.education);

  const [form, setForm] = useState({
    courseName: "",
    completionYear: "",
    college: "",
    percentage: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update entry
  const handleAdd = () => {
    if (
      !form.courseName ||
      !form.completionYear ||
      !form.college ||
      !form.percentage
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      // Update existing entry
      dispatch(
        updateEducation({
          id: editingId,
          ...form,
        })
      );
      setEditingId(null);
    } else {
      // Add new entry
      dispatch(addEducation(form));
    }

    // Reset form
    setForm({
      courseName: "",
      completionYear: "",
      college: "",
      percentage: "",
    });
  };

  // Load data into form for editing
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      courseName: item.courseName,
      completionYear: item.completionYear,
      college: item.college,
      percentage: item.percentage,
    });
  };

  // Delete
  const handleDelete = (id) => {
    dispatch(deleteEducation(id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Add your education details</h2>

      {/* Form */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          name="courseName"
          placeholder="Course Name"
          value={form.courseName}
          onChange={handleChange}
          className="inputBox"
        />

        <input
          name="completionYear"
          placeholder="Completion Year (e.g., 2024)"
          value={form.completionYear}
          onChange={handleChange}
          className="inputBox"
        />

        <input
          name="college"
          placeholder="College Name"
          value={form.college}
          onChange={handleChange}
          className="inputBox"
          style={{ gridColumn: "span 2" }}
        />

        <input
          name="percentage"
          placeholder="Percentage / CGPA"
          value={form.percentage}
          onChange={handleChange}
          className="inputBox"
        />
      </div>

      <button
        id="add_education"
        onClick={handleAdd}
        style={{ padding: "8px 20px", cursor: "pointer" }}
      >
        {editingId ? "Update Education" : "Add Education"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* Education list */}
      <h3>Added Education</h3>

      {educationList.length === 0 && <p>No education added yet.</p>}

      <ul style={{ marginTop: "15px" }}>
        {educationList.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{item.courseName}</strong> ({item.completionYear})
              <br />
              {item.college}
              <br />
              Percentage: {item.percentage}
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

export default EducationPage;
