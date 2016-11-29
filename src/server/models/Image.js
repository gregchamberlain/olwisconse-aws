import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  caption: { type: String },
  people: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
