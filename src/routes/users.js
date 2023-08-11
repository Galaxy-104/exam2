const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth, isAdmin } = require('../../auth')

const router = express.Router()

// 회원가입
router.post('/register', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        userId: req.body.userId,
        password: req.body.password,
    })

    const newUser = await user.save()
    if(!newUser){
        res.status(401).json({ code: 401, message: 'Invalid User Data'})
    }else{
        const { name, email, userId, isAdmin, createdAt } = newUser
        res.json({
            code: 200,
            token: generateToken(newUser),
            name, email, userId, isAdmin, createdAt
        })
    }
}))

// 로그인
router.post('/login', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if(!loginUser){
        res.status(401).json({ code: 401, message: 'Invalid ID or Password'})
    }else{
        const { name, email, userId, isAdmin, createdAt } = loginUser
        res.json({
            code: 200,
            token: generateToken(loginUser),
            name, email, userId, isAdmin, createdAt
        })
    }
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