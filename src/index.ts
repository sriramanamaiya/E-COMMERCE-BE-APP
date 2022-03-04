import express from "express"

const app = express()
const port: number = 3048

app.listen(port, () => {
    console.log(`Server is Running on Port - ${port}`)
})