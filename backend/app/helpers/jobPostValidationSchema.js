
const jobPostValidationSchema = {
    companyName: {
        notEmpty:{
            errorMessage:"Company Name is required"
        }
    },
    location:{
        notEmpty:{
            errorMessage: 'Location is required'
        }
    },
    designation:{
        notEmpty:{
            errorMessage: 'Designation is required'
        }
    },
    salary:{
        notEmpty:{
            errorMessage: 'Salary is required'
        },
        isNumeric:{
            errorMessage: "Please enter in number"
        }
    },
    requiredExperience:{
        notEmpty:{
            errorMessage: 'Experience is required'
        },
        isNumeric:{
            errorMessage: "Please enter in number"
        }
    }
    
}

module.exports = jobPostValidationSchema