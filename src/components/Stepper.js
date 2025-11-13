import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../store/resumeSlice";
import './../styles/App.css';
const steps = [
  "Profile Section",
  "Education Section",
  "Skills Sector",
  "Mini Project",
  "Social"
];

function Stepper() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.resume.page);

  return (
    <div style={styles.container} className="stepper">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === page;

        return (
          <div key={index} style={styles.stepWrapper}>
            <div
              onClick={() => dispatch(setPage(stepNumber))}
              style={{
                ...styles.circle,
                backgroundColor: isActive ? "#3b50ce" : "#bfbfbf",
                color: "white",
              }}
            >
              {stepNumber}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "black" : "#888",
              }}
            >
              {label}
            </div>
            {index < steps.length - 1 && <div style={styles.line} />}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
    overflowX: "auto",
    paddingBottom: 5,
  },
  stepWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "bold",
  },
  line: {
    width: 80,
    height: 2,
    backgroundColor: "#ccc",
    margin: "0 15px",
  },
};

export default Stepper;
