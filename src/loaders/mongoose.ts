import mongoose from 'mongoose'
import { MONGO_URI } from "../configs";
import { DatabaseConnectionError } from '../utils/common/errors/database-connection-error'
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });
        console.log('Connected to MongoDb');
    } catch (err) {

        new DatabaseConnectionError()
        
        console.error(err);
    }
};

export default connectDB;