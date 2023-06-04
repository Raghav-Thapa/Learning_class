class userService{
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
}

const userServ = new userService()
module.exports = userServ;