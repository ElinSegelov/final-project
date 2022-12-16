import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrtpt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    minlenght: 3,
    maxlenght: 15,
    required: true
  }, 
  password: {
    type: String,
    required: true,
    minlenght: 8
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  },
  userCreatedAt: {
    type: Date,
    default: () => new Date()
  }, 
  hostingEvent: {
    type: Array
  },
  attendingEvent: {
    type: Array
  }
});

export const EventSchema = new mongoose.Schema({
  venue: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  eventDate: {
    type: String, // We need to doublecheck if we need to use DATE or STRING. (DATEPICKER)
    required: false
  },
  game: {
    type: String,
    required: true,
  },
  openSpots: {
    type: Number,
    required: true
  },
  totalSpots: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlenght: 300,
  },
  isFull: {
    type: Boolean,
    default: false
  },

  // Maybe it can be linked with the userID already here.
  host: {
    type: String
  }
});