import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "../reducers/user-reducer";
import { employerReducer } from "../reducers/employer-reducer";
import { seekerReducer } from "../reducers/seeker-reducer";
import { jobPostReducer } from "../reducers/jobPost-reducer";

const configStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      employer: employerReducer,
      seeker: seekerReducer,
      jobPost: jobPostReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configStore;
