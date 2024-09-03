const mongoose = require('mongoose')


// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
const db = mongoose.connection
db.on('connected', () => {
  console.log('Mongoose connected')
})
db.on('disconnected', () => {
  console.log('Mongoose disconnected')
})


const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true, unique: true }
})

// contactSchema.path('name').validate(value => {
//   return (this.name == "vamos")
// })

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', contactSchema)
