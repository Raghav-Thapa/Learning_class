const express = require("express")
const app = express()

const authRoutes = require("./auth.routes")

const bannerRoutes = require("./banner.routes")

const brandRoutes = require("./brand.routes")

app.use('/auth',authRoutes)

app.use('/banner',bannerRoutes)

app.use('/brand',brandRoutes)

module.exports = app;