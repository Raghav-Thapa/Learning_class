const BannerController = require('./banner.controller')
const bannerCtrl = new BannerController();

const BrandController = require('./brand.controller')
const brandCtrl = new BrandController();

module.exports = {
    bannerCtrl,
    brandCtrl
}