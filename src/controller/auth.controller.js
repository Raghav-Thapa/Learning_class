const bcrypt = require("bcryptjs")
const userServ = require("../services/user.service")

class authController {
    login = (req,res,next) =>{
        //todo
        let payload = req.body;
        res.json({
            result:payload
        })

    }
    register = (req,res,next) =>{
        try{
          let registerData = req.body
        //   console.log(req.file)
        if(req.file){
            registerData.image = req.file.filename
        }

          userServ.validateRegisterData(registerData)

            registerData.password = bcrypt.hashSync(registerData.password, 10);

        //   console.log(registerData)
        res.json({
            result: registerData 
        })

        }
        catch(exception){
            console.log(exception);
            next(exception)

        }

    }
    activate = (req,res,next) =>{

    }
    forgetPassword = (req,res,next) =>{

    }
    resetPassword = (req,res,next) =>{

    }
    getLoggedInUser = (req,res,next) =>{

    }

}

const authCtrl = new authController()
module.exports = authCtrl