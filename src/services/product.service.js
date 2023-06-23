const ProductModel = require("../models/product.model")
const Joi = require("joi")

class ProductService{
    productValidate = async (data) => {
        try{
            let schema = Joi.object({
                name: Joi.string().min(3).required(),
                price: Joi.number().required(),
                afterDiscount: Joi.number().required(),
                image: Joi.string().required(),
                status: Joi.string().valid("active","inactive").default("inactive")
            })
            let response = schema.validate(data);
            if(response.error){
                let msg = response.error.details[0].message;
                throw{status: 400, msg: msg}
            }
            return response.value;
            
        }catch(exception){
            console.log(exception)
            throw exception
            // throw {
            //     status: 400,
            //     msg: "Product Validation Failure"
            // }
        }
    }

    getAllProducts = async ({perPage = 10, currentPage =1}) =>{
        try{
            let skip = (currentPage-1) * perPage;

            let data = await ProductModel.find()
            .sort({_id: -1})
            .skip(skip)
            .limit(perPage)
            return data;
        } catch(exception) {
            console.log(exception)
            throw{status: 500, msg: "Querry execution fialed."}
        }
    }

    getAllCount = async (filter ={}) => {
        return await ProductModel.count(filter)
    }
    createProduct = async (data) => {
        try{
            let product = new ProductModel(data);
            return await product.save()
        }catch(exception){
            console.log(exception)
            throw{
                status: 500, msg:"Db querry failed"
            }
        }
    }
    updateProduct = async(data,id) =>{
        try{
            let response = await ProductModel.findByIdAndUpdate(id, {$set: data})
            return response

        } catch(except){
            throw except
        }
    }
    getProductById = async(id) => {
        try{
            let product = await ProductModel.findById(id)
            if(product){
                return product
            } else{
                throw{status:404, msg:"Product does not exist"}
            }

        }catch(err){
            console.log(err)
            throw err
        }
    }
    deleteProductById = async(id) => {
        try{
            let delResponse = await ProductModel.findByIdAndDelete(id)
            if(delResponse){
                return delResponse
            } else{
                throw{status:404, msg: "Product has been already deleted or does not exist"}
            }
            
        }catch(except){
            throw except
        }
    }
    getProductByFilter = async(filter, paging) =>{
        try{
            let skip = (paging.currentPage-1) * paging.perPage;
            let response = await ProductModel.find(filter)
            .sort({_id: -1})
            .skip(skip)
            .limit(paging.perPage)
                return response;
        }catch(exception){
            throw exception
        }
    }
}

module.exports = ProductService