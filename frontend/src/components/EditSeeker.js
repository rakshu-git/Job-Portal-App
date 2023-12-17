import { useDispatch } from "react-redux";
import UserProfile from "./UserProfile";
import { startEditSeeker } from "../actions/seekerAction";

function EditSeeker(props) {
  const { data, handleEdit } = props;

  const dispatch = useDispatch();

  const submitForm = (formData) => {
    dispatch(startEditSeeker(formData, handleEdit, data._id));
  };

  return (
    <div>
      <UserProfile
        submitForm={submitForm}
        {...data}
        isEdit={true}
        handleEdit={handleEdit}
      />
    </div>
  );
}
export default EditSeeker;
