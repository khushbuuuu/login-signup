const mongoose = require ('mongoose');
const config = require('../../config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,

    })

    console.log(`MongoDB Connected`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports= connectDB