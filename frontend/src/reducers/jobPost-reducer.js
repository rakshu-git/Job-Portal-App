import {
  EDIT_EMPLOYEE_JOBPOST,
  EDIT_JOBPOST,
  GETALL_JOBPOST,
  GET_EMPLOYEE_JOBPOST,
  GET_JOBPOST,
  REMOVE_EMPLOYEE_JOBPOST,
  REMOVE_JOBPOST,
  SET_APPLICANT,
  SET_JOBPOST,
} from "../actions/jobPostAction";

const initialUserState = {
  data: [],
  jobSeekers: [],
};

export const jobPostReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_JOBPOST: {
      return { ...state, data: [action.payload, ...state.data] };
    }
    case GET_JOBPOST: {
      return { ...state, data: action.payload };
    }
    case EDIT_JOBPOST: {
      return {
        ...state,
        data: state.data.map((ele) => {
          if (ele._id == action.payload._id) {
            return action.payload;
          } else {
            return ele;
          }
        }),
      };
    }
    case REMOVE_JOBPOST: {
      return {
        ...state,
        data: state.data.filter((ele) => ele._id != action.payload._id),
      };
    }
    case GETALL_JOBPOST: {
      return { ...state, data: action.payload };
    }
    case SET_APPLICANT: {
      return {
        ...state,
        data: state.data.map((ele) => {
          if (ele._id == action.payload._id) {
            return action.payload;
          } else {
            return ele;
          }
        }),
      };
    }
    case GET_EMPLOYEE_JOBPOST: {
      return { ...state, jobSeekers: action.payload };
    }
    case EDIT_EMPLOYEE_JOBPOST: {
      return {
        ...state,
        jobSeekers: state.jobSeekers.map((ele) => {
          if (ele._id == action.payload._id) {
            return action.payload;
          } else {
            return ele;
          }
        }),
      };
    }
    case REMOVE_EMPLOYEE_JOBPOST: {
      return {
        ...state,
        jobSeekers: state.jobSeekers.map((ele) => {
          if (ele._id == action.payload._id) {
            return action.payload;
          } else {
            return ele;
          }
        }),
      };
    }
    default: {
      return { ...state };
    }
  }
};
