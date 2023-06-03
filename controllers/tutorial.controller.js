const db = require("../models/index")
const Tutorial = db.tutorials

// defining pagination
const getPagination = (page, size) => {
    const limit = size ? + size : 3;
    const offset = page ? page * limit : 0

    return {limit, offset}
}

// Create and save new Post
exports.create = (req,res) => {
    // Validate request
    if(!req.body.title){
        res.status(400).send({message: "Content cannot be empty"})
        return
    }

    const tutorial = new Tutorial ({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    })

    // Saving the tutorial to databasse
    tutorial.save(tutorial)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the the tutorial"
        })
    })
}

// Retreiving all data from database

exports.findAll = (req,res) => {
    const {page, size, title} = req.query
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}}: {};

    const {limit, offset} = getPagination(page, size)

        Tutorial.paginate(condition, {limit, offset})
        .then(data => {
            res.send({
                totalItem: data.totalDocs,
                tutorials : data.docs,
                totalPages: data.totalPages,
                currentPage: data.page -1
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the the tutorial"
            })
        })
}

// Find a single data

exports.findOne = (req,res) => {
    const id = req.params.id
    Tutorial.findById(id)
    .then(data=>{
        if(!data)
            res.status(404).send({message: "Not Found the tutorial with id", id})
        else res.send(data)
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving the requested data"})
    })
}

// Update the database
exports.Update = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Data to update cannot be empty"})
    }

    const id = req.params.id

    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data => {
        if(!data) {
            res.status(404).send({message: 'Cannot Update the data with id', id})
        }
        else {
            res.send({message: "data was updated succesfully"})
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error updating the data", id})
    })
}

// Deleting a data by Id

exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.findByIdAndRemove(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Cannot delete data with id", id})
            }
            else{
                res.send({message: "data was deleted successfully"})
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error deleting the data", id})
            })
}

// Delete all data at once

exports.deleteAll = (req,res) => {
    Tutorial.deleteMany({})
    .then(data => {
        res.send({message: `${data.deleteCount} Dataa were deleted successfully`})
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while deleting the datas"
        })
    })
}

// Find all published tutorial

exports.findPublished = (req,res) => {
    const {page, size} =req.query;
    const {limit, offset} = getPagination(page, size)
    Tutorial.paginate({published: true}, {sort: {createdAt: -1}, limit, offset})
        .then(data => {
            res.send({
                totalItem: data.totalDocs,
                tutorials : data.docs,
                totalPages: data.totalPages,
                currentPage: data.page -1
            })
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occured while retreiving the tutorials"
            })
        })
        
}