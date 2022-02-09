import connectDB from './loaders/mongoose';
import http from 'http'
import { app, } from './loaders/express'
import {
  MONGO_URI, port,
} from "./configs/index";

const start = async () => {

  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    // initialize database 

    connectDB()

  } catch (err) {

    console.error("error starting server", err);
  }

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`server runing on port ${port}`)
  })

};
start()


