const BannerModel = require("../models/banner.model")
const Joi = require("joi")

class BannerService{
    bannerValidate = async (data) => {
        try{
            let schema = Joi.object({
                title: Joi.string().min(3).required(),
                link: Joi.string().allow(null,""),
                startDate: Joi.date(),
                endDate: Joi.date().greater(Joi.ref("startDate")),
                image: Joi.string().required(),
                status: Joi.string().valid("active","inactive").default("inactive")
            })
            let response = schema.validate(data);
            
        }catch(exception){
            console.log(exception)
            throw {
                status: 400,
                msg: "Banne rValidation Failure"
            }
        }
    }

    getAllBanners = async ({perPage = 10, page =1}) =>{
        try{
            let skip = (page-1) * perPage;

            let data = await BannerModel.find()
            .sort({_id: 1})
            .skip(skip)
            .limit(perPage)
            return data;
        } catch(exception) {
            console.log(exception)
            throw{status: 500, msg: "Querry execution fialed."}
        }
    }

    getAllCount = async () => {
        return await BannerModel.count()
    }
}

module.exports = BannerService