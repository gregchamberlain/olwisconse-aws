import mongoose from 'mongoose';

const Location = mongoose.model('Location', {
  name: { type: String, required: true }
});

export default Location;
