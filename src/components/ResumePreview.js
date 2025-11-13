import React from "react";
import { useSelector } from "react-redux";

function ResumePreview() {
  const resume = useSelector((state) => state.resume);

  return (
    <div
      id="resume-preview"
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        background: "white",
        maxWidth: "700px",
      }}
    >
      {/* ================= PROFILE ================= */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0 }}>
            {resume.profile.fname} {resume.profile.lname}
          </h2>
          <p style={{ margin: "3px 0" }}>{resume.profile.phone}</p>
          <p style={{ margin: "3px 0" }}>{resume.profile.address}</p>

          {resume.profile.url && (
            <a href={resume.profile.url} target="_blank" rel="noreferrer">
              {resume.profile.url}
            </a>
          )}
        </div>

        {resume.profile.image && (
          <img
            src={resume.profile.image}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* ================= EDUCATION ================= */}
      <h3 style={{ marginBottom: "10px" }}>Education</h3>
      {resume.education.length === 0 ? (
        <p>No education added yet.</p>
      ) : (
        <ul>
          {resume.education.map((item) => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <strong>{item.courseName}</strong> ({item.completionYear})  
              <br />
              {item.college}  
              <br />
              <em>Percentage:</em> {item.percentage}
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* ================= SKILLS ================= */}
      <h3 style={{ marginBottom: "10px" }}>Skills</h3>
      {resume.skills.length === 0 ? (
        <p>No skills added yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {resume.skills.map((item) => (
            <span
              key={item.id}
              style={{
                padding: "6px 12px",
                border: "1px solid #aaa",
                borderRadius: "6px",
                background: "#f8f8f8",
              }}
            >
              {item.skill}
            </span>
          ))}
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* ================= PROJECTS ================= */}
      <h3 style={{ marginBottom: "10px" }}>Projects</h3>
      {resume.projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        <ul>
          {resume.projects.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <strong>{item.projectName}</strong>
              <br />
              <em>{item.techStack}</em>
              <br />
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: "20px 0" }} />

      
      <h3 style={{ marginBottom: "10px" }}>Social Links</h3>
      {resume.social.length === 0 ? (
        <p>No social links added yet.</p>
      ) : (
        <ul>
          {resume.social.map((item) => (
            <li key={item.id}>{item.Social}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResumePreview;
