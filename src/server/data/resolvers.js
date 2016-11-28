import { User, Location, Quote } from '../models';
import { generateSessionToken } from '../utils';
import bcrypt from 'bcrypt';

const resolveFunctions = {
  User: {
    quotes({ id }) {
      return Quote.find({ 'phrases.person': id });
    }
  },
  Location: {
    quotes({ id }) {
      return Quote.find({ location: id });
    }
  },
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
    currentUser(_, args, { req }) {
      return req.user;
    },
    users() {
      return User.find();
    },
    user(_, { username }) {
      return User.findOne({ username });
    },
    locations() {
      return Location.find();
    },
    location(_, { id }) {
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
    async login(_, { user }, { res }) {
      const currentUser = await   User.findOne({ username: user.username });
      if (!currentUser) throw new Error('User does not exist');
      if (bcrypt.compareSync(user.password, currentUser.passwordDigest)) {
        res.cookie('OLWISCONE_SESSION', currentUser.sessionToken, { maxAge: 1000 * 60 * 60 * 24 * 365 });
        return currentUser;
      } else {
        throw new Error('Invalid password for that username');
      }
    },
    async logout(_, args, { req, res }) {
      if (req.user) {
        res.clearCookie('OLWISCONE_SESSION');
        req.user.sessionToken = generateSessionToken();
        await req.user.save();
        return req.user;
      } else {
        return null;
      }
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
