//define routes
const homeController = require('../controllers/index.ctrl')
module.exports = (router) => {
    
    router
        .route('/')
        .post(homeController.index)

    router 
        .route('/')
        .get(homeController.index)

    router
        .route('/*')
        .get(homeController.wrongURL)

    router
        .route('/*')
        .post(homeController.wrongURL)
}

