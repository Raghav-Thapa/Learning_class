const authCheck = (req,res,next) =>{
    try{

    }
    catch(exception){
        next({status:500, msg:exception})
    }

}

module.exports = authCheck