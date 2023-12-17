import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { startAddSeeker } from "../actions/seekerAction"
import UserProfile from "./UserProfile"

function AddSeeker() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const navigation = () => {
    navigate("/my-profile")
  }

  const submitForm = (formData) => {
    dispatch(startAddSeeker(formData, navigation))
  }
  return (
    <div>
      <UserProfile submitForm={submitForm} />
    </div>
  )
}
export default AddSeeker;
