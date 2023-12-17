import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startEditApplicant,
  startGetEmployeeJobPost,
  startRemoveApplicant,
} from "../actions/jobPostAction";

function Applications() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetEmployeeJobPost());
  }, []);

  const jobSeekers = useSelector((state) => state.jobPost.jobSeekers);
 
  const handleRemove = (id, applicantId) => {
    dispatch(startRemoveApplicant(id, applicantId));
  };

  const handleAccept = (id, applicantId) => {
    dispatch(startEditApplicant(id, applicantId, "accept"));
  };

  const handleReject = (id, applicantId) => {
    dispatch(startEditApplicant(id, applicantId, "reject"));
  };

  return (
    <div className="container mt-4">
      {jobSeekers.some((job) => job.applicants.length > 0) ? (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {jobSeekers.map((job) =>
                job.applicants.map((ele) => (
                  <tr key={ele.id}>
                    <td>{ele.applicant.username}</td>
                    <td>{ele.applicant.mobile}</td>
                    <td>{ele.applicant.email}</td>
                    <td>{job.designation}</td>
                    <td>{job.requiredExperience}</td>
                    <td>
                      {ele.status === "pending" && (
                        <button
                          className="btn btn-success mr-2"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            handleAccept(job._id, ele._id);
                          }}
                        >
                          Accept
                        </button>
                      )}
                      {ele.status === "pending" && (
                        <button
                          className="btn btn-danger mr-2"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            handleReject(job._id, ele._id);
                          }}
                        >
                          Reject
                        </button>
                      )}
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "20px" }}
                        onClick={() => {
                          handleRemove(job._id, ele._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No Applications Found</h1>
      )}
    </div>
  );
}

export default Applications;
