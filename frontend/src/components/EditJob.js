import { useDispatch } from "react-redux";
import CreateJob from "./CreateJob";
import { startEditJob } from "../actions/jobPostAction";

function EditJob(props) {
  const { data, handleEdit } = props;

  const dispatch = useDispatch();

  const submitForm = (formData) => {
    dispatch(startEditJob(formData, handleEdit, data._id));
  };

  return (
    <div>
      <CreateJob
        submitForm={submitForm}
        {...data}
        isEdit={true}
        handleEdit={handleEdit}
      />
    </div>
  );
}
export default EditJob;
