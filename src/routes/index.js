const express = require("express")
const app = express()

const authRoutes = require("./auth.routes")
const bannerRoutes = require("./banner.routes")
const brandRoutes = require("./brand.routes")
const categoryRoutes = require("./category.routes")
const productRoutes = require("./product.routes")
const userRoutes = require("./user.routes")

app.use('/auth',authRoutes)
app.use('/banner',bannerRoutes)
app.use('/brand',brandRoutes)
app.use('/category',categoryRoutes)
app.use('/product',productRoutes)
app.use('/user',userRoutes)

module.exports = app;