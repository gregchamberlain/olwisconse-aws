import { User, Location, Quote } from '../models';
import bcrypt from 'bcrypt';

const resolveFunctions = {
  Quote: {
    location({ location }) {
      return Location.findById(location);
    }
  },
  Phrase: {
    person({ person }) {
      return User.findById(person);
    }
  },
  Query: {
    users() {
      return User.find();
    },
    userByUsername(_, { username }) {
      return User.findOne({ username });
    },
    locations() {
      return Location.find();
    },
    locationById(_, { id }) {
      return Location.findById(id);
    },
    quotes() {
      return Quote.find();
    }
  },
  Mutation: {
    signup(_, { user }) {
      const salt = bcrypt.genSaltSync(10);
      const passwordDigest = bcrypt.hashSync(user.password, salt);
      return User.create({
        username: user.username,
        passwordDigest,
        sessionToken: ( Math.floor( Math.random() * 100000 ) ).toString() }
      );
    },
    createLocation(_, { location }) {
      return Location.create(location);
    },
    createQuote(_, { quote }) {
      return Quote.create(quote);
    }
  }
};

export default resolveFunctions;
