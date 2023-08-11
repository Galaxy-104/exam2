const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')

const router = express.Router()

router.post('/register', expressAsyncHandler(async (req, res, next) => {
    res.json("회원가입")
}))

router.post('/login', expressAsyncHandler(async (req, res, next) => {
    res.json("로그인")
}))

router.post('/logout', expressAsyncHandler(async (req, res, next) => {
    res.json("로그아웃")
}))

router.put('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("사용자 정보 변경")
}))

router.delete('/:id', expressAsyncHandler(async (req, res, next) => {
    res.json("사용자 정보 삭제")
}))

module.exports = router