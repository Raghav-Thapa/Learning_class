const express = require('express')
const app = express()


app.get('/',(req,res) => {
    //login logic
})

app.post('/create',(req,res) => {
    //create brand
})

app.put('/update',(req,res) => {
    //update brand
})

app.delete('/delete',(req,res) => {
    //delete brand
})

app.get('/active',(req,res) => {
    //get active brand
})

module.exports = app;
