//declare dependancies
const express = require("express")
const routes = require('./routes/')
const app = express()
const router = express.Router()

let port = 8080 || process.env.PORT

routes(router)

app.use('/', router)

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});