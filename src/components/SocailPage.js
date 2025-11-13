import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSocial,
  updateSocial,
  deleteSocial
} from "../store/resumeSlice";

function SocialPage() {
  const dispatch = useDispatch();
  const socialList = useSelector((state) => state.resume.social);

  const [socialInput, setSocialInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Add or update
  const handleAdd = () => {
    if (!socialInput.trim()) {
      alert("Please enter a valid social media link or username!");
      return;
    }

    if (editingId) {
      dispatch(updateSocial({ id: editingId, Social: socialInput }));
      setEditingId(null);
    } else {
      dispatch(addSocial({ Social: socialInput }));
    }

    setSocialInput("");
  };

  // Edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setSocialInput(item.Social);
  };

  // Delete
  const handleDelete = (id) => {
    dispatch(deleteSocial(id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Social Media</h2>

      {/* Input section */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          name="Social"
          placeholder="Ex: https://linkedin.com/in/you"
          value={socialInput}
          onChange={(e) => setSocialInput(e.target.value)}
          className="inputBox"
          style={{ flex: 1 }}
        />

        <button
          id="add_social"
          onClick={handleAdd}
          style={{ padding: "8px 20px", cursor: "pointer" }}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <h3>Added Social Links</h3>

      {socialList.length === 0 && <p>No social links added yet.</p>}

      {/* Listing social links */}
      <ul style={{ marginTop: "15px" }}>
        {socialList.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{item.Social}</span>

            <div>
              <button
                style={{ marginRight: "10px" }}
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>

              <button
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

export default SocialPage;
