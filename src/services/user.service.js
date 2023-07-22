// const { ObjectId } = require("mongodb")
// const MongodbService = require("./mongodb.service")
const UserModel = require("../models/user.model")

class UserService{
    // constructor(){
    //     super()
    // }
    validatedata = (data) =>{
        if(!data.name){
            throw {status: 400, msg: "Name required"}
        }
        if(!data.email){
            throw {status: 400, msg: "Email required"}
        }
        
        if(!data.password){
            throw {status: 400, msg: "Password required"}
        }

        if(data.password.length < 8){
            throw {status: 400, msg: "Password must be of atleast 8 characters"}
        }

        if(!data.role){
            throw {status: 400, msg: "Role required"}
        }
        
    }
    registerUser = async(data) => {
        try{
            // let queryResponse = await this._db.collection("users").insertOne(data);
            let user = new UserModel(data)
            return await user.save();
            // return queryResponse;
        } catch(exception){
            if(exception.code === 11000){
                throw{status: 400, msg: "Email should be unique"}
            }
            throw exception;
        }
    }
    getUserByEmail = async(email) => {
        try {
            let user = await UserModel.findOne({
                email: email
            })

            // let  user = await this._db.collection("users").findOne({
            //     email: email
            // })
            if(user){
                return user;
            } else {
                throw "User does not exists"
            }
        } catch(except){
            throw except
        }
    }

    getUserById = async(id)=>{
        try {
            let userDetail =await UserModel.findById(id);

            // let userDetail = await this._db.collection("users").findOne({
            //     _id: new ObjectId(id)
            // })
            return userDetail
        } catch(err){
            throw err
        }
    }

    getUserByFilter = async(filter)=>{
        try {
            let userDetail = await UserModel.find(filter);

            // let userDetail = await this._db.collection("users").findOne({
            //     _id: new ObjectId(id)
            // })
            return userDetail
        } catch(err){
            throw err
        }
    }

    // getUserByResetToken = async(resetToken) => {
    //     try {
    //         let user = await UserModel.findOne({
    //             resetToken: resetToken
    //         })

    //         // let  user = await this._db.collection("users").findOne({
    //         //     email: email
    //         // })
    //         if(user){
    //             return user;
    //         } else {
    //             throw "User does not exists"
    //         }
    //     } catch(except){
    //         throw except
    //     }
    // }

    updateUser = async (data, id) => {
        try {
            let userDetail = await UserModel.findByIdAndUpdate(id, {$set: data});
            return userDetail

        } catch(err){
            throw err
        }

    }

}
const userServ = new UserService();
module.exports = userServ;