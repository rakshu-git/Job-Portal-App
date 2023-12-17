import { useDispatch } from "react-redux"
import CreateJob from "./CreateJob"
import { startAddJobPost } from "../actions/jobPostAction"
import { useNavigate } from "react-router-dom"

function AddJob() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const navigation = () => {
    navigate("/list-job")
  }

  const submitForm = (formData) => {
    dispatch(startAddJobPost(formData, navigation))
  }

  return (
    <div>
      <CreateJob submitForm={submitForm} />
    </div>
  )
}
export default AddJob;
