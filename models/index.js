const dbConfig = require("../config/db.config")
const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")


mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url
db.tutorials = require("./tutorial.model")(mongoose, mongoosePaginate)

module.exports = db