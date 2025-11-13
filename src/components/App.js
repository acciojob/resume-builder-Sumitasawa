
import React from "react";
import './../styles/App.css';
import { useSelector,useDispatch } from "react-redux";
import {
  setPage,
  loadState,
  reset,
}from "../store/resumeSlice";
import ProfilePage from "./ProfilePage";
import EducationPage from "./EducationPage";
import SkillsPage from "./SkillsPage";
import ProjectsPage from "./ProjectsPage";
import SocailPage from "./SocailPage";
import ResumePreview from "./ResumePreview";
import Stepper from "./Stepper";

function App(){
  const dispatch=useDispatch();
  const page=useSelector((state)=>state.resume.page);
  const resume=useSelector((state)=>state.resume);

  const nextPage=()=>{
    if(page<6)dispatch(setPage(page+1));
    localStorage.setItem("resume_data",JSON.stringify(resume));
  };


  const backPage=()=>{
    if(page>1)dispatch(setPage(page-1));
  };

  const saveToLocal=()=>{
    localStorage.setItem("resume_data",JSON.stringify(resume));
    alert("Saved Successfully");
  }

  const LoadFromLocal=()=>{
    const data=localStorage.getItem("resume_data");
    if(!data) return alert("No saved Found");

    dispatch(loadState(JSON.parse(data)));
    alert("Loaded Succesfully");
  } 


  const resetAll=()=>{
    if(window.confirm("Reset all data")){
      dispatch(reset());
      localStorage.removeItem("resume_data");
    }
  };



  const renderPage=()=>{
    switch(page){
      case 1:
        return <ProfilePage/>
      case 2:
        return <EducationPage/>
      case 3:
        return <SkillsPage/>
      case 4:
        return <ProjectsPage/>
      case 5:
        return <SocailPage/>
      case 6:
        return <ResumePreview/>
      default:
        return <ProfilePage/>
    }
  }; 
  return (
     <div className="builder-container">

      <h1 className="heading">RESUME GENRATOR</h1>
      <Stepper className="stepper"/>

      {renderPage()}




      <div style={{ marginTop: "20px" }} className="button-div">
        <button id="back" onClick={backPage} disabled={page === 1}>
          Back
        </button>
        <button id="next" onClick={nextPage} disabled={page === 6}>
          Next
        </button>
        <button id="save_continue" onClick={saveToLocal}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}


export default App
