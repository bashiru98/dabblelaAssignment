import { makeExecutableSchema } from 'apollo-server-express';
import { resolvers } from "../services/resolvers";
import typeDefs from "../services/typeDefs";
export default makeExecutableSchema({
	typeDefs,
	resolvers
});