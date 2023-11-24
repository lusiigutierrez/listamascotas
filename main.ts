import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { Pet } from "./pet.ts";
import { Query } from "./query.ts";
import { Mutation } from "./mutation.ts";
import { typeDefs } from "./graphql.ts";
import mongoose from "npm:mongoose@8.0.1";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
console.log("Te has conectado al Mongooseee!")

const resolvers = {
  Query, 
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
