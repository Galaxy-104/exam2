const express = require('express')
const Product = require('../models/Product')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth, isAdmin } = require('../../auth')

const router = express.Router()

// 전체 상품 조회
router.get('/', isAuth, expressAsyncHandler(async (req, res, next) => {
    const products = await Product.find({ user: req.user._id}).populate('user')
    if(products.length === 0){
        res.status(404).json({ code: 404, message: 'Fail to find products'})
    }else{
        res.json({ code: 200, products })
    }
}))

router.get('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("특정 상품 조회")
}))

// 상품 등록
router.post('/', isAuth, expressAsyncHandler(async (req, res, next) => {
    const searchedProducts = await Product.findOne({
        user: req.user._id,
        name: req.body.name,
    })
    if(searchedProducts){
        res.status(204).json({ code: 204, message: 'Already created'})
    }else{
        const product = new Product({
            user: req.user._id,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            imgUrl: req.body.imgUrl
        })

        const newProduct = await product.save()
        if(!newProduct){
            res.status(401).json({ code: 401, message: "Failed to save todo"})
        }else{
            res.status(201).json({
                code: 201,
                message: 'New product created',
                newProduct
            })
        }
    }
}))

router.put('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("특정 상품 변경")
}))

router.delete('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("특정 상품 삭제")
}))

module.exports = router