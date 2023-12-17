import {
  CLEAR_SEEKER,
  EDIT_SEEKER,
  GET_SEEKER,
  REMOVE_SEEKER,
  SET_SEEKER,
} from "../actions/seekerAction";

const initialUserState = {
  data: [],
};

export const seekerReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_SEEKER: {
      return { ...state, data: [action.payload] };
    }
    case GET_SEEKER: {
      return { ...state, data: action.payload };
    }
    case EDIT_SEEKER: {
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
    case REMOVE_SEEKER: {
      return {
        ...state,
        data: state.data.filter((ele) => ele._id != action.payload._id),
      };
    }
    case CLEAR_SEEKER: {
      return { ...state, data: [] };
    }

    default: {
      return { ...state };
    }
  }
};
