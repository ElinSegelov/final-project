import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrtpt from 'bcrypt';
import { format } from 'date-fns'

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
    // glöm inte regex
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
    required: false
  },
  eventTime: {
    type: String,
    required: false // Check if is needed to be required
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
  }
});