const express = require('express')
const app = express()
const port = 3000
const morgan = require("morgan") 
app.use(morgan("combined")) 

const cors = require('cors')
app.use(cors())

const path = require('path')
app.use('/vianh', express.static(path.join(__dirname, 'public')))

let database = [ 
  {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70,"Image":"b1.jpg"}, 
  {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100,"Image":"b2.jpg"}, 
  {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.jpg"}, 
  {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.jpg"}, 
  {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.jpg"}
] 

app.get('/', (req, res) => {
    res.send('hello bay bi bu')
})

app.get("/books", (req, res) => { 
    res.send(database) 
})

app.listen(port, () => {
    console.log(`my server is starting at port ${port}`)
})
