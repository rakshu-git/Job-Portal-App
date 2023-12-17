
const seekerValidationSchema = {
    name: {
        notEmpty:{
            errorMessage:"Name is required"
        }
    },
    experience:{
        notEmpty:{
            errorMessage: 'Experience is required'
        }
    },
    designation:{
        notEmpty:{
            errorMessage: 'Designation is required'
        }
    },
    qualification:{
        notEmpty:{
            errorMessage: 'Qualification is required'
        }
    },
    email:{
        notEmpty:{
            errorMessage:"email is required"
        },
        isEmail:{
            errorMessage:"email format is invalid"
        },
        
    },
    mobile:{
        notEmpty:{
            errorMessage: 'mobile number is required'
        },
        isNumeric:{
            errorMessage: 'phone number must be in numeric format'
        }
    }
   
    
}

module.exports = seekerValidationSchema