import mongoose from 'mongoose';
import { UserSchema, EventSchema } from './Schemas';

export const User = mongoose.model("User", UserSchema);
export const Event = mongoose.model("Event", EventSchema);