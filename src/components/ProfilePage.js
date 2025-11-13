import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../store/resumeSlice";

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.resume.profile);

  const [form, setForm] = useState(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const save = () => {
    dispatch(setProfile(form));
    alert("Profile Saved!");
  };

  return (
    <div>
      <h2>Add your profile details</h2>

      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "1fr 1fr" }}>
        <input id="fname" name="fname" placeholder="First Name" className="inputBox" value={form.fname} onChange={change} />
        <input id="lname" name="lname" placeholder="Last Name" className="inputBox" value={form.lname} onChange={change} />
        <input id="phone" name="phone" placeholder="Phone" className="inputBox" value={form.phone} onChange={change} />
        <input id="address" name="address" placeholder="Address" className="inputBox" value={form.address} onChange={change} />
        
        <input id="url" name="url" placeholder="Website URL" className="inputBox" style={{ gridColumn: "span 2" }} value={form.url} onChange={change} />

        <div style={{ gridColumn: "span 2" }}>
          <input type="file" accept="image/*" onChange={uploadImage} />
          {form.image && (
            <img src={form.image} alt="" style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }} />
          )}
        </div>
      </div>

      <button style={{ marginTop: "15px" }} onClick={save}>
        Save Profile
      </button>
    </div>
  );
}

export default ProfilePage;
