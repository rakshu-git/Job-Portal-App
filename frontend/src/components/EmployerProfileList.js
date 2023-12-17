import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeleteEmployerProfile,
  startGetEmployerProfile,
} from "../actions/employerAction";
import EditEmployerProfile from "./EditEmployerProfile";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function EmployerProfileList() {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetEmployerProfile());
  }, []);

  const value = useSelector((state) => {
    return state.employer.data;
  });
 

  const handleEdit = (ele) => {
    setToggle(!toggle);
    setShow(ele);
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(startDeleteEmployerProfile(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="container mt-4">
      {toggle ? (
        <EditEmployerProfile data={show} handleEdit={handleEdit} />
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {value.map((ele) => (
            <div key={ele._id} className="col mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{ele.companyName}</h5>
                  <p className="card-text">Email: {ele.email}</p>
                  <p className="card-text">Location: {ele.location}</p>
                  <p className="card-text">Industry: {ele.industry}</p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      handleEdit(ele);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(ele._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerProfileList;
