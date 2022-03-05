import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'
import isURL from 'validator/lib/isURL'
import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

export interface Supplier {
    name: string
    email: string
    password: string
    companyName: string
    companyWebsite?: string
    number: string
    isAdmin?: boolean
}

const Schema = mongoose.Schema
const supplierSchema = new Schema<Supplier>(
    {
        name: {
            type: String,
            required: [true, 'Supplier name is required'],
            minlength: 3,
            maxlength: 64
        },
        email: {
            type: String,
            required: [true, 'Email-ID is required'],
            unique: true,
            validate: {
                validator: function (value: string) {
                    return isEmail(value)
                },
                message: function () {
                    return 'Invalid Email-ID'
                }
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            maxlength: 128
        },
        companyName: {
            type: String,
            required: [true, 'Company Name is Required'],
            minlength: 3,
            maxlength: 64
        },
        companyWebsite: {
            type: String,
            validate: {
                validator: function (value: string) {
                    return isURL(value)
                },
                message: function () {
                    return 'Invalid Website'
                }
            }
        },
        number: {
            type: String,
            required: [true, 'Number is Required'],
            unique: true,
            minlength: 10,
            maxlength: 10,
            validate: {
                validator: function (value: string) {
                    return isNumeric(value)
                },
                message: function () {
                    return 'Invalid Phone Number'
                }
            }
        },
        isAdmin: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

supplierSchema.pre('save', function (next) {
    const supplier: Supplier = this
    bcryptjs.genSalt().then((salt) => {
        bcryptjs.hash(supplier.password, salt).then((hashedPassword) => {
            supplier.password = hashedPassword
            next()
        })
    })
})

const SUPPLIER = mongoose.model<Supplier>('Supplier', supplierSchema)

export default SUPPLIER
