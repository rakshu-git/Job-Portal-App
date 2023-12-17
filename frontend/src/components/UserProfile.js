import React, { useState } from "react";
import validator from "validator";

function UserProfile(props) {
  const {
    submitForm,
    name: n,
    email: e,
    mobile: m,
    qualification: q,
    experience: x,
    designation: d,
    handleEdit,
    isEdit,
  } = props;

  const [name, setName] = useState(n ? n : "");
  const [email, setEmail] = useState(e ? e : "");
  const [mobile, setMobile] = useState(m ? m : "");
  const [qualification, setQualification] = useState(q ? q : "");
  const [experience, setExperience] = useState(x ? x : "");
  const [designation, setDesignation] = useState(d ? d : "");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const handleValidation = () => {
    if (validator.isEmpty(name)) {
      errors.name = "Name is required";
    }

    if (validator.isEmpty(email)) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (validator.isEmpty(mobile)) {
      errors.mobile = "Mobile is required";
    } else if (!validator.isLength(mobile, { min: 10, max: 10 })) {
      errors.mobile = "Mobile number must be min 10 and max 10 digits";
    } else if (!validator.isNumeric(mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    if (validator.isEmpty(qualification)) {
      errors.qualification = "Qualification is required";
    }

    if (validator.isEmpty(experience)) {
      errors.experience = "Experience is required";
    }

    if (validator.isEmpty(designation)) {
      errors.designation = "Designation is required";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidation();
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      const formData = {
        name: name,
        email: email,
        mobile: mobile,
        qualification: qualification,
        experience: experience,
        designation: designation,
      };

      submitForm(formData);
    } else {
      setFormErrors(errors);
    }
    setName("");
    setEmail("");
    setMobile("");
    setQualification("");
    setExperience("");
    setDesignation("");
  };

  const handleCancelEdit = () => {
    handleEdit();
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow" style={{ width: "28rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${formErrors?.name && "is-invalid"}`}
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {formErrors?.name && (
                <div className="invalid-feedback">{formErrors?.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className={`form-control ${formErrors?.email && "is-invalid"}`}
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {formErrors?.email && (
                <div className="invalid-feedback">{formErrors?.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className={`form-control ${formErrors?.mobile && "is-invalid"}`}
                id="mobile"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
              {formErrors?.mobile && (
                <div className="invalid-feedback">{formErrors?.mobile}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="qualification" className="form-label">
                Qualification
              </label>
              <input
                type="text"
                className={`form-control ${
                  formErrors?.qualification && "is-invalid"
                }`}
                id="qualification"
                value={qualification}
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
              />
              {formErrors?.qualification && (
                <div className="invalid-feedback">
                  {formErrors?.qualification}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="experience" className="form-label">
                Experience
              </label>
              <input
                type="text"
                className={`form-control ${
                  formErrors?.experience && "is-invalid"
                }`}
                id="experience"
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
              />
              {formErrors?.experience && (
                <div className="invalid-feedback">{formErrors?.experience}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <input
                type="text"
                className={`form-control ${
                  formErrors?.designation && "is-invalid"
                }`}
                id="designation"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
              {formErrors?.designation && (
                <div className="invalid-feedback">
                  {formErrors?.designation}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
            {isEdit && (
              <button
                type="button"
                className="btn btn-secondary mt-3 ml-2"
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

export default UserProfile;
