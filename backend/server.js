import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model("User", UserSchema);

const EventSchema = new mongoose.Schema({
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

const Event = mongoose.model("Event", EventSchema);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("");
});

/* ENDPOInTS 
login
register
events (PATCH, DELETE)

*/

// DUBBELCHECK STATUS CODES

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
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
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (password.lenght < 8) {
      res.status(400).json({
        success: false,
        response: "Passwords must be at least 8 characters long"
      });
    } else {
      const newUser = await new User({
        username,
        password: bcrypt.hashSync(password, salt),
        // Should we also encrypt email?
        email
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id
        }
      });      
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username
    })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          accessToken: user.accessToken,
          userId: user._id
        }
      })
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials did not match"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    });
  }
});

app.get("/user", authenticateUser);
app.get("/user", async (req, res) => {  
  let allUserInfo = [];
  const selectedUser = await User.findOne({accessToken: req.header("Authorization")});
  allUserInfo.push(selectedUser);
// see if this can be done smoother - create new object
  const userInfo = allUserInfo.map((user) => {
    return ({
      username: user.username,
      email: user.email,
      hostingEvent: user.hostingEvent,
      attendingEvent: user.attendingEvent
    })
  })
  try {
    res.status(200).json({
      success: true,
      response: userInfo 
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    })
  }
});


// CHECK OUT IF WE CAN SIMPLIFY THIS BLOCK
// THIS ALLOWS THE USER TO CHANGE THE EMAIL AND THE PASSWORD
app.patch("/user", authenticateUser);
app.patch("/user", async (req, res) => {
  const { newEmail, newPassword } = req.body;
  try {
    const selectedUser = await User.findOne({accessToken: req.header("Authorization")});
    if (newEmail && newPassword) {
      await User.findByIdAndUpdate(selectedUser._id, {$set: {email: newEmail, password: bcrypt.hashSync(newPassword, salt)}})
      res.status(200).json({
        success: true,
        response: {
          message: "Your credentials have been updated"
        }})      
  } else if (newPassword) {
    await User.findByIdAndUpdate(selectedUser._id, {$set: {password: bcrypt.hashSync(newPassword, salt)}})
    res.status(200).json({
      success: true,
      response: {
        message: "Your password have been updated"
      }})      
    } else if (newEmail) {
      await User.findByIdAndUpdate(selectedUser._id, {$set: { email: newEmail}})
      res.status(200).json({
        success: true,
        response: {
          message: "Your email have been updated"
        }})    
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
    const deletedUser = await User.findOneAndDelete({accessToken: req.header("Authorization")})
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
// ENDPOINT TO CREATE EVENTS ONLY WHEN AUTHENTICATE
app.post("/event", authenticateUser);
app.post("/event", async (req, res) => {
  const { venue, eventDate, game, openSpots, totalSpots, description } = req.body;
  try {
    const newEvent = await new Event({
      venue,
      eventDate,
      game,
      openSpots,
      totalSpots,
      description
    }).save();
    res.status(201).json({
      success: true,
      response: {
        venue: newEvent.venue,
        eventDate: newEvent.eventDate,
        game: newEvent.game,
        eventId: newEvent._id,
        message: "Event created"
      }
    });   
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    });
  }
});

//If user is not authnticated they get limited info about the events, if user is authenticated they get all event info.
app.get("/event", async (req, res) => {
  const accessToken = req.header("Authorization");
  const allEvents = await Event.find().sort({ createdAt: "desc" });
  const basicEventInfo = allEvents.map((singleEvent) => {
    return ({
      venue: singleEvent.venue,
      game: singleEvent.game,
      eventDate: singleEvent.date
    })
  })
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      res.status(200).json({
        success: true,
        response: allEvents
      })
    } else {
      res.status(200).json({
        success: true,
        response: basicEventInfo
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    });
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
