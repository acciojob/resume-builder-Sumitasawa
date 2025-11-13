import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, loadState, reset } from "../store/resumeSlice";
import Stepper from "./Stepper";
import ProfilePage from "./ProfilePage";
import EducationPage from "./EducationPage";
import SkillsPage from "./SkillsPage";
import ProjectsPage from "./ProjectsPage";
import SocialPage from "./SocialPage";
import ResumePreview from "./ResumePreview";

function Builder() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.resume.page);
  const resume = useSelector((state) => state.resume);

  const nextPage = () => page < 6 && dispatch(setPage(page + 1));
  const backPage = () => page > 1 && dispatch(setPage(page - 1));

  const saveToLocal = () => {
    localStorage.setItem("resume_data", JSON.stringify(resume));
    alert("Saved!");
  };

  const loadFromLocal = () => {
    const data = localStorage.getItem("resume_data");
    if (!data) return alert("Nothing saved!");
    dispatch(loadState(JSON.parse(data)));
    alert("Loaded!");
  };

  const resetAll = () => {
    dispatch(reset());
    localStorage.removeItem("resume_data");
  };

  const renderPage = () => {
    if (page === 1) return <ProfilePage />;
    if (page === 2) return <EducationPage />;
    if (page === 3) return <SkillsPage />;
    if (page === 4) return <ProjectsPage />;
    if (page === 5) return <SocialPage />;
    return <ResumePreview />;
  };

  return (
    <div>
      <Stepper />
      {renderPage()}

      <div className="button-div makeStyles-footer-15">
        <button id="back" onClick={backPage} disabled={page === 1}>
          Back
        </button>

        <button id="next" onClick={nextPage} disabled={page === 6}>
          Next
        </button>

        <button
          id="save_continue"
          className="MuiButton-contained"
          onClick={saveToLocal}
        >
          Save & Continue
        </button>
      </div>

      <br /><br /><br />

      <button onClick={loadFromLocal}>Load Saved</button>
      <button onClick={resetAll} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
}

export default Builder;
