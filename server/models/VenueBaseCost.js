import mongoose from 'mongoose';

const venueBaseCostSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Mumbai', 'Delhi', 'Jaipur', 'Bangalore', 'Udaipur', 'Chennai', 'Kolkata', 'Hyderabad', 'Lucknow', 'Ahmedabad']
  },
  venueTier: {
    type: String,
    required: true,
    enum: ['5-star-palace', '5-star-city', '4-star', 'resort', 'farmhouse', 'banquet', 'destination']
  },
  costPerPlate: {
    low: Number,
    medium: Number,
    high: Number
  },
  venueRent: {
    low: Number,
    medium: Number,
    high: Number
  },
  decorMultiplier: {
    low: Number,
    medium: Number,
    high: Number
  },
  accommodationPerRoom: {
    low: Number,
    medium: Number,
    high: Number
  }
}, {
  timestamps: true
});

// Compound index for unique city+venueTier
venueBaseCostSchema.index({ city: 1, venueTier: 1 }, { unique: true });

const VenueBaseCost = mongoose.model('VenueBaseCost', venueBaseCostSchema);
export default VenueBaseCost;