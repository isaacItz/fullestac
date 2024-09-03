const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
console.log(`connecting to ${url}`)
mongoose.connect(url)
const db = mongoose.connection
db.on('connected', () => {
  console.log('Mongoose connected')
})
db.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minLength: 9,
    maxLength: 9,
    validate: {
      validator: number => /\d{2,3}-\d{5,6}$/.test(number),
      message: props => `${props.value} is not a valid number`
    },
  }
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

const modl = mongoose.model('Note', contactSchema)
module.exports = modl
