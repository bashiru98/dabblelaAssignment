import mongoose from 'mongoose';

const countrystatisticSchema = new mongoose.Schema({
  Country: {
    type: String,
    index: true,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Area: {
    type: String,
    required: true
  },

  Total_population: {
    type: Number,
    required: true
  },

}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const CountryStatistic = mongoose.model('CountryStatistic', countrystatisticSchema);

export { 
  CountryStatistic
}