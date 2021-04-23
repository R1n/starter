import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { config } from 'dotenv'
config()

import "reflect-metadata";
import { Container } from "typedi";

import { UserResolver } from "./resolvers/UserResolver";
import {connect} from './config/typeorm';

const main = async () => {
  await connect();

  const app = express();
  app.use('/graphql')

  const schema = await buildSchema({
          container: Container,
          resolvers: [UserResolver],
          validate: false,
  });

  const appolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  appolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
