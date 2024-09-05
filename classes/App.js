const express = require("express")

class App {
    app = express()

    constructor({port, middlewares, controllers, services}) {
        this.port = port
        this.initMiddlewares(middlewares)
        this.routes(controllers)
        this.initServices(services)
    }

    routes(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/v1", controller.router)
        })
    }

    initServices(services) {
        const {mongo_db} = services
       
        //Mongo DB connection
        mongo_db.connect()
    }


    initMiddlewares(mws) {
        mws.forEach((mw) => {
            this.app.use(mw)
        })
    }


    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`)
        })
    }

}

module.exports = App