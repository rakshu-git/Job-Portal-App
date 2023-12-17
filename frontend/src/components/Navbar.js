import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedInUser} from "../actions/userAction";
import {
  setClearProfile,
  startGetEmployerProfile,
} from "../actions/employerAction";
import { setClearSeeker, startGetSeeker } from "../actions/seekerAction";

function Navbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetEmployerProfile());
    dispatch(startGetSeeker());
  }, []);

  const value = useSelector((state) => {
    return state.employer.data;
  });
 

  const value1 = useSelector((state) => {
    return state.seeker.data;
  });
 

  const user = useSelector((state) => {
    return state.user?.data;
  })
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({}));
    dispatch(setClearProfile());
    dispatch(setClearSeeker());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Job App
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          {Object.keys(user).length > 0 ? (
            <ul className="navbar-nav ml-auto">
              {(user.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/employers-list">
                      Employers Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/jobseekers-list">
                      Jobseekers Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-account">
                      My Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )) ||
                (user.role === "jobseeker" && (
                  <>
                    {Object.keys(value1).length <= 0 && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/user-profile">
                          Create Profile
                        </Link>
                      </li>
                    )}
                    {Object.keys(value1).length > 0 && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/my-profile">
                          My Profile
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link className="nav-link" to="/job-openings">
                        Job Openings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )) ||
                (user.role === "employer" && (
                  <>
                    {Object.keys(value).length <= 0 && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/employers-profile">
                          Create Profile
                        </Link>
                      </li>
                    )}
                    {Object.keys(value).length > 0 && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/view-profile">
                          My Profile
                        </Link>
                      </li>
                    )}

                    <li className="nav-item">
                      <Link className="nav-link" to="/create-job">
                        Create Job
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/list-job">
                        List Job
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/application">
                        Applications
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ))}
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
