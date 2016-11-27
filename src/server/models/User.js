import mongoose from 'mongoose';

const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true },
  passwordDigest: { type: String, required: true },
  sessionToken: { type: String, required: true, unique: true }
});

export default User;
