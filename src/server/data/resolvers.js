import { User, Location, Quote, Image } from '../models';
import { generateSessionToken } from '../utils';
import bcrypt from 'bcrypt';
import aws from 'aws-sdk';
const s3 = new aws.S3();

const resolveFunctions = {
  User: {
    quotes({ id }) {
      return Quote.find({ 'phrases.person': id });
    },
    profilePicture({ profilePicture }) {
      if (profilePicture) {
        return Image.findById(profilePicture);
      } else {
        return null;
      }
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
    },
    owner({ owner }) {
      if (!owner) return null;
      return User.findById(owner);
    }
  },
  Image: {
    owner({ owner }) {
      if (!owner) return null;
      return User.findById(owner);
    },
    location({ location }) {
      if (!location) return null;
      return Location.findById(location);
    },
    people({ people }) {
      if (!people.length) return people;
      return User.find({ _id: { $in: people }});
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
    },
    images() {
      return Image.find();
    }
  },
  Mutation: {
    signup(_, { user }) {
      const salt = bcrypt.genSaltSync(10);
      const passwordDigest = bcrypt.hashSync(user.password, salt);
      return User.create({
        username: user.username,
        displayName: user.displayName,
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
    async updateProfilePicture(_, { url }, { req }) {
      const image = await Image.create({ url, people: [req.user.id], owner: req.user.id });
      req.user.profilePicture = image.id;
      await req.user.save();
      return image;
    },
    getSignedUrl(_, { filename, filetype}) {
      const params = {
        Bucket: 'olwisconse',
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
      };
      return s3.getSignedUrl('putObject', params);
    },
    getSignedUrls(_, { files }) {
      return files.map(file => {
        const params = {
          Bucket: 'olwisconse',
          Key: file.name,
          Expires: 60,
          ContentType: file.type,
          ACL: 'public-read'
        };
        return s3.getSignedUrl('putObject', params);
      });
    },
    createLocation(_, { location }) {
      return Location.create(location);
    },
    createQuote(_, { quote }, { req }) {
      return Quote.create({ ...quote, owner: req.user.id });
    },
    createImages(_, { urls }, { req }) {
      const images = urls.map(url => ({ url, owner: req.user.id }));
      return Image.insertMany(images);
    },
    updateImage(_, { image }) {
      return Image.findByIdAndUpdate(image.id, image, { new: true });
    }
  }
};

export default resolveFunctions;
