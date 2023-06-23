const CategoryModel = require("../models/category.model")
const Joi = require("joi")

class CategoryService{
    categoryValidate = async (data) => {
        try{
            let schema = Joi.object({
                name: Joi.string().min(3).required(),
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
            //     msg: "Category Validation Failure"
            // }
        }
    }

    getAllCategorys = async ({perPage = 10, currentPage =1}) =>{
        try{
            let skip = (currentPage-1) * perPage;

            let data = await CategoryModel.find()
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
        return await CategoryModel.count(filter)
    }
    createCategory = async (data) => {
        try{
            let category = new CategoryModel(data);
            return await category.save()
        }catch(exception){
            console.log(exception)
            throw{
                status: 500, msg:"Db querry failed"
            }
        }
    }
    updateCategory = async(data,id) =>{
        try{
            let response = await CategoryModel.findByIdAndUpdate(id, {$set: data})
            return response

        } catch(except){
            throw except
        }
    }
    getCategoryById = async(id) => {
        try{
            let category = await CategoryModel.findById(id)
            if(category){
                return category
            } else{
                throw{status:404, msg:"Category does not exist"}
            }

        }catch(err){
            console.log(err)
            throw err
        }
    }
    deleteCategoryById = async(id) => {
        try{
            let delResponse = await CategoryModel.findByIdAndDelete(id)
            if(delResponse){
                return delResponse
            } else{
                throw{status:404, msg: "Category has been already deleted or does not exist"}
            }
            
        }catch(except){
            throw except
        }
    }
    getCategoryByFilter = async(filter, paging) =>{
        try{
            let skip = (paging.currentPage-1) * paging.perPage;
            let response = await CategoryModel.find(filter)
            .sort({_id: -1})
            .skip(skip)
            .limit(paging.perPage)
                return response;
        }catch(exception){
            throw exception
        }
    }
}

module.exports = CategoryService