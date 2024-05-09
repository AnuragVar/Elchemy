import mongoose, { Schema } from "mongoose";


const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    trim: true,
    lowercase: true, // Converts email to lowercase for case-insensitive matching
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  gstNo: {
    type: String,
    trim: true,
  },
  frequencyOfReminder: {
    type: String, // Can be a string like "daily", "weekly", or "monthly"
    enum: ["daily", "weekly", "monthly"], // Optional: Restricts valid values (if using a string)
    // Alternatively, you could use a number for frequency (e.g., 1 for daily, 7 for weekly)
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the 'User' model
    required: true,
  }
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;