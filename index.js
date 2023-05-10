const express = require("express")
const app = express()

app.use(express.json())

// Routes
const routes = require('./routes/router')
app.use("/api", routes)

// Database
const connect = require("./database/connect")
connect()


const PORT = 5000

app.listen(PORT, (req, res) => {
    console.log(`Server is connected on http://localhost:${PORT}`)
})

// Server Test
app.get("/", (req, res) => {
    res.send("Tested successfully")
})