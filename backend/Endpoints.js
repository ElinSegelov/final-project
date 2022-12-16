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
}

export const createEvent = async (req, res) => {
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
};

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

/* export const updateUserInfo = async (req, res) => {
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
}; */

/* ------------------------------  ------------------------------ */
/* ------------------------------  ------------------------------ */
/* ------------------------------  ------------------------------ */
/* ------------------------------  ------------------------------ */
/* ------------------------------  ------------------------------ */
/* ------------------------------  ------------------------------ */