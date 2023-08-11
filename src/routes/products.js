const express = require('express')
const Product = require('../models/Product')
const expressAsyncHandler = require('express-async-handler')

const router = express.Router()

router.get('/', expressAsyncHandler(async (req, res, next) => {
    res.json("전체 상품 조회")
}))

router.get('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("특정 상품 조회")
}))

router.post('/', expressAsyncHandler(async (req, res, next) => {
    res.json("상품 등록")
}))

router.put('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("특정 상품 변경")
}))

router.delete('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("특정 상품 삭제")
}))

module.exports = router