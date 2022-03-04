import express from "express"

import configureDB from "./config/database"
import router from "./config/route"

const app = express()
const port: number = 3048

configureDB()
app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server is running on Port -- ${port}`)
})