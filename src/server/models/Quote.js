import mongoose from 'mongoose';

const Quote = mongoose.model('Quote', {
  phrases: [{
    sentence: { type: String, required: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
});

export default Quote;
