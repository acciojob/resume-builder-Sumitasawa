import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSocial, updateSocial, deleteSocial } from "../store/resumeSlice";

function SocialPage() {
  const dispatch = useDispatch();
  const social = useSelector((s) => s.resume.social);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!input.trim()) return alert("Enter link");

    if (editId) {
      dispatch(updateSocial({ id: editId, Social: input }));
      setEditId(null);
    } else {
      dispatch(addSocial({ Social: input }));
    }

    setInput("");
  };

  return (
    <div>
      <h2>Social Links</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          name="Social"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="inputBox"
          placeholder="Enter Social Link"
          style={{ flex: 1 }}
        />

        <button id="add_social" onClick={save}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

     <h3>Added Social Links</h3>

<div className="visible-counter">{social.length}</div>


      <ul style={{ marginTop: "15px" }}>
        {social.map((item, idx) => (
          <li key={item.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>
            <strong>{idx + 1}.</strong> {item.Social}

            <div>
              <button onClick={() => { setInput(item.Social); setEditId(item.id); }}>Edit</button>
              <button onClick={() => dispatch(deleteSocial(item.id))} style={{ marginLeft: "10px", background: "red", color: "white" }}>
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
