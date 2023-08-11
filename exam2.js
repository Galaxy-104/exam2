const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')

// mongodb 연결하기
mongoose.connect()
.then(() => console.log("mongodb connected..."))
.catch(e => console.log(`failed to connect mongodb: ${e}`))

app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // 로그 기록



// 에러 처리
app.use( (req, res, next) => {
    res.status(404).send("Page Not Founded")
})
app.use.apply( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("internal server error")
})

// 5000포트로 서버 연동
app.listen(5000, () => {
    console.log('server is running on port 5000...')
})