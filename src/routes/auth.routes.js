const app = require("express").Router()
const authCtrl = require('../controller/auth.controller')
const authCheck = require("../middleware/auth.middleware")
const uploader = require("../middleware/uploader.middleware")



app.post('/login',authCtrl.login)

const uploadPath =(req,res,next) => {
    req.uploadPath ="./public/user"
    next()

}

app.post('/register',uploadPath, uploader.single("image"), authCtrl.register)

const uploadPath2 =(req,res,next) => {
    req.uploadPath ="./public/user/active"
    next()

}

app.post('/activate',authCtrl.activate)
app.post('/forget-password',authCtrl.forgetPassword)
app.post('/password-reset', authCtrl.resetPassword)
app.post('/me',authCheck,authCtrl.getLoggedInUser)

module.exports = app;
