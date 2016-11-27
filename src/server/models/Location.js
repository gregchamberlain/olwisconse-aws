import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: true
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
