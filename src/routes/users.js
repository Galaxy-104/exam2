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
        isAdmin: req.body.isAdmin,
    })
    if(user.isAdmin){
        user.isAdmin = true
    }else{
        user.isAdmin = false
    }

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

// 사용자 정보 변경
router.put('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({ code: 404, message: 'User Not Founded'})
    }else{
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        user.lastModifiedAt = new Date()

        const updatedUser = await user.save()
        const { name, email, userId, isAdmin, createdAt, lastModifiedAt } = updatedUser
        res.json({
            code: 200,
            token: generateToken(updatedUser),
            name, email, userId, isAdmin, createdAt, lastModifiedAt
        })
    }
}))

// 사용자 정보 삭제
router.delete('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        res.status(404).json({ code: 404, message: 'User Not Founded'})
    }else{
        res.status(204).json({ code: 204, message: 'User deleted successfully'})
    }
}))

module.exports = router