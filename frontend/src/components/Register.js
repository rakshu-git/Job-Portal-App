import React, { useEffect, useState } from "react";
import validator from 'validator';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverFormErrors,setServerFormErrors] = useState([])
  const errors={}

  const dispatch = useDispatch();

  const navigation = (errors) => {
    if(errors){
      setServerFormErrors(errors)
    }
    else{

      navigate('/login')
    }
  }

  useEffect(() => {
    (
      async () => {
           try {
             const response = await axios.get('http://localhost:3220/api/users/isAdmin');
             if (response.data === 0) {
               setIsAdmin(!isAdmin);
             }
           } catch (e) {
             console.log(e);
          }
      }
    )()
  
  }, []);

  const handleValidation = () => {
    

    if (validator.isEmpty(username)) {
      errors.username = "Username is required";
    }

    if (validator.isEmpty(email)) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Password is required";
    }

    if (validator.isEmpty(mobile)) {
      errors.mobile = "Mobile Number is required";
    } else if (!validator.isLength(mobile, { min: 10, max: 10 })) {
      errors.mobile = "Mobile number must be min 10 and max 10 digits";
    } else if (!validator.isNumeric(mobile)) {
      errors.mobile = "Invalid mobile number it should be numeric";
    }

    if (validator.isEmpty(role) && !isAdmin) {
      errors.role = "Role is required";
    }

   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidation();

    if (Object.keys(errors).length === 0) {
      const formData = {
        username: username,
        email: email,
        password: password,
        mobile: mobile,
        role: role
      };

      dispatch(startRegisterUser(formData, navigation));
    }else{
      setFormErrors(errors)
    }
  };

  return (
    <div className="container mt-5">
    {serverFormErrors.length>0 &&<ul className="alert alert-danger">
        {serverFormErrors.map(ele=><li>{ele.msg}</li>)}
      </ul>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <h1 className="mb-4">Register here</h1>
            <div className="form-group">
              <label>UserName</label>
              <input type="text" value={username} className="form-control" placeholder="Enter your username" onChange={(e) => { setUserName(e.target.value) }} />
              {formErrors?.username && <span className="text-danger">{formErrors?.username}</span>}
            </div>
            <br/>
            <div className="form-group">
              <label>Email</label>
              <input type="text" value={email} className="form-control" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
              {formErrors?.email && <span className="text-danger">{formErrors?.email}</span>}
            </div>
            <br/>
            <div className="form-group">
              <label>Mobile</label>
              <input type="text" value={mobile} className="form-control" placeholder="Enter your mobile no" onChange={(e) => { setMobile(e.target.value) }} />
              {formErrors?.mobile && <span className="text-danger">{formErrors?.mobile}</span>}
            </div>
            <br/>
            {!isAdmin && (
              
                <div className="form-group">
                  <label>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
                    <option value="">Select Role</option>
                    <option value="jobseeker">Job-Seeker</option>
                    <option value='employer'>Employer</option>
                  </select>
                  {formErrors?.role && <span className="text-danger">{formErrors?.role}</span>}
                  <br/>
                </div>
                  
            )}
          
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} className="form-control" placeholder="Enter your Password" onChange={(e) => { setPassword(e.target.value) }} />
              {formErrors?.password && <span className="text-danger">{formErrors?.password}</span>}
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
