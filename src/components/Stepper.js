import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../store/resumeSlice";

const steps = [
  "Profile Section",
  "Education Section",
  "Skills Sector",
  "Mini Project",
  "Social",
];

function Stepper() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.resume.page);

  return (
    <div className="stepper">
      {steps.map((label, index) => {
        const step = index + 1;
        const active = step === page;
        return (
          <div key={index} className="step-wrapper">
            <div
              className={`step-circle ${active ? "active" : ""}`}
              onClick={() => dispatch(setPage(step))}
            >
              {step}
            </div>
            <span className={`step-label ${active ? "active-label" : ""}`}>
              {label}
            </span>
            {index < 4 && <div className="step-line"></div>}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
