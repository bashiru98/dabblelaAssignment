import { gql } from 'apollo-server-express';
import { countryStatsDefs } from './countryStats';

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;

export default [
    typeDefs,
    countryStatsDefs
  ]
