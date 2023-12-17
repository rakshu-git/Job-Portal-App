import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddApplicant,
  startGetAllJobPosts,
  startSearchJobPosts,
} from "../actions/jobPostAction";

function JobOpenings() {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetAllJobPosts());
    searchInputRef.current.focus()
  }, []);

  const value = useSelector((state) => {
    return state.jobPost.data;
  });


  const user = useSelector((state) => {
    return state.user.data;
  });


  const handleApply = (id) => {
    dispatch(startAddApplicant(id, "pending"));
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const delayedSearch = useRef(
    debounce((value) => {
      dispatch(startSearchJobPosts(value));
    }, 500) 
  ).current;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    delayedSearch(e.target.value)
  };

  return (
    <div className="container mt-4">
      {Object.keys(value).length > 0 ? (
        <div>
          <div className="mb-3">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              className="form-control"
              ref={searchInputRef}
            />
          </div>
          <div className="row">
            {value.map((ele, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ele.companyName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Designation: {ele.designation}
                    </h6>
                    <p className="card-text">Location: {ele.location}</p>
                    <p className="card-text">Salary: {ele.salary} CTC</p>
                    <p className="card-text">
                      Experience: {ele.requiredExperience} Year
                    </p>

                    {ele.applicants.find(
                      (ele1) => ele1.applicant === user.id
                    ) ? (
                      <div>
                        {ele.applicants.map((app) => {
                          if (app.applicant === user.id) {
                            return (
                              <div>
                                {app.status == "accept" && (
                                  <button className="btn btn-success">
                                    Accepted
                                  </button>
                                )}
                                {app.status == "reject" && (
                                  <button className="btn btn-danger">
                                    Rejected
                                  </button>
                                )}
                                {app.status == "pending" && (
                                  <button className="btn btn-primary">
                                    Pending
                                  </button>
                                )}
                              </div>
                            );
                          } else {
                          }
                        })}
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleApply(ele._id);
                        }}
                      >
                        {" "}
                        Apply here
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Jobs Not Found</h1>
      )}
    </div>
  );
}

export default JobOpenings;
