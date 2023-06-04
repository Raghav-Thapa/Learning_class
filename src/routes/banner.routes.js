const app = require('express').Router()
app.get('/',(req,res) => {
    //login logic
})

app.post('/',(req,res,next) => {
    //create banner
    let loginCheck = true
    console.log("I am middleware call");
    if (loginCheck){
        next()
    } else{
        next("Hello")
    }
},(req,res,next) =>{
    console.log("I am controller call")
    res.json({
        data:null,
        message: "You have to login"
    })
}
)

app.put('/update',(req,res) => {
    //update banner
})

app.delete('/delete',(req,res) => {
    //delete banner
})

app.get('/active',(req,res) => {
    //get active banner
})

module.exports = app

