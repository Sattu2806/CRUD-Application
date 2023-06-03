const express = require('express')
const cors = require('cors')
const db = require('./models/index')

const app = express()

const whitelist = ['http://127.0.0.1:57025', 'http://localhost:3001'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 ||  !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Connected to mongoDB")
})
.catch(err => {
    console.log("Cannot connected to database", err)
    process.exit()
})

app.get("/", (req,res) => {
    res.json({message: "Welcome to the CRUD Tutorial"})
})

require("./routes/tutorial.routes")(app)

app.listen(3000, ()=>{
    console.log("Server is running")
})

module.exports = app