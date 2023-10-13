const mongoose = require('mongoose')

const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
name: { type: String, max: 20, required: true },
lastName: { type: String, max: 30, required: true },
email: { type: String, max: 50, required: true}
})

const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel } 