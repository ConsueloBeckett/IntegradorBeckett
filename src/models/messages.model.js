const mongoose = require('mongoose')

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({
user: { type: String, max: 90, required: true },
message: { type: String, max: 10000, required: true },

})


const messagesModel = mongoose.model(messagesCollection, messagesSchema)

module.exports = { messagesModel } 