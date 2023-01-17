import mongoose from 'mongoose';
import crypto from 'crypto';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 15,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      }
    },
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
  county: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  eventDate: {
    type: String,
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