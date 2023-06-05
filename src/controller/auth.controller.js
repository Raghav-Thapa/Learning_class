const bcrypt = require("bcryptjs")
const userServ = require("../services/user.service")
const mailSvc = require("../services/mailer.service")
const dotenv = require("dotenv");
const helpers = require("../utilities/helpers");
dotenv.config();

class authController {
    login = (req,res,next) =>{
        //todo
        let payload = req.body;
        res.json({
            result:payload
        })

    }
    register = async (req,res,next) =>{
        try{
          let registerData = req.body
        //   console.log(req.file)
        if(req.file){
            registerData.image = req.file.filename
        }

          userServ.validateRegisterData(registerData)

            registerData.password = bcrypt.hashSync(registerData.password, 10);
            //TODO generate random string
            registerData.token = helpers.generateRandomString();

            //TODO DB QUERY

            
            let mailMsg = `Dear ${registerData.name}, <br/> Your account has been registered
            successfully. Please click the link below to activate your account:
            <a href="${process.env.FRONTEND_URL}activate/${registerData.token}">"http://localhost:3000/activate/${registerData.token}"</a>
            <br/>
            Regards,<br>
            Np-Reply, Admin
            `

            await mailSvc.sendMail(registerData.email, "Activate your account", mailMsg);

            //data store -> db

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