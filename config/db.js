const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(`MongoDB Connected at ${connection.connection.host}`);
}


module.exports = connectDB;

//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//