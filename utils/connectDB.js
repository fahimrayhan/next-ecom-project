import mongose from 'mongoose'

const connectDB = () => {
    if (mongose.connections[0].readyState) {
        console.log("Already Connected")
        return;
    }
    mongose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
        error => {
            if (error) {
                console.log(error)
                throw error
            }
           console.log("Connected to MongoDB")
        }
    )
}

export default connectDB