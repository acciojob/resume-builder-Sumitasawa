import React from "react";
import { useSelector } from "react-redux";

function ResumePreview() {
  const r = useSelector((s) => s.resume);

  return (
    <div id="resume-preview" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "6px", background: "white" }}>
      {/* PROFILE */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>{r.profile.fname} {r.profile.lname}</h2>
          <p>{r.profile.phone}</p>
          <p>{r.profile.address}</p>
          <a href={r.profile.url}>{r.profile.url}</a>
        </div>

        {r.profile.image && (
          <img src={r.profile.image} alt="" style={{ width: "120px", height: "120px", borderRadius: "8px" }} />
        )}
      </div>

      <hr />

      {/* EDUCATION */}
      <h3>Education</h3>
      <ul>
        {r.education.map((e) => (
          <li key={e.id}>
            {e.courseName} ({e.completionYear})  
            <br />{e.college}  
            <br />Percentage: {e.percentage}
          </li>
        ))}
      </ul>

      <hr />

      {/* SKILLS */}
      <h3>Skills</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {r.skills.map((s) => (
          <div key={s.id} style={{ padding: "6px 12px", border: "1px solid #aaa", borderRadius: "6px" }}>
            {s.skill}
          </div>
        ))}
      </div>

      <hr />

      {/* PROJECTS */}
      <h3>Projects</h3>
      <ul>
        {r.projects.map((p) => (
          <li key={p.id}>
            <strong>{p.projectName}</strong>
            <br />
            <em>{p.techStack}</em>
            <br />
            {p.description}
          </li>
        ))}
      </ul>

      <hr />

      {/* SOCIAL */}
      <h3>Social Links</h3>
      <ul>
        {r.social.map((s) => (
          <li key={s.id}>{s.Social}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResumePreview;
