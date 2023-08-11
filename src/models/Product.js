const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types: { ObjectId} } = Schema

const productSchema = new Schema({
    category: {
        type: String,
        require: true,
        trim: true,
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
    },
    imgUrl: {
        type: String,
        require: true,
        trim: true,
    },
    user: {
        type: ObjectId,
        require: true,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now,
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product