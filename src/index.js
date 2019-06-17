const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app =  express()

const server = require('http').Server(app)
const io = require('socket.io')(server)


mongoose.connect('mongodb://localhost:27017/oministack', {useNewUrlParser: true})
mongoose.connection.on('connected', function () {
 console.log('=====Conexão estabelecida com sucesso=====');
})
mongoose.connection.on('error', function (err) {
 console.log('=====Ocorreu um erro: ' + err);
})
mongoose.connection.on('disconnected', function () {
 console.log('=====Conexão finalizada=====');
}) 

app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3333)