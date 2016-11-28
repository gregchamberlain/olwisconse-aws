require("babel-polyfill");
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { OperationStore } from 'graphql-server-module-operation-store';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import { User } from './models';

const MONGO_URI = process.env.MONGO_URI || require('../../tools/config').MONGO_URI;
import typeDefs from './data/schema';
import resolvers from './data/resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(favicon(path.join(__dirname, '../../favicon.ico')));

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('dist/client'));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
} else {
  const cors = require('cors');
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}

const store = new OperationStore(schema);
const getSession = (req, res, next) => {
  User.findOne({ sessionToken: req.cookies['OLWISCONE_SESSION'] }, (err, user) => {
    if (user) req.user = user;
    next();
  });
};

store.put('query Locations{ locations { id } }');
app.use('/graphql', cookieParser(), bodyParser.json(), getSession, (req, res, next) => {
  return graphqlExpress({
    schema,
    context: { req, res },
    // formatParams(params) {
    //   if (!req.user && !(params.operationName === 'Login' || params.operationName === 'Signup' || params.operationName === 'CurrentUser')) {
    //     params.query = undefined;
    //   }
    //   return params;
    // },
    // formatError(error) {
    //   if (!req.user) return {
    //     message: 'You are not authorized to access this'
    //   };
    //   return {
    //     message: error.message
    //   };
    // }
  })(req,res, next);
});


var PORT = process.env.PORT || 3001;
mongoose.connect(MONGO_URI, (mErr) =>  {
  if (mErr) return console.error(mErr);
  console.log('MongoDB Connected');
  app.listen(PORT, function(err) {
    if (err) return console.error(err);
    console.log('Listening on port', PORT);
  });
});
