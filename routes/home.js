//define routes
const homeController = require('../controllers/index.ctrl')
module.exports = (router) => {
    router
        .route('/')
        .post(homeController.index)
}

