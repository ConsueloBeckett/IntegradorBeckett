const mongoose = require('mongoose')

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
producto: { type: String, max: 90, required: true },
precio: { type: Number, max: 10000, required: true },
cantidad: { type: Number, max: 100, required: true},

})


const cartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = { cartsModel } 