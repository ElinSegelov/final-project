import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"
import { User, Event } from "./Models";

import { createEvent, getEvents, getUserInfo, loginUser, registerUser, /* updateUserInfo */ } from "./Endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("");
});


// DUBBELCHECK STATUS CODES

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      console.log("authenticated") // TA BORT NÄR DEN INTE BEHÖVS LÄNGRE FÖR FELSÖKNING
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

const salt = bcrypt.genSaltSync()
// -------------------------------- USER --------------------------------

app.post("/register", registerUser)


// LOGIN
app.post("/login", loginUser);

app.get("/user", authenticateUser);

app.get("/user", getUserInfo);


// CHECK OUT IF WE CAN SIMPLIFY THIS BLOCK
// THIS ALLOWS THE USER TO CHANGE THE EMAIL AND THE PASSWORD
app.patch("/user", authenticateUser);
app.patch("/user", async (req, res) => {
  const { newEmail, newPassword } = req.body;
  try {
    const selectedUser = await User.findOne({ accessToken: req.header("Authorization") });
    if (newEmail && newPassword) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { email: newEmail, password: bcrypt.hashSync(newPassword, salt) } })
      res.status(200).json({
        success: true,
        response: {
          message: "Your credentials have been updated"
        }
      })
    } else if (newPassword) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { password: bcrypt.hashSync(newPassword, salt) } })
      res.status(200).json({
        success: true,
        response: {
          message: "Your password have been updated"
        }
      })
    } else if (newEmail) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { email: newEmail } })
      res.status(200).json({
        success: true,
        response: {
          message: "Your email have been updated"
        }
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    })
  }
})

app.delete("/user", authenticateUser);
app.delete("/user", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ accessToken: req.header("Authorization") })
    if (deletedUser) {
      res.status(200).json({
        success: true,
        response: {
          deletedUser: deletedUser.username,
          message: "Your account has been deleted"
        }
      })
    } else {
      res.status(400).json({
        success: false,
        response: {
          message: "Ooops! Something went wrong. Please try again later."
        }
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
});

// ------------------------------------ EVENTS ----------------------------------------
// ENDPOINT TO CREATE EVENTS ONLY WHEN AUTHENTICATED
app.post("/event", authenticateUser);

app.post("/event", createEvent);

//If user is not authnticated they get limited info about the events, if user is authenticated they get all event info.
app.get("/event", getEvents);


//  Kolla om det ska filteras för event ID via params

//NOTE: WE COULD ADD A FIELD TO MAKE THE USER CHOOSE A NAME FOR THE EVENT
// This allows the user to delete an event
app.delete("/event", authenticateUser);
app.delete("/event", async (req, res) => {
  try {
    const { eventId } = req.body
    const user = await User.findOne({ accessToken: req.header("Authorization") })
    const deletedEvent = await Event.findOneAndDelete({ _id: eventId })
    if (user) {
      res.status(200).json({
        success: true,
        response: {
          deletedEvent: deletedEvent._id,
          message: "The event has been deleted"
        }
      })
    } else {
      res.status(400).json({
        success: false,
        response: {
          message: "Ooops! Something went wrong. Please try again later."
        }
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
});

// CHECK IF WE NEED TO ALLOW ALL INFO TO BE CHANGED WITH ELIN
// CHECK IF WE NEED CONST USER
app.patch("/event", authenticateUser);
app.patch("/event", async (req, res) => {
  const {
    _id,
    venue,
    game,
    openSpots,
    totalSpots,
    description,
    isFull
  } = req.body;
  // const user = await User.findOne({ accessToken: req.header("Authorization") })
  const selectedEvent = await Event.findOne({ _id })
  try {
    if (/* user &&  */selectedEvent) {
      await Event.findOneAndUpdate(selectedEvent._id, { $set: { venue, game, openSpots, totalSpots, description, isFull } });
      res.status(200).json({
        success: true,
        response: {
          message: "The event has been updated"
        }
      })
    } else {
      res.status(400).json({
        success: false,
        response: {
          message: "No changes were made"
        }
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
