import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
const { ApolloServer } = require('apollo-server-express');
const rateLimit = require('express-rate-limit');
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from '../middlewares/error-handler';
import { NotFoundError } from '../utils/common/errors/not-found-error';
import Schema from '../graphql/schema';

const app = express()

const apolloServer = new ApolloServer({
  schema:Schema,
   context: async ({ req }) => {
   },
   playground:true,
   formatError: (error:Error) => {
     return {
       message: error.message
     };
   }
 });
//  await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graph' });
app.enable("trust proxy");
const corsOptions = {
  // not advisable in production
  origin: '*',
  credentials: true,

}
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());
  app.disable("x-powered-by");
  app.disable("etag");
// Rate limiting
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 mins
  max: 10
});
app.use(limiter);
  app.use((req:Request, res:Response, next:NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Content-Security-Policy-Report-Only", "default-src: https:");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT POST PATCH DELETE GET");
      return res.status(200).json({});
    }
    next();
  });

app.all("*", (req: Request, res: Response) => {
  throw new NotFoundError();
})
app.use(errorHandler)
export { app };
