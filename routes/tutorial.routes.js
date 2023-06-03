module.exports = app => {
    var router = require('express').Router()

    const tutorials = require('../controllers/tutorial.controller')

    // Retrieve all published 
    router.get("/published", tutorials.findPublished)

    // Create a new data
    router.post("/", tutorials.create)

    // Retrieve data
    router.get("/", tutorials.findAll)

    // Retrieve data by id
    router.get("/:id", tutorials.findOne)

    // Update the data
    router.put("/:id", tutorials.Update)

    // Delete the data id
    router.delete("/:id", tutorials.delete)

    // Delete all
    router.delete("/", tutorials.deleteAll)


    app.use("/api/tutorial", router)
}