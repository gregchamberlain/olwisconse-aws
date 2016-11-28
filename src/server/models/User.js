import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  profilePicture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  passwordDigest: { type: String, required: true },
  sessionToken: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;
