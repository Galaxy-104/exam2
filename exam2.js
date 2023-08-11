const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')


app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // 로그 기록

// 5000포트로 서버 연동
app.listen(5000, () => {
    console.log('server is running on port 5000...')
})