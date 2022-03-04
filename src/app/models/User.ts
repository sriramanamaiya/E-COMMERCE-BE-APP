import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import validator from 'validator'

export interface User {
    name: string
    email: string
    password: string
    phoneNumber: string
    isAdmin?: boolean
}

const Schema = mongoose.Schema

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 64
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value: string) {
                    return validator.isEmail(value)
                },
                message: function () {
                    return 'Invalid Email-ID'
                }
            }
        },
        password: {
            type: String,
            required: [true, 'Password is Required'],
            minlength: 8,
            maxlength: 128
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone Number is Required'],
            minlength: 10,
            maxlength: 10,
            validate: {
                validator: function (value: string) {
                    return validator.isNumeric(value)
                },
                message: function () {
                    return 'Invalid Phone Number'
                }
            }
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

userSchema.pre('save', function (next) {
    const user: User = this
    bcrypt.genSalt().then((salt) => {
        bcrypt.hash(user.password, salt).then((hashedPassword) => {
            user.password = hashedPassword
            next()
        })
    })
})

const USER = mongoose.model<User>('User', userSchema)

export default USER
