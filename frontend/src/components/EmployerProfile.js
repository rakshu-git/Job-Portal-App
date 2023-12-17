import { useState } from "react";
import validator from "validator";

function EmployerProfile(props) {
  const {
    submitForm,
    companyName: c,
    email: e,
    location: l,
    industry: i,
    handleEdit,
    isEdit,
  } = props;
  const [companyName, setCompanyName] = useState(c ? c : "");
  const [email, setEmail] = useState(e ? e : "");
  const [location, setLocation] = useState(l ? l : "");
  const [industry, setIndustry] = useState(i ? i : "");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const handleValidation = () => {
    if (validator.isEmpty(companyName)) {
      errors.companyName = "Company Name is required";
    }

    if (validator.isEmpty(email)) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (validator.isEmpty(location)) {
      errors.location = "Location is required";
    }

    if (validator.isEmpty(industry)) {
      errors.industry = "Industry is required";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation();

    if (Object.keys(errors).length === 0) {
      const formData = {
        companyName: companyName,
        email: email,
        location: location,
        industry: industry,
      };

      submitForm(formData);
    } else {
      setFormErrors(errors);
    }
  };

  const handleCancelEdit = () => {
    handleEdit();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors?.companyName && "is-invalid"
                    }`}
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  {formErrors?.companyName && (
                    <div className="invalid-feedback">
                      {formErrors?.companyName}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors?.email && "is-invalid"
                    }`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {formErrors?.email && (
                    <div className="invalid-feedback">{formErrors?.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors?.location && "is-invalid"
                    }`}
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {formErrors?.location && (
                    <div className="invalid-feedback">
                      {formErrors?.location}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="industry" className="form-label">
                    Industry
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors?.industry && "is-invalid"
                    }`}
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                  {formErrors?.industry && (
                    <div className="invalid-feedback">
                      {formErrors?.industry}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                {isEdit && (
                  <button
                    className="btn btn-primary"
                    onClick={handleCancelEdit}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerProfile;
