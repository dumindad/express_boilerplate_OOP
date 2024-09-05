require("dotenv").config()
const App = require("./classes/App")
const ApiController = require("./controllers/ApiController")
const express = require('express')
const MongoService = require("./services/MongoService")



const port = process.env.PORT

try {
    const app = new App({
        port,
        middlewares:[express.json()],
        controllers: [new ApiController()],
        services: {mongo_db: new MongoService()}
    })

    app.startServer()
} catch(err) {
    console.log(err)
}