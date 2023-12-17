import { useDispatch } from "react-redux";
import { startEditEmployerProfile } from "../actions/employerAction";
import EmployerProfile from "./EmployerProfile";

function EditEmployerProfile(props) {
  const { data, handleEdit } = props;

  const dispatch = useDispatch();

  const submitForm = (formData) => {
    dispatch(startEditEmployerProfile(formData, handleEdit, data._id));
  };

  return (
    <div>
      <EmployerProfile
        submitForm={submitForm}
        {...data}
        isEdit={true}
        handleEdit={handleEdit}
      />
    </div>
  );
}
export default EditEmployerProfile;
