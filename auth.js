const config = require('./config')
const jwt = require('jsonwebtoken')
const { userInfo } = require('os')

// 토큰 생성
const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        userId: user.userId,
        password: user.password,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
    },
    config.JWT_SECRET,
    {
        expiresIn: '1d',
        issuer: 'J'
    })
}

// 사용자 확인
const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        res.status(401).json({message: 'Token is not supplied'})
    }else{
        const token = bearerToken.slice(7, bearerToken.length)
        jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
            if(err && err.name === 'TokenExpiredError'){
                res.status(419).json({ code: 419, message: 'Token expired'})
            }else if(err){
                res.status(401).json({ code: 401, message: 'Invalid Token'})
            }else{
                req.user = userInfo
                next()
            }
        })
    }
}

// 관리자 확인
const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({ code: 401, message: 'You are not admin user'})
    }
}

module.exports = {
    generateToken,
    isAuth,
    isAdmin,
}