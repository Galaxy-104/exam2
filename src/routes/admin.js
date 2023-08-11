const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/Product')
const User = require('../models/User')
const { isAuth, isAdmin } = require('../../auth')

const router = express.Router()

// 전체 유저 정보 조회
router.get('/users', isAuth, isAdmin, expressAsyncHandler(async (req, res, next) => {
    res.json("전체 유저 조회")
}))

// 특정 유저 정보 조회
router.get('/users/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!User){
        res.status(404).json({ code: 404, message: 'User Not Found'})
    }else{
        res.json({ code: 200, user })
    }
}))

// 특정 유저 검색
router.get('/users/search/:name', isAuth, isAdmin, expressAsyncHandler(async (req, res, next) => {
    res.json("특정 유저 검색")
}))


// 전체 상품 정보 조회
router.get('/products', isAuth, isAdmin, expressAsyncHandler(async (req, res, next) => {
    res.json("전체 상품 조회")
}))



module.exports = router