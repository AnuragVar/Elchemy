import mongoose, { Schema } from "mongoose";

const communicationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // References the 'Customer' model
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Stores the current timestamp by default
  },
  conversation: {
    type: String,
    required: true,
    trim: true,
  },
});

const Communication = mongoose.model('Communication', communicationSchema);

export default Communication