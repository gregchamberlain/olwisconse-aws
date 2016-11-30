import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  phrases: [{
    sentence: { type: String, required: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
}, {
  timestamps: true
});

const Quote = mongoose.model('Quote', QuoteSchema);

export default Quote;
