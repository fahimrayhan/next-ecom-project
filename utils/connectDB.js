import mongose from 'mongoose'

const connectDB = () => {
    if (mongooese.connections[0].readyState) {
        console.log("Already Connected")
        return;
    }
    mongoose.connect(process.env.MONGODB_URL,{
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
        error => {
            if (error) {
                throw error
            }
           console.log("Connected to MongoDB")
        }
    )
}

export default connectDB