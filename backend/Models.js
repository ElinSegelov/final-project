import mongoose from 'mongoose';
import { UserSchema, EventSchema, LocationsSchema, AboutUsSchema } from './Schemas';

export const User = mongoose.model("User", UserSchema);
export const Event = mongoose.model("Event", EventSchema);
export const Locations = mongoose.model("Locations", LocationsSchema);
export const AboutUs = mongoose.model("AboutUs", AboutUsSchema);