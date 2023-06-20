const router = require('express').Router()
const { brandCtrl } = require('../controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require('../middleware/permission.middleware')
const uploader = require('../middleware/uploader.middleware')

const uploadPath = (req,res,next) =>{
    req.uploadPath = "./public/brands/";
    next()
}

router.route("/")
    .get(authCheck, checkPermission('admin'), brandCtrl.listAllBrands)
    .post(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),brandCtrl.storeBrand)

router.route("/:id")
    .put(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),brandCtrl.updateBrand)
    .delete(authCheck, checkPermission('admin'),brandCtrl.deleteBrand)

router.get('/list/home', brandCtrl.getBrandForHomePage)

module.exports = router;

