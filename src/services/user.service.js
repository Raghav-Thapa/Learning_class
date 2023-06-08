const MongodbService = require("./mongodb.service")

class userService extends MongodbService {
    constructor(){
        super()
    }
    validateRegisterData = (data) =>{
        
        if(!data.name){
            throw{status: 400, msg: "Name required"}
        }//validation
        if(!data.email){
            throw{status: 400, msg: "Email required"}
        }
        if(!data.password){
            throw{status: 400, msg: "Password required"}
        }
        if(data.password.length < 8){
            throw{status: 400, msg: "Password length must be 8 character"}
        }
    }
    registerUser = async(data) => {
        try{
            let queryResponse = await this._db.collection("users").insertOne(data) 
            return queryResponse;

        } catch(exception){
            throw exception;
        }
    }
    getUserByEmail = async(email) => {
        try{
            let user = await this._db.collection("users").findOne({
                email: email
            })
            if(user){
                return user;
            } else{
                throw "User does not exists"
            }
            

        }catch(exception){
            throw(exception)

        }
    }
}

const userServ = new userService()
module.exports = userServ;