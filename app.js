const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

// Routes
const routes = require('./routes/router')
app.use("/api", routes)

// Database
const connect = require("./database/connect")
connect()

const PORT = process.env.PORT || 4000

app.listen(PORT, (req, res) => {
    console.log(`Server is connected on http://localhost:${PORT}`)
})

// Server Test
app.get("/", (req, res) => {
    res.send("Tested successfully")
})