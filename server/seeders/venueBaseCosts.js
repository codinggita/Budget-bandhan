import mongoose from 'mongoose';
import dotenv from 'dotenv';
import VenueBaseCost from '../models/VenueBaseCost.js';
import connectDB from '../config/db.js';

dotenv.config();

const venueBaseCosts = [
  // ========== MUMBAI ==========
  { city: 'Mumbai', venueTier: '5-star-palace', costPerPlate: { low: 3500, medium: 4500, high: 6000 }, venueRent: { low: 1500000, medium: 2000000, high: 3000000 }, decorMultiplier: { low: 0.3, medium: 0.5, high: 0.8 }, accommodationPerRoom: { low: 8000, medium: 12000, high: 18000 } },
  { city: 'Mumbai', venueTier: '5-star-city', costPerPlate: { low: 2500, medium: 3500, high: 4500 }, venueRent: { low: 800000, medium: 1200000, high: 1800000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 6000, medium: 9000, high: 14000 } },
  { city: 'Mumbai', venueTier: '4-star', costPerPlate: { low: 1800, medium: 2400, high: 3200 }, venueRent: { low: 400000, medium: 600000, high: 900000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 4000, medium: 6000, high: 9000 } },
  { city: 'Mumbai', venueTier: 'resort', costPerPlate: { low: 2200, medium: 3000, high: 4000 }, venueRent: { low: 500000, medium: 800000, high: 1200000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 5000, medium: 7500, high: 11000 } },
  { city: 'Mumbai', venueTier: 'farmhouse', costPerPlate: { low: 1500, medium: 2000, high: 2800 }, venueRent: { low: 200000, medium: 350000, high: 500000 }, decorMultiplier: { low: 0.2, medium: 0.3, high: 0.45 }, accommodationPerRoom: { low: 3000, medium: 4500, high: 6500 } },
  { city: 'Mumbai', venueTier: 'banquet', costPerPlate: { low: 1600, medium: 2200, high: 3000 }, venueRent: { low: 250000, medium: 400000, high: 600000 }, decorMultiplier: { low: 0.22, medium: 0.32, high: 0.48 }, accommodationPerRoom: { low: 3500, medium: 5000, high: 7500 } },
  { city: 'Mumbai', venueTier: 'destination', costPerPlate: { low: 4000, medium: 5500, high: 7500 }, venueRent: { low: 2000000, medium: 3000000, high: 4500000 }, decorMultiplier: { low: 0.35, medium: 0.6, high: 0.9 }, accommodationPerRoom: { low: 10000, medium: 15000, high: 22000 } },

  // ========== DELHI ==========
  { city: 'Delhi', venueTier: '5-star-palace', costPerPlate: { low: 3000, medium: 4000, high: 5500 }, venueRent: { low: 1200000, medium: 1800000, high: 2500000 }, decorMultiplier: { low: 0.3, medium: 0.5, high: 0.8 }, accommodationPerRoom: { low: 7000, medium: 10000, high: 15000 } },
  { city: 'Delhi', venueTier: '5-star-city', costPerPlate: { low: 2200, medium: 3000, high: 4000 }, venueRent: { low: 600000, medium: 1000000, high: 1500000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 5000, medium: 8000, high: 12000 } },
  { city: 'Delhi', venueTier: '4-star', costPerPlate: { low: 1500, medium: 2000, high: 2800 }, venueRent: { low: 300000, medium: 500000, high: 800000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 3500, medium: 5500, high: 8000 } },
  { city: 'Delhi', venueTier: 'resort', costPerPlate: { low: 2000, medium: 2800, high: 3800 }, venueRent: { low: 400000, medium: 700000, high: 1100000 }, decorMultiplier: { low: 0.24, medium: 0.38, high: 0.58 }, accommodationPerRoom: { low: 4500, medium: 7000, high: 10500 } },
  { city: 'Delhi', venueTier: 'farmhouse', costPerPlate: { low: 1400, medium: 1800, high: 2500 }, venueRent: { low: 180000, medium: 300000, high: 450000 }, decorMultiplier: { low: 0.19, medium: 0.28, high: 0.42 }, accommodationPerRoom: { low: 2800, medium: 4200, high: 6200 } },
  { city: 'Delhi', venueTier: 'banquet', costPerPlate: { low: 1500, medium: 2100, high: 2900 }, venueRent: { low: 220000, medium: 380000, high: 550000 }, decorMultiplier: { low: 0.2, medium: 0.3, high: 0.45 }, accommodationPerRoom: { low: 3000, medium: 4800, high: 7000 } },
  { city: 'Delhi', venueTier: 'destination', costPerPlate: { low: 3500, medium: 4800, high: 6500 }, venueRent: { low: 1500000, medium: 2200000, high: 3500000 }, decorMultiplier: { low: 0.32, medium: 0.55, high: 0.85 }, accommodationPerRoom: { low: 8000, medium: 12000, high: 18000 } },

  // ========== JAIPUR ==========
  { city: 'Jaipur', venueTier: '5-star-palace', costPerPlate: { low: 2500, medium: 3500, high: 5000 }, venueRent: { low: 800000, medium: 1200000, high: 2000000 }, decorMultiplier: { low: 0.3, medium: 0.5, high: 0.8 }, accommodationPerRoom: { low: 6000, medium: 9000, high: 14000 } },
  { city: 'Jaipur', venueTier: '5-star-city', costPerPlate: { low: 1800, medium: 2500, high: 3500 }, venueRent: { low: 400000, medium: 700000, high: 1000000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 4500, medium: 7000, high: 10000 } },
  { city: 'Jaipur', venueTier: '4-star', costPerPlate: { low: 1300, medium: 1800, high: 2500 }, venueRent: { low: 200000, medium: 350000, high: 500000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 3000, medium: 4800, high: 7000 } },
  { city: 'Jaipur', venueTier: 'resort', costPerPlate: { low: 1500, medium: 2000, high: 2800 }, venueRent: { low: 250000, medium: 400000, high: 600000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 3500, medium: 5500, high: 8000 } },
  { city: 'Jaipur', venueTier: 'farmhouse', costPerPlate: { low: 1100, medium: 1500, high: 2100 }, venueRent: { low: 120000, medium: 200000, high: 300000 }, decorMultiplier: { low: 0.18, medium: 0.26, high: 0.4 }, accommodationPerRoom: { low: 2200, medium: 3500, high: 5200 } },
  { city: 'Jaipur', venueTier: 'banquet', costPerPlate: { low: 1200, medium: 1700, high: 2400 }, venueRent: { low: 150000, medium: 250000, high: 380000 }, decorMultiplier: { low: 0.19, medium: 0.28, high: 0.42 }, accommodationPerRoom: { low: 2500, medium: 4000, high: 5800 } },
  { city: 'Jaipur', venueTier: 'destination', costPerPlate: { low: 3000, medium: 4200, high: 5800 }, venueRent: { low: 1000000, medium: 1600000, high: 2500000 }, decorMultiplier: { low: 0.3, medium: 0.52, high: 0.82 }, accommodationPerRoom: { low: 7000, medium: 10500, high: 16000 } },

  // ========== BANGALORE ==========
  { city: 'Bangalore', venueTier: '5-star-palace', costPerPlate: { low: 2800, medium: 3800, high: 5200 }, venueRent: { low: 900000, medium: 1400000, high: 2200000 }, decorMultiplier: { low: 0.28, medium: 0.48, high: 0.75 }, accommodationPerRoom: { low: 6500, medium: 9500, high: 14500 } },
  { city: 'Bangalore', venueTier: '5-star-city', costPerPlate: { low: 2200, medium: 3200, high: 4500 }, venueRent: { low: 500000, medium: 900000, high: 1400000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 5500, medium: 8500, high: 13000 } },
  { city: 'Bangalore', venueTier: '4-star', costPerPlate: { low: 1500, medium: 2200, high: 3000 }, venueRent: { low: 250000, medium: 400000, high: 600000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 3500, medium: 5500, high: 8500 } },
  { city: 'Bangalore', venueTier: 'resort', costPerPlate: { low: 1800, medium: 2500, high: 3500 }, venueRent: { low: 350000, medium: 600000, high: 900000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 4500, medium: 7000, high: 10000 } },
  { city: 'Bangalore', venueTier: 'farmhouse', costPerPlate: { low: 1300, medium: 1800, high: 2500 }, venueRent: { low: 150000, medium: 250000, high: 380000 }, decorMultiplier: { low: 0.18, medium: 0.28, high: 0.42 }, accommodationPerRoom: { low: 2800, medium: 4200, high: 6200 } },
  { city: 'Bangalore', venueTier: 'banquet', costPerPlate: { low: 1400, medium: 2000, high: 2800 }, venueRent: { low: 180000, medium: 300000, high: 450000 }, decorMultiplier: { low: 0.2, medium: 0.3, high: 0.45 }, accommodationPerRoom: { low: 3000, medium: 4800, high: 7000 } },
  { city: 'Bangalore', venueTier: 'destination', costPerPlate: { low: 3200, medium: 4500, high: 6200 }, venueRent: { low: 1100000, medium: 1800000, high: 2800000 }, decorMultiplier: { low: 0.3, medium: 0.52, high: 0.82 }, accommodationPerRoom: { low: 7500, medium: 11500, high: 17000 } },

  // ========== UDAIPUR ==========
  { city: 'Udaipur', venueTier: '5-star-palace', costPerPlate: { low: 2800, medium: 3800, high: 5500 }, venueRent: { low: 1000000, medium: 1500000, high: 2500000 }, decorMultiplier: { low: 0.3, medium: 0.5, high: 0.8 }, accommodationPerRoom: { low: 7000, medium: 11000, high: 17000 } },
  { city: 'Udaipur', venueTier: '5-star-city', costPerPlate: { low: 2000, medium: 2800, high: 3800 }, venueRent: { low: 500000, medium: 800000, high: 1200000 }, decorMultiplier: { low: 0.25, medium: 0.4, high: 0.6 }, accommodationPerRoom: { low: 5000, medium: 8000, high: 12000 } },
  { city: 'Udaipur', venueTier: '4-star', costPerPlate: { low: 1400, medium: 1900, high: 2600 }, venueRent: { low: 250000, medium: 400000, high: 600000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 3500, medium: 5500, high: 8000 } },
  { city: 'Udaipur', venueTier: 'resort', costPerPlate: { low: 1600, medium: 2200, high: 3000 }, venueRent: { low: 300000, medium: 500000, high: 800000 }, decorMultiplier: { low: 0.2, medium: 0.35, high: 0.5 }, accommodationPerRoom: { low: 4000, medium: 6500, high: 9500 } },
  { city: 'Udaipur', venueTier: 'farmhouse', costPerPlate: { low: 1200, medium: 1600, high: 2200 }, venueRent: { low: 150000, medium: 250000, high: 380000 }, decorMultiplier: { low: 0.18, medium: 0.26, high: 0.4 }, accommodationPerRoom: { low: 2500, medium: 4000, high: 5800 } },
  { city: 'Udaipur', venueTier: 'banquet', costPerPlate: { low: 1300, medium: 1800, high: 2500 }, venueRent: { low: 180000, medium: 300000, high: 450000 }, decorMultiplier: { low: 0.19, medium: 0.28, high: 0.42 }, accommodationPerRoom: { low: 2800, medium: 4500, high: 6500 } },
  { city: 'Udaipur', venueTier: 'destination', costPerPlate: { low: 3200, medium: 4500, high: 6200 }, venueRent: { low: 1200000, medium: 2000000, high: 3200000 }, decorMultiplier: { low: 0.32, medium: 0.55, high: 0.85 }, accommodationPerRoom: { low: 8000, medium: 12500, high: 19000 } },

  // ========== CHENNAI ==========
  { city: 'Chennai', venueTier: '5-star-palace', costPerPlate: { low: 2600, medium: 3600, high: 5000 }, venueRent: { low: 850000, medium: 1300000, high: 2000000 }, decorMultiplier: { low: 0.27, medium: 0.46, high: 0.72 }, accommodationPerRoom: { low: 6000, medium: 9000, high: 13500 } },
  { city: 'Chennai', venueTier: '5-star-city', costPerPlate: { low: 1900, medium: 2600, high: 3600 }, venueRent: { low: 400000, medium: 650000, high: 950000 }, decorMultiplier: { low: 0.23, medium: 0.36, high: 0.55 }, accommodationPerRoom: { low: 4500, medium: 6800, high: 10000 } },
  { city: 'Chennai', venueTier: '4-star', costPerPlate: { low: 1300, medium: 1800, high: 2400 }, venueRent: { low: 200000, medium: 320000, high: 480000 }, decorMultiplier: { low: 0.18, medium: 0.32, high: 0.46 }, accommodationPerRoom: { low: 3000, medium: 4800, high: 7000 } },
  { city: 'Chennai', venueTier: 'resort', costPerPlate: { low: 1600, medium: 2200, high: 3000 }, venueRent: { low: 280000, medium: 450000, high: 680000 }, decorMultiplier: { low: 0.22, medium: 0.36, high: 0.52 }, accommodationPerRoom: { low: 3800, medium: 5800, high: 8500 } },
  { city: 'Chennai', venueTier: 'farmhouse', costPerPlate: { low: 1100, medium: 1500, high: 2000 }, venueRent: { low: 140000, medium: 220000, high: 350000 }, decorMultiplier: { low: 0.17, medium: 0.26, high: 0.4 }, accommodationPerRoom: { low: 2200, medium: 3600, high: 5200 } },
  { city: 'Chennai', venueTier: 'banquet', costPerPlate: { low: 1200, medium: 1700, high: 2300 }, venueRent: { low: 160000, medium: 270000, high: 400000 }, decorMultiplier: { low: 0.19, medium: 0.28, high: 0.42 }, accommodationPerRoom: { low: 2500, medium: 4000, high: 5800 } },
  { city: 'Chennai', venueTier: 'destination', costPerPlate: { low: 3000, medium: 4200, high: 5800 }, venueRent: { low: 1000000, medium: 1600000, high: 2500000 }, decorMultiplier: { low: 0.3, medium: 0.52, high: 0.82 }, accommodationPerRoom: { low: 7000, medium: 10500, high: 16000 } },

  // ========== KOLKATA ==========
  { city: 'Kolkata', venueTier: '5-star-palace', costPerPlate: { low: 2400, medium: 3400, high: 4800 }, venueRent: { low: 750000, medium: 1150000, high: 1800000 }, decorMultiplier: { low: 0.26, medium: 0.44, high: 0.7 }, accommodationPerRoom: { low: 5500, medium: 8200, high: 12500 } },
  { city: 'Kolkata', venueTier: '5-star-city', costPerPlate: { low: 1700, medium: 2400, high: 3400 }, venueRent: { low: 350000, medium: 550000, high: 820000 }, decorMultiplier: { low: 0.22, medium: 0.34, high: 0.52 }, accommodationPerRoom: { low: 4000, medium: 6000, high: 9000 } },
  { city: 'Kolkata', venueTier: '4-star', costPerPlate: { low: 1200, medium: 1600, high: 2200 }, venueRent: { low: 180000, medium: 280000, high: 420000 }, decorMultiplier: { low: 0.17, medium: 0.3, high: 0.44 }, accommodationPerRoom: { low: 2800, medium: 4400, high: 6500 } },
  { city: 'Kolkata', venueTier: 'resort', costPerPlate: { low: 1500, medium: 2000, high: 2800 }, venueRent: { low: 240000, medium: 380000, high: 580000 }, decorMultiplier: { low: 0.21, medium: 0.34, high: 0.5 }, accommodationPerRoom: { low: 3500, medium: 5200, high: 7800 } },
  { city: 'Kolkata', venueTier: 'farmhouse', costPerPlate: { low: 1000, medium: 1400, high: 1900 }, venueRent: { low: 120000, medium: 190000, high: 300000 }, decorMultiplier: { low: 0.16, medium: 0.24, high: 0.38 }, accommodationPerRoom: { low: 2000, medium: 3200, high: 4800 } },
  { city: 'Kolkata', venueTier: 'banquet', costPerPlate: { low: 1100, medium: 1500, high: 2100 }, venueRent: { low: 140000, medium: 230000, high: 350000 }, decorMultiplier: { low: 0.18, medium: 0.26, high: 0.4 }, accommodationPerRoom: { low: 2300, medium: 3600, high: 5400 } },
  { city: 'Kolkata', venueTier: 'destination', costPerPlate: { low: 2800, medium: 4000, high: 5500 }, venueRent: { low: 900000, medium: 1400000, high: 2200000 }, decorMultiplier: { low: 0.28, medium: 0.48, high: 0.78 }, accommodationPerRoom: { low: 6500, medium: 9800, high: 15000 } },

  // ========== HYDERABAD ==========
  { city: 'Hyderabad', venueTier: '5-star-palace', costPerPlate: { low: 2600, medium: 3600, high: 5000 }, venueRent: { low: 800000, medium: 1250000, high: 1900000 }, decorMultiplier: { low: 0.27, medium: 0.45, high: 0.7 }, accommodationPerRoom: { low: 5800, medium: 8800, high: 13200 } },
  { city: 'Hyderabad', venueTier: '5-star-city', costPerPlate: { low: 1900, medium: 2600, high: 3600 }, venueRent: { low: 380000, medium: 600000, high: 900000 }, decorMultiplier: { low: 0.23, medium: 0.35, high: 0.53 }, accommodationPerRoom: { low: 4200, medium: 6500, high: 9800 } },
  { city: 'Hyderabad', venueTier: '4-star', costPerPlate: { low: 1300, medium: 1700, high: 2300 }, venueRent: { low: 190000, medium: 300000, high: 450000 }, decorMultiplier: { low: 0.18, medium: 0.31, high: 0.45 }, accommodationPerRoom: { low: 2900, medium: 4600, high: 6800 } },
  { city: 'Hyderabad', venueTier: 'resort', costPerPlate: { low: 1600, medium: 2100, high: 2900 }, venueRent: { low: 260000, medium: 420000, high: 630000 }, decorMultiplier: { low: 0.22, medium: 0.35, high: 0.51 }, accommodationPerRoom: { low: 3600, medium: 5500, high: 8200 } },
  { city: 'Hyderabad', venueTier: 'farmhouse', costPerPlate: { low: 1100, medium: 1500, high: 2000 }, venueRent: { low: 130000, medium: 200000, high: 320000 }, decorMultiplier: { low: 0.17, medium: 0.25, high: 0.39 }, accommodationPerRoom: { low: 2100, medium: 3400, high: 5000 } },
  { city: 'Hyderabad', venueTier: 'banquet', costPerPlate: { low: 1200, medium: 1600, high: 2200 }, venueRent: { low: 150000, medium: 250000, high: 380000 }, decorMultiplier: { low: 0.19, medium: 0.27, high: 0.41 }, accommodationPerRoom: { low: 2400, medium: 3800, high: 5600 } },
  { city: 'Hyderabad', venueTier: 'destination', costPerPlate: { low: 3000, medium: 4200, high: 5800 }, venueRent: { low: 950000, medium: 1500000, high: 2400000 }, decorMultiplier: { low: 0.29, medium: 0.5, high: 0.8 }, accommodationPerRoom: { low: 6800, medium: 10200, high: 15500 } },

  // ========== LUCKNOW ==========
  { city: 'Lucknow', venueTier: '5-star-palace', costPerPlate: { low: 2200, medium: 3200, high: 4500 }, venueRent: { low: 600000, medium: 950000, high: 1500000 }, decorMultiplier: { low: 0.25, medium: 0.42, high: 0.65 }, accommodationPerRoom: { low: 4800, medium: 7200, high: 11000 } },
  { city: 'Lucknow', venueTier: '5-star-city', costPerPlate: { low: 1600, medium: 2200, high: 3200 }, venueRent: { low: 300000, medium: 480000, high: 720000 }, decorMultiplier: { low: 0.21, medium: 0.32, high: 0.5 }, accommodationPerRoom: { low: 3500, medium: 5200, high: 8000 } },
  { city: 'Lucknow', venueTier: '4-star', costPerPlate: { low: 1100, medium: 1500, high: 2000 }, venueRent: { low: 150000, medium: 240000, high: 360000 }, decorMultiplier: { low: 0.16, medium: 0.28, high: 0.42 }, accommodationPerRoom: { low: 2400, medium: 3800, high: 5600 } },
  { city: 'Lucknow', venueTier: 'resort', costPerPlate: { low: 1400, medium: 1900, high: 2600 }, venueRent: { low: 200000, medium: 320000, high: 500000 }, decorMultiplier: { low: 0.2, medium: 0.32, high: 0.48 }, accommodationPerRoom: { low: 3000, medium: 4600, high: 7000 } },
  { city: 'Lucknow', venueTier: 'farmhouse', costPerPlate: { low: 900, medium: 1300, high: 1800 }, venueRent: { low: 100000, medium: 160000, high: 250000 }, decorMultiplier: { low: 0.15, medium: 0.22, high: 0.35 }, accommodationPerRoom: { low: 1800, medium: 2800, high: 4200 } },
  { city: 'Lucknow', venueTier: 'banquet', costPerPlate: { low: 1000, medium: 1400, high: 1900 }, venueRent: { low: 120000, medium: 200000, high: 300000 }, decorMultiplier: { low: 0.17, medium: 0.24, high: 0.38 }, accommodationPerRoom: { low: 2000, medium: 3200, high: 4800 } },
  { city: 'Lucknow', venueTier: 'destination', costPerPlate: { low: 2600, medium: 3800, high: 5200 }, venueRent: { low: 700000, medium: 1150000, high: 1800000 }, decorMultiplier: { low: 0.26, medium: 0.45, high: 0.72 }, accommodationPerRoom: { low: 5500, medium: 8500, high: 13000 } },

  // ========== AHMEDABAD ==========
  { city: 'Ahmedabad', venueTier: '5-star-palace', costPerPlate: { low: 2100, medium: 3000, high: 4200 }, venueRent: { low: 550000, medium: 850000, high: 1300000 }, decorMultiplier: { low: 0.24, medium: 0.4, high: 0.62 }, accommodationPerRoom: { low: 4500, medium: 6800, high: 10000 } },
  { city: 'Ahmedabad', venueTier: '5-star-city', costPerPlate: { low: 1500, medium: 2000, high: 2800 }, venueRent: { low: 250000, medium: 400000, high: 600000 }, decorMultiplier: { low: 0.2, medium: 0.3, high: 0.48 }, accommodationPerRoom: { low: 3000, medium: 4800, high: 7000 } },
  { city: 'Ahmedabad', venueTier: '4-star', costPerPlate: { low: 1000, medium: 1400, high: 1900 }, venueRent: { low: 120000, medium: 200000, high: 300000 }, decorMultiplier: { low: 0.15, medium: 0.26, high: 0.4 }, accommodationPerRoom: { low: 2000, medium: 3200, high: 4800 } },
  { city: 'Ahmedabad', venueTier: 'resort', costPerPlate: { low: 1300, medium: 1700, high: 2400 }, venueRent: { low: 160000, medium: 280000, high: 420000 }, decorMultiplier: { low: 0.19, medium: 0.3, high: 0.45 }, accommodationPerRoom: { low: 2800, medium: 4200, high: 6200 } },
  { city: 'Ahmedabad', venueTier: 'farmhouse', costPerPlate: { low: 800, medium: 1200, high: 1600 }, venueRent: { low: 80000, medium: 130000, high: 200000 }, decorMultiplier: { low: 0.14, medium: 0.2, high: 0.32 }, accommodationPerRoom: { low: 1500, medium: 2400, high: 3600 } },
  { city: 'Ahmedabad', venueTier: 'banquet', costPerPlate: { low: 900, medium: 1300, high: 1800 }, venueRent: { low: 100000, medium: 160000, high: 250000 }, decorMultiplier: { low: 0.16, medium: 0.22, high: 0.35 }, accommodationPerRoom: { low: 1800, medium: 2800, high: 4200 } },
  { city: 'Ahmedabad', venueTier: 'destination', costPerPlate: { low: 2500, medium: 3600, high: 5000 }, venueRent: { low: 650000, medium: 1050000, high: 1600000 }, decorMultiplier: { low: 0.25, medium: 0.43, high: 0.7 }, accommodationPerRoom: { low: 5200, medium: 8000, high: 12000 } }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await VenueBaseCost.deleteMany({});
    await VenueBaseCost.insertMany(venueBaseCosts);
    console.log('✅ Venue base costs seeded successfully for all 10 cities!');
    console.log(`📊 Total records: ${venueBaseCosts.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();