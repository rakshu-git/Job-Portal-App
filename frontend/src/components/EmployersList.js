import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetUserDetails,
  startRemoveUser,
  startSearch,
} from "../actions/userAction";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";

function EmployersList() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetUserDetails());
  }, []);

  const value = useSelector((state) => {
    return state.user.userData;
  });
 

  const val = value.filter((ele) => {
    return ele.role === "employer";
  });
 

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(startSearch(e.target.value));
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this employer?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(startRemoveUser(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="container mt-5">
      {Object.keys(val).length > 0 ? (
        <div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search Name"
          />
          <table className="table table-bordered table-responsive-md">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {val.map((ele) => (
                <tr key={ele._id}>
                  <td>{ele.username}</td>
                  <td>{ele.email}</td>
                  <td>{ele.mobile}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(ele._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No employer Available</h1>
      )}
    </div>
  );
}

export default EmployersList;
