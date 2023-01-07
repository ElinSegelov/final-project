import mongoose from 'mongoose';
import crypto from 'crypto';

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
    // glöm inte validation
    type: String,
    unique: true,
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
  hostingEvents: {
    type: [EventSchema]
  },
  attendingEvents: {
    type: Array
  }
});

export const EventSchema = new mongoose.Schema({
  eventName: {
    type: String
  },
  host: {
    type: String
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
    type: String, // When events are posted the date format must be new Date().toDateString(). (DATEPICKER)
    required: true
  },
  eventTime: {
    type: String,
    required: true
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
  image: {
    type: String
  },
  isFull: {
    type: Boolean,
    default: false
  },
  pendingPartyMembers: {
    type: Array
  }
});