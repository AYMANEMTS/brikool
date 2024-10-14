const Category = require('../models/Category')

const showCategory = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json({data:category})
    }catch (e) {
        res.status(500).json({error:e})
    }
}

const getAllCategory = async (req,res) => {
    try {
        const category = await Category.find({})
        res.status(200).json({data:category})
    }catch (e) {
        res.status(500).json({error:e})
    }
}

const storeCategory = async (req,res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json(category)
    }catch (e) {
        res.status(500).json({error:e})
    }
}

const updateCategory = async (req,res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id,req.body)
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    }catch (e) {
        res.status(500).json({error:e})
    }
}

const destroyCategory = async (req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Category deleted successfully"})
    }catch (e) {
        res.status(500).json({error:e})
    }
}

module.exports = {getAllCategory,storeCategory,updateCategory,destroyCategory,showCategory}