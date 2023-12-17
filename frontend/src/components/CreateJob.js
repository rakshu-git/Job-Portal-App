import { useState } from "react";
import validator from "validator";

function CreateJob(props) {
  const {
    submitForm,
    companyName: c,
    designation: d,
    location: l,
    salary: s,
    requiredExperience: r,
    handleEdit,
    isEdit,
  } = props;
  const [companyName, setCompanyName] = useState(c ? c : "");
  const [designation, setDesignation] = useState(d ? d : "");
  const [location, setLocation] = useState(l ? l : "");
  const [salary, setSalary] = useState(s ? s : "");
  const [requiredExperience, setRequiredExperience] = useState(r ? r : "");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const handleValidation = () => {
    if (validator.isEmpty(companyName)) {
      errors.companyName = "Name is required";
    }

    if (validator.isEmpty(location)) {
      errors.location = "Location is required";
    }

    if (validator.isEmpty(designation)) {
      errors.designation = "Designation is required";
    }

    if (validator.isEmpty(salary)) {
      errors.salary = "Salary is required";
    }

    if (validator.isEmpty(requiredExperience)) {
      errors.requiredExperience = "RequiredExperience is required";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidation();

    if (Object.keys(errors).length === 0) {
      const formData = {
        companyName: companyName,
        designation: designation,
        location: location,
        salary: salary,
        requiredExperience: requiredExperience,
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
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="p-4 shadow rounded">
            <div className="mb-3">
              <label className="form-label">CompanyName</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.companyName ? "is-invalid" : ""
                }`}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              {formErrors.companyName && (
                <div className="invalid-feedback">{formErrors.companyName}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.designation ? "is-invalid" : ""
                }`}
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
              {formErrors.designation && (
                <div className="invalid-feedback">{formErrors.designation}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.location ? "is-invalid" : ""
                }`}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              {formErrors.location && (
                <div className="invalid-feedback">{formErrors.location}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Salary</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.salary ? "is-invalid" : ""
                }`}
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
              {formErrors.salary && (
                <div className="invalid-feedback">{formErrors.salary}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Required Experience</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.requiredExperience ? "is-invalid" : ""
                }`}
                value={requiredExperience}
                onChange={(e) => {
                  setRequiredExperience(e.target.value);
                }}
              />
              {formErrors.requiredExperience && (
                <div className="invalid-feedback">
                  {formErrors.requiredExperience}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary ml-2">
              Submit
            </button>

            {isEdit && (
              <button
                type="button"
                className="btn btn-secondary  ml-2"
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
