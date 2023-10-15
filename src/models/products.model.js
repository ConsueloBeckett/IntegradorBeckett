const mongoose = require('mongoose')

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
nombre: { type: String, max: 90, required: true },
precio: { type: Number, max: 10000, required: true },
cantidad: { type: Number, max: 100, required: true},
caracteristica: { type: String, max: 10000, required: true},
category: { type: String, max: 50, required: true},
})


const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = { productsModel } 