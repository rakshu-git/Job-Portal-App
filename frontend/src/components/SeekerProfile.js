import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteSeeker, startGetSeeker } from "../actions/seekerAction";
import EditSeeker from "./EditSeeker";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function SeekerProfile() {
  const [toggle, setToggle] = useState("");
  const [show, setShow] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetSeeker());
  }, []);

  const value = useSelector((state) => {
    return state.seeker.data;
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
          onClick: () => dispatch(startDeleteSeeker(id)),
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
        <EditSeeker data={show} handleEdit={handleEdit} />
      ) : (
        <div className="row">
          {value.map((ele) => (
            <div className="col-md-4 mb-4" key={ele._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {ele.email}
                    <br />
                    <strong>Mobile:</strong> {ele.mobile}
                    <br />
                    <strong>Qualification:</strong> {ele.qualification}
                    <br />
                    <strong>Experience:</strong> {ele.experience}
                    <br />
                    <strong>Designation:</strong> {ele.designation}
                  </p>
                  <button
                    className="btn btn-primary mr-2"
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

export default SeekerProfile;
