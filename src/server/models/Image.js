import mongoose from 'mongoose';

const Image = mongoose.model('Image', {
  url: { type: String, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  caption: { type: String },
  people: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default Image;
