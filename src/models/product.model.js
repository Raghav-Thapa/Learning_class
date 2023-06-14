const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    parent:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    image:{
        type: String,
    },
    slug:{
        type: String,
        require: true,
        unique: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:"category"
    },
    detail:{
        type: String
    },
    price:{
        type: Number,
        require: null,
        min: 1 
    },
    discount:{
        type: Number,
        min: 0,
        max: 99
    },
    afterDiscount:{
        type: Number,
        require: true,
        min: 1
    },
    brand:{
        type: mongoose.Types.ObjectId,
        ref:"Brand",
        default: null
    },
    attributes:[{
        key: String,
        value: [String]
    }],
    isfeatured:{
        type: Boolean,
        default: false
    },
        status:{
            type: String,
            ennum:['active','inactive'],
            default: 'inactive'
        },
        images:[{
            type: String
        }],
        sellerid:{
            type: mongoose.Types.ObjectId,
            default: null,
            ref: "User"
        }
},{
    timestamps:true,
    autoInced:true
})

const CategoryModel = mongoose.model("Banner", CategorySchema)
module.exports = CategoryModel