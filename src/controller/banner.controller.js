const BannerService = require("../services/banner.service");

class BannerController{
    _svc;

    constructor(){
        this._svc = new BannerService
    }
    
    listAllBanners = async (req, res, next) => {
        try{
            let paging ={
                totalNoOfRows: await this._svc.getAllCount(),
                perPage: req.query.perPage ? Number(req.query.perPage):10,
                currentPage: req.query.page ? Number(req.query.page):1
            }

            let data = await this._svc.getAllBanners(paging)
            res.json({
                result: data,
                status: true,
                msg: "Banner Data Fetched",
                meta: paging
            })
        } catch(exception){
            next(exception)
        }

    }

    storeBanner = async (req, res ,next) =>{
        try{
            let data = req.body;
            if(req.file){
                data.image = req.file.filename;

            }

            let validated = await this._svc.bannerValidate(data);
        }catch(exception){
            next(exception)
        }

    }

    updateBanner = (req, res, next) => {

    }

    deleteBanner =(req, res, next) => {

    }

    getBannerByStatus =(req, res, next) => {

    }


}

module.exports = BannerController