const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {type: String, required: true, min: 5, max:30},
    image: {type: String, required: false}
},{timestamps: true})

const Category = mongoose.models.Category || mongoose.model("Category",CategorySchema)
module.exports = Category


