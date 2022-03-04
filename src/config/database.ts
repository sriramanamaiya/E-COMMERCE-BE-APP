import mongoose from "mongoose"

const configureDB = () => {
    mongoose.connect('mongodb://localhost:27017/e-commerce-be')
        .then(() => {
            console.log('Connected to DB')
        })
        .catch((error: Error) => {
            console.log('Error while connecting to DB', error.message)
        })
}

export default configureDB