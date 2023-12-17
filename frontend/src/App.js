import Applications from "./components/Applications";
import EmployersList from "./components/EmployersList";
import JobseekersList from "./components/JobseekersList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import JobOpenings from "./components/JobOpenings";
import MyAccount from "./components/MyAccount";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetAccount } from "./actions/userAction";
import EmployerProfileList from "./components/EmployerProfileList";
import AddEmployerProfile from "./components/AddEmployerProfile";
import SeekerProfile from "./components/SeekerProfile";
import AddSeeker from "./components/AddSeeker";
import ListJob from "./components/ListJob";
import AddJob from "./components/AddJob";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(startGetAccount());
    }
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-profile" element={<SeekerProfile />} />
        <Route path="/jobseekers-list" element={<JobseekersList />} />
        <Route path="/employers-list" element={<EmployersList />} />
        <Route path="/employers-profile" element={<AddEmployerProfile />} />
        <Route path="/view-profile" element={<EmployerProfileList />} />
        <Route path="/application" element={<Applications />} />
        <Route path="/create-job" element={<AddJob />} />
        <Route path="/list-job" element={<ListJob />} />
        <Route path="/user-profile" element={<AddSeeker />} />
        <Route path="/job-openings" element={<JobOpenings />} />
      </Routes>
    </div>
  );
}

export default App;
