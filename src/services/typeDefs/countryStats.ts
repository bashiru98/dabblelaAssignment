import { gql } from 'apollo-server-express';

export const countryStatsDefs = gql`
  extend type Mutation {
    createCountryStat(input: CountryStatInput!): CountryStat
    updateCountryStat(id:String!,updateFields:CountryStatUpdateInput): CountryStat
    deleteCountryStat(id: String!): CountryStat
  }

  extend type Query {
    fetchCountryStat(id:String!): CountryStat
    fetchCountryStats:[CountryStat]
  }
  
  type CountryStat {
    id: ID!
    Country: String!
    Year: String!
    Area: Int!
    Total_population: Int!

  }
  
  input CountryStatInput {
    Country: String!
    Year: String!
    Area: Int!
    Total_population: Int!

  }
  
  input CountryStatUpdateInput {
    Country: String
    Year: String
    Area: Int
    Total_population: Int
  }
`;

