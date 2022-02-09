import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Countrystatistic
interface CountrystatisticAttrs{
    Country:string;
    Year:string;
    Area:string;
    Total_population:string;
}


// An interface that describes the properties
// that a Countrystatistic Document has
interface CountrystatisticDoc extends mongoose.Document{
    Country:string;
    Year:string;
    Area:string;
    Total_population:string;
}
interface CountrystatisticModel extends mongoose.Model<CountrystatisticDoc> {
  build(attrs: CountrystatisticAttrs): CountrystatisticDoc;
}
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

// creating a new document with a typescript enforced static method 
countrystatisticSchema.statics.build = (attrs: CountrystatisticAttrs) => {
    return new CountryStatistic(attrs);
  };

const CountryStatistic = mongoose.model<CountrystatisticDoc, CountrystatisticModel>("CountryStatistic", countrystatisticSchema);

export { 
  CountryStatistic
}