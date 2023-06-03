module.exports = (mongoose, mongoosePaginate) => {
    const Schema = mongoose.Schema({
        title: String,
        description: String,
        published: Boolean
    },
    {
        timestamps: true
    }
    )

    Schema.method("toJSON", function(){
        const {__v, _id , ...object} = this.toObject()
        object.id = _id
        return object
    })

    Schema.plugin(mongoosePaginate)

    const Tutorial = mongoose.model("Tutorial", Schema)
    return Tutorial
}