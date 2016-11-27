import { User, Location } from '../models';
import bcrypt from 'bcrypt';

const resolveFunctions = {
  Query: {
    users() {
      return User.find();
    },
    locations() {
      return Location.find();
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
    }
  }
};

export default resolveFunctions;
