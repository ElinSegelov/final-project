import { User, Event } from './Models';
import bcrypt from 'bcrypt';
import crypto from "crypto"

const salt = bcrypt.genSaltSync()

/* ------------------------------ EVENTS ------------------------------ */
export const getEvents = async (req, res) => {
  const accessToken = req.header("Authorization");
  const allEvents = await Event.find().sort({ createdAt: "desc" });
  const basicEventInfo = allEvents.map((singleEvent) => {
    return ({
      venue: singleEvent.venue,
      game: singleEvent.game,
      eventDate: singleEvent.eventDate
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
}

// FOR THIS TO WORK, WEE NEED USER ID AS QUERY
export const createEvent = async (req, res) => {
  const { userId } = req.query
  const { venue, eventDate, game, openSpots, totalSpots, description } = req.body;
  const user = await User.findById(userId)
  try {
    const newEvent = await new Event({
      host: userId,
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
    await User.findOneAndUpdate(user,{ $addToSet: {hostingEvent: newEvent}})
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    });
  }
};

export const updateEvent = async (req, res) => {
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
    if ( selectedEvent) {
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
};

export const deleteEvent = async (req, res) => {
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
}

/* ------------------------------ REGISTER ------------------------------ */
export const registerUser = async (req, res) => {
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
};



/* ------------------------------ LOGIN ------------------------------ */
export const loginUser = async (req, res) => {
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
}

/* ------------------------------ USER ------------------------------ */
export const getUserInfo = async (req, res) => {  
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
};

// CHECK OUT IF WE CAN SIMPLIFY THIS BLOCK
export const updateUserInfo = async (req, res) => {
  const { email, password } = req.body;
  try {
    const selectedUser = await User.findOne({ accessToken: req.header("Authorization") });
    if (email && password) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { email, password: bcrypt.hashSync(password, salt) } })
      res.status(200).json({
        success: true,
        response: {
          message: "Your credentials have been updated"
        }
      })
    } else if (password) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { password: bcrypt.hashSync(password, salt) } })
      res.status(200).json({
        success: true,
        response: {
          message: "Your password have been updated"
        }
      })
    } else if (newEmail) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { email } })
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
}

export const deleteUser = async (req, res) => {
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
}
