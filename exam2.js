const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const usersRouter = require('./src/routes/users')
const productsRouter = require('./src/routes/products')
const adminRouter = require('./src/routes/admin')
const config = require('./config')

// mongodb 연결하기
mongoose.connect(config.MONGODB_URL)
.then(() => console.log("mongodb connected..."))
.catch(e => console.log(`failed to connect mongodb: ${e}`))

app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // 로그 기록

// 라우터 핸들러 함수 임포트
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/admin', adminRouter)

// 에러 처리
app.use( (req, res, next) => {
    res.status(404).send("Page Not Founded")
})
app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("internal server error")
})

// 5000포트로 서버 연동
app.listen(5000, () => {
    console.log('server is running on port 5000...')
})