import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    fname: "",
    lname: "",
    phone: "",
    address: "",
    url:"",
    image: "",

  },
  education: [],
  skills: [],
  projects: [],
  social: [],
  page: 1,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },

    addEducation(state, action) {
      state.education.push({ id: Date.now(), ...action.payload });
    },
    updateEducation(state, action) {
      const index = state.education.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.education[index] = action.payload;
      }
    },
    deleteEducation(state, action) {
      state.education = state.education.filter(
        (item) => item.id !== action.payload
      );
    },

    addSkill(state, action) {
      state.skills.push({ id: Date.now(), ...action.payload });
    },
    updateSkill(state, action) {
      const index = state.skills.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    deleteSkill(state, action) {
      state.skills = state.skills.filter((item) => item.id !== action.payload);
    },

     addProject(state, action) {
      state.projects.push({ id: Date.now(), ...action.payload });
    },
    updateProject(state, action) {
      const index = state.projects.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter(
        (item) => item.id !== action.payload
      );
    },


      addSocial(state, action) {
      state.social.push({ id: Date.now(), ...action.payload });
    },
    updateSocial(state, action) {
      const index = state.social.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.social[index] = action.payload;
      }
    },
    deleteSocial(state, action) {
      state.social = state.social.filter(
        (item) => item.id !== action.payload
      );
    },
    


    setPage(state, action) {
      state.page = action.payload;
    },
    loadState(state, action) {
      return { ...state, ...action.payload };
    },
    reset(state) {
      return initialState;
    }
  },
});



export const {
  setProfile,
  addEducation, updateEducation, deleteEducation,
  addSkill, updateSkill, deleteSkill,
  addProject, updateProject, deleteProject,
  addSocial, updateSocial, deleteSocial,
  setPage,
  loadState,
  reset,
} = resumeSlice.actions;

export default resumeSlice.reducer;