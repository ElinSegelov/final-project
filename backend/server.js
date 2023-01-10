import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./Models";
import dotenv from 'dotenv'
import {
  createEvent,
  getEvents,
  getUserInfo,
  loginUser,
  registerUser,
  updateUserInfo,
  deleteUser,
  deleteEvent,
  updateEvent,
  applyForSpot
} from "./Endpoints";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;


const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (_, res) => {
  res.send("");
});

//! DUBBELCHECK STATUS CODES

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      console.log("authenticated") //! TA BORT NÄR DEN INTE BEHÖVS LÄNGRE FÖR FELSÖKNING
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    });
  }
}

// -------------------------------- USER --------------------------------

app.post("/register", registerUser)
app.post("/login", loginUser);

app.get("/user", authenticateUser);
app.get("/user", getUserInfo);

// THIS ALLOWS THE USER TO CHANGE OR DELETE THE EMAIL AND THE PASSWORD
//! NO FUNCTIONALITY IN FE ATM
app.patch("/user", authenticateUser);
app.patch("/user", updateUserInfo);

app.delete("/user", authenticateUser);
app.delete("/user", deleteUser);

// ------------------------------------ EVENTS ----------------------------------------
// ENDPOINT TO CREATE EVENTS ONLY WHEN AUTHENTICATED
app.post("/event", authenticateUser);
app.post("/event", createEvent);

//If user is not authenticated they get limited info about the events, if user is authenticated they get all event info.
app.get("/event", getEvents);

// This allows the user to delete an event
app.delete("/event", authenticateUser);
app.delete("/event", deleteEvent);

// This allows the user to update event
app.patch("/event", authenticateUser);
app.patch("/event", updateEvent);

app.post("/applyForSpot", authenticateUser);
app.post("/applyForSpot", applyForSpot);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
