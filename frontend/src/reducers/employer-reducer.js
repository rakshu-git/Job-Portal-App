import {
  CLEAR_PROFILE,
  DELETE_EMPLOYERPROFILE,
  GET_EMPLOYER,
  SET_EMPLOYER,
  UPDATE_EMPLOYERPROFILE,
} from "../actions/employerAction";
import { SET_DESTROYALL2 } from "../actions/userAction";

const initialUserState = {
  data: [],
};

export const employerReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_DESTROYALL2: {
      return { ...state, userData: {} };
    }
    case SET_EMPLOYER: {
      return { ...state, data: [action.payload] };
    }
    case GET_EMPLOYER: {
      return { ...state, data: action.payload };
    }
    case UPDATE_EMPLOYERPROFILE: {
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
    case DELETE_EMPLOYERPROFILE: {
      return {
        ...state,
        data: state.data.filter((ele) => ele._id != action.payload._id),
      };
    }
    case CLEAR_PROFILE: {
      return { ...state, data: [] };
    }

    default: {
      return { ...state };
    }
  }
};
