const express = require("express")
const MongoService = require("../services/MongoService")
const querystring = require("querystring")

class ApiController {
    router = express.Router()
    
    constructor(db=new MongoService) {
        this.writeToDB = this.writeToDB.bind(this)
        this.readDatabase = this.readDatabase.bind(this)
        this.deleteInDatabase = this.deleteInDatabase.bind(this)
        this.initRoutes()  
        this.database = db
    }


    initRoutes() {
        this.router.post("/testRoute", this.testMethod)
        this.router.post("/mongo/addUser", this.writeToDB)
        this.router.get("/mongo/findUser", this.readDatabase)
        this.router.get("/mongo/deleteUser", this.deleteInDatabase)
    }

    async deleteInDatabase(req, res) {
        const parsed = querystring.parse(req.url)
        const data = await this.database.deleteUser(parsed)

        if(data.success) {
            res.json({
                success:true,
                data
            })
        } else {
            res.json({
                success:true,
                data
            })
        }

    }

    async readDatabase(req, res) {
        const parsed = querystring.parse(req.url)
        const data = await this.database.findUsers(parsed)

        if(data.success) {
            res.json({
                success:true,
                data
            })
        } else {
            res.json({
                success:true,
                data
            })
        }
        
    }

    async writeToDB(req, res) {
       const resp = await this.database.addUser(req.body)
       if(resp.success) {
            res.send("SUCCESS")
       }
    }
  

    testMethod(req, res, next) {
        const {test} = req.body
        res.send("OK")

    }

}

module.exports = ApiController