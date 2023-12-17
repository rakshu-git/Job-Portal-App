import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteJobPost, startGetJobPost } from "../actions/jobPostAction";
import EditJob from "./EditJob";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"

function ListJob() {
  const [toggle, setToggle] = useState("");
  const [show, setShow] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetJobPost());
  }, []);

  const value = useSelector((state) => {
    return state.jobPost.data;
  });

  const handleEdit = (ele) => {
    setToggle(!toggle);
    setShow(ele);
  };

  const handleDelete=(id)=>{
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>  dispatch(startDeleteJobPost(id))
        },
        {
          label: "No",
          onClick: () => {}, 
        },
      ],
    });
   
  }
  return (
    <div className="container mt-4">
      {toggle ? (
        <EditJob data={show} handleEdit={handleEdit} />
      ) : (
       <div>
       {Object.keys(value).length>0 ? (
        
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Designation</th>
              <th>Required Experience</th>
              <th>Salary (CTC)</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {value.map((ele, index) => (
              <tr key={index}>
                <td>{ele.designation}</td>
                <td>{ele.requiredExperience}</td>
                <td>{ele.salary}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleEdit(ele);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
           ):(
            <div>
            <h1>No data</h1>
            </div>
           )     }
   </div>
      )}
    </div>
  );
}

export default ListJob;
