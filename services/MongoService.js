require("dotenv").config()
const mongoose = require("mongoose")
const User = require("../schema/User")

class MongoService {

    async deleteUser(data) {

        try {

            const {email, name, age} = data
           
            const query = {}

            if(email) query.email = {$regex: new RegExp(email, "i")}
            if(name) query.name = {$regex: new RegExp(name, "i")}
            if(age) query.age = age
        
            const dta = await User.findOneAndDelete(query)
            
            if(dta._id) {
                return {
                    success:true,
                    data: dta
                }
            } else {
                return {
                    success:false,
                    msg: "User not found"
                }
            }

        } catch(err) {
            console.log(err)
            return {
                success:false,
                msg: "Database error"
            }
        }
        
    }


    async findUsers(data) {

        try {

            const {email, name, age} = data
           
            const query = {}

            if(email) query.email = {$regex: new RegExp(email, "i")}
            if(name) query.name = {$regex: new RegExp(name, "i")}
            if(age) query.age = age
        
            const dta = await User.find(query)

            if(dta.length ) {
                return {
                    success:true,
                    data: dta
                }
            } else {
                return {
                    success:false,
                    msg: "User not found"
                }
            }

        } catch(err) {
            console.log(err)
            return {
                success:false,
                msg: "Database error"
            }
        }
        
    }


    async addUser(userData) {
        try {
            const usr = new User(userData)
            await usr.save()
            return {
                success: true,
                msg: "User saved"
            }
        }catch(err) {
            console.log(err)
        }
    }

    connect() {
        try {
            const dbURI = process.env.MONGO_DB
            console.log(dbURI)
            
            mongoose.connection.on("connected", () => {
                console.log("Database connection established")
            })

            mongoose.connection.on("disconnected", () => {
                console.log("Connection to database lost")
            })

            mongoose.connection.on("error", (err)=> {
                console.log(`Mongo error occured: ${err}`)
            })

            mongoose.connect(dbURI)

        }catch(err) {
            console.log(err)
        }
    }
}

module.exports = MongoService