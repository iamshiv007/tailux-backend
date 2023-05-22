const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}
))
app.use("/avatars", express.static('assets/avatars'))
app.use("/productImages", express.static('assets/productImages'))
app.use("/carouselImages", express.static('assets/page/carousel'))
app.use("/dealImages", express.static('assets/page/deal'))
app.use("/trendingImages", express.static('assets/page/trending'))

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