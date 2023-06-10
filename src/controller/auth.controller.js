const bcrypt = require("bcryptjs")
const userServ = require("../services/user.service")
const mailSvc = require("../services/mailer.service")
const dotenv = require("dotenv");
const helpers = require("../utilities/helpers");
dotenv.config();
const {MongoClient} = require("mongodb");
const jwt = require('jsonwebtoken');


class authController {
    login = async (req,res,next) =>{
       try{
         //todo
         let payload = req.body;
         if(!payload.email || !payload.password){
             next({status: 400, msg:"Credentials required"})
         }
 
         //validation
         let userDetail = await userServ.getUserByEmail(payload.email)
         //password match
         if(bcrypt.compareSync(payload.password, userDetail.password)){
            //password match

            if(userDetail.status === 'active'){
                let accessToken = jwt.sign({
                    userId: userDetail._id
                }, process.env.JWT_SECRET, {expiresIn:'3h'});

                let refreshToken = jwt.sign({
                    userId: userDetail._id
                }, process.env.JWT_SECRET, {expiresIn:'3h'});

            res.json({
                //  result:payload
                 result:{
                    data: userDetail,
                    token: {
                        accessToken: accessToken,
                        accessType: "Bearer",
                        refreshToken: refreshToken
                    }
                 },
                 status: true,
                 msg:"you are logged in"
             })
            } else{
                next({status: 403, msg: 'Your account has not been activated yet'})
            }

         } else{
            //password does not match
            next({status: 400, msg:'Credentials does not match'})
         }
         
         //db query

       } catch(exception){
        console.log(exception);
        next({status: 400, msg:"Query exception. View console"})

       }

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
            // from local
            
            // let client = await MongoClient.connect("mongodb://127.0.0.1:27017") 


            // let client = await MongoClient.connect(process.env.MONGODB_URL) 
            // let db = client.db(process.env.MONGODB_NAME)

            // let queryResponse = await db.collection('users').insertOne(registerData)

            let registerResponse = await userServ.registerUser(registerData)

            if(registerResponse.acknowledged){
                
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
            result: registerData,
            msg: "user registered successfully"
        })

            }
            else{
                next({status:400, msg:"user cannot be registered at this moment"})
            }


        //    await MongoClient.connect("mongodb+srv://raghavmern:<password>@cluster0.aguznsx.mongodb.net/") from cluster



            

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
        try{
            res.json({
                result: req.authUser,
                msg:"Your detail",
                status: true

            })
        }  catch(exception){
            console.log(exception);
            next(exception)
        }

    }
    refreshToken = async(req, res, next) =>{
    }

}

const authCtrl = new authController()
module.exports = authCtrl