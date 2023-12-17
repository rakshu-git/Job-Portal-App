const User = require("../models/User")

const registerationValidationSchema = {
    username: {
        notEmpty:{
            errorMessage:"username is required"
        }
    },
    email:{
        notEmpty:{
            errorMessage:"email is required"
        },
        isEmail:{
            errorMessage:"email format is invalid"
        },
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value })
                if (user) {
                    throw new Error('email already registered')
                } else {
                    return true
                }
            }
        }
    },
    password:{
        notEmpty:{
            errorMessage: 'password is required'
        },
        isStrongPassword:{
            errorMessage: 'password is not strong enough'
        }
    },
    mobile:{
        notEmpty:{
            errorMessage: 'mobile number is required'
        },
        isNumeric:{
            errorMessage: 'phone number must be in numeric format'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Mobile number must be exactly 10 digits',
          },
        custom: {
            options: async (value) => {
                const user = await User.findOne({ mobile: value })
                if (user) {
                    throw new Error('mobile number already registered')
                } else {
                    return true
                }
            }
        }
    }
    
}

module.exports = registerationValidationSchema