import {
  SET_ALLUSER,
  SET_REMOVE,
  SET_USER,
  SET_ADMIN,
  SET_DESTROYALL,
  SET_JOBSEEKERS,
  SET_DESTROYUSER,
} from "../actions/userAction";

const initialUserState = {
  data: {},
  userData: [],
  jobseeker: [],
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, data: action.payload };
    }
    case SET_ALLUSER: {
      return { ...state, userData: action.payload };
    }
    case SET_REMOVE: {
      return {
        ...state,
        userData: state.userData.filter((ele) => ele._id != action.payload._id),
      };
    }
    case SET_ADMIN: {
      return { ...state, userData: action.payload };
    }
    case SET_DESTROYALL: {
      return { ...state, userData: [] };
    }
    case SET_JOBSEEKERS: {
      return { ...state, jobseeker: action.payload };
    }
    case SET_DESTROYUSER: {
      return { ...state, data: {} };
    }
    default: {
      return { ...state };
    }
  }
};
