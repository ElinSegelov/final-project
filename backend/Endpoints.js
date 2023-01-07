import { User, Event } from './Models';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import { EMAIL, EMAIL_PASSWORD } from './secrets';

const salt = bcrypt.genSaltSync()

//TODO Dela upp! En fil för events, en för användare, login, register

/* ------------------------------ EVENTS ------------------------------ */
export const getEvents = async (req, res) => {
  const accessToken = req.header("Authorization");
  const allEvents = await Event.find().sort({ createdAt: "desc" });
  //flytta basicEventinfomappningen till else-satsen
  const basicEventInfo = allEvents.map((singleEvent) => {
    return ({
      venue: singleEvent.venue,
      game: singleEvent.game,
      eventDate: singleEvent.eventDate,
      eventTime: singleEvent.eventTime,
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
  const {
    venue,
    eventDate,
    eventTime,
    game,
    openSpots,
    totalSpots,
    description,
    hostId,
    host,
    image
  } = req.body;
  //checka så att vi har fått all required data, annrs skicka status 400.
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  console.log(user)
  try {
    const newEvent = await new Event({
      hostId,
      host,
      venue,
      eventDate,
      eventTime,
      game,
      openSpots,
      totalSpots,
      description,
      image
    }).save();
    res.status(201).json({
      success: true,
      response: {
        venue: newEvent.venue,
        eventDate: newEvent.eventDate,
        eventTime: newEvent.eventTime,
        game: newEvent.game,
        eventId: newEvent._id,
        message: "Event created"
      }
    });
    await User.findByIdAndUpdate(user._id, { $addToSet: { hostingEvents: newEvent } })
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
    eventDate,
    eventTime,
    eventName,
    image
  } = req.body;
  //checka så att vi har fått all required data, annrs skicka status 400.
  //checka så att användaren som vill radera är host annars skicka 401
  const selectedEvent = await Event.findOne({ _id })
  try {
    if (selectedEvent) {
      await Event.findOneAndUpdate(selectedEvent._id, { $set: { venue, game, openSpots, totalSpots, description, eventDate, eventTime, eventName, image } });
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
          message: "Event was not found"
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
    //checka så att vi har fått all required data, annrs skicka status 400.
    //checka så att användaren som vill radera är host annars skicka 401
    const user = await User.findOne({ accessToken: req.header("Authorization") })
    const deletedEvent = await Event.findOneAndDelete({ _id: eventId })
    //checka att eventet är raderat (kolla vad findOneAndDelete returnerar) 400 om det gick dåligt
    //lägg in om eventet är deleteat i if condition på 142
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

//! Här anmäler man intresse och mail skickas till host
export const applyForSpot = async (req, res) => {
  const { userEmail, username, eventId } = req.body;
  //checka så att vi har fått all required data, annrs skicka status 400.
  if (!userEmail || !username || !eventId) {
    res.status(400).json({
      success: false,
      message: 'Request requires "userEmail", "username" and "eventId". At least one of these are missing'
    })
  } else {
    try {
      const selectedEvent = await Event.findOne({ _id: eventId })

      //try {
      if (selectedEvent) {
        //console.log('selected event', selectedEvent)
        try { //first try
          console.log('trying first')
          await Event.findOneAndUpdate(selectedEvent._id, { $push: { pendingPartyMembers: userEmail } });
          
          console.log('trying second')
          const host = await User.findOne({ _id: selectedEvent.hostId })
          console.log('host', host.email)
    
          let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: EMAIL,
              pass: EMAIL_PASSWORD,
            },
          })

          const messageToHost = {
            from: EMAIL,
            to: `${host.email}`,
            subject: `${username} wants to join your party for playing ${selectedEvent.game}`,
            html: `
            <p>
            User <span style="color:#DE605B; font-size: 1.2rem;">${username}</span> wants to join your party.
            Please contact <span style="color:#DE605B; font-size: 1.2rem;">${username}</span> on ${userEmail}
            </p>
            <div 
            style="
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: #FFF;
            background-color: #363c46;">
            <h3 style="color: #DE605B;">${selectedEvent.game}</h3>
            <img style="width: 10rem;" src=${selectedEvent.image} alt="game" />
            <p><span style="color: #DE605B;">Where?</span> ${selectedEvent.venue}</p>
            <p><span style="color: #DE605B;">When?</span> ${selectedEvent.eventTime}</p>
            <p>
            <span style="color: #DE605B;">Open spots:</span> ${selectedEvent.openSpots} / ${selectedEvent.totalSpots}
            </p>
            </div>
            `
            };
            
            /* transporter.sendMail(messageToHost, (err, info) => {
              if (err) {
                console.error(err)
                //skicka 400 med meddelande om att mail inte kunde skickas till host
              } else {
                console.log('Sent:', info.response)
                //Skicka 200 för anmälan här
              }
            }) */
            transporter.sendMail(messageToHost, (error, info) => {
              if (error) {
                console.error('line 235', error)
                //! user ska tas bort från pendingPartyMembers om mail inte kan skickas till host
                //!DETTA BORDE GÖRAS GENOM ATT SÖKA UPP userEmail OCH RADERA DEN INTE SÅ SOM DET ÄR GJORT NU
                Event.findOneAndUpdate(selectedEvent._id, { $pop: { pendingPartyMembers: userEmail } });
              } else {
                console.log('Sent:', info.response)
                
              }
            }) 
            return(
              //! DET HÄR FUCKAR UPP: HOPPAR IN I CATCH PGA res.status is not a funtion !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            res.stauts(200).json({
              success: true,
              message: 'User has been added to list of pendingPartyMembers and the host of the event has been notified' //!behöver bättre meddelande
            }))
        } catch (err) {
          res.status(400).json({
            success: false,
            error: err.stack,
            response: 'Could not add user to list of pendingPartyMembers FAIL'
          })
          console.log('failing first')
        }

        
        } //om man har kunnat lägga till och skicka mail, skickas 200
        /* if(!err) {
          res.stauts(200).json({
          success: true,
          message: 'User has been added to list of pendingPartyMembers and the host of the event has been notified' //!behöver bättre meddelande
        })
      } */
      } /* else { //! Är den här else-satsen meningsfull?
        res.status(400).json({
          success: false,
          response: {
            message: "Could not find event"
          }
        })
      } */
     /* catch (err) { // om selected event inte finns, kommer user inte läggas till i pendingPartyMembers
          res.status(400).json({
            success: false,
            error: err.message,
            response: 'Could not add user to list of pendingPartyMembers'
          })

        } */
  
      //lägg in resultat av await i variabel. returnera 400 om vi inte lyckas uppdatera (kolla vad findOneAndUpdate returnerar)
   /*    res.status(200).json({
        success: true,
        response: {
          message: "User added to pendingPartyMembers list"
        }
      }) */

      //Lägg logik för mail innan vi skickar 200. Checka för att mail har gått iväg till host. 
   catch (err) {
    res.status(500).json({
      success: false,
      response: err.message
    })
  }
}
}
/* ------------------------------ REGISTER ------------------------------ */
export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  //checka så att vi har fått all required data, annrs skicka status 400. Vi kan lägga in check för längd på pwd om vi vill
  try {
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Passwords must be at least 8 characters long"
      });
    } else {
      const newUser = await new User({
        username,
        password: bcrypt.hashSync(password, salt),
        email
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id,
          email: newUser.email,
          userCreatedAt: newUser.userCreatedAt,
          hostingEvents: newUser.hostingEvents,
          attendingEvents: newUser.attendingEvents
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
  const { email, password } = req.body;
  //checka så att vi har fått all required data, annrs skicka status 400.
  try {
    const user = await User.findOne({
      email
    })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          accessToken: user.accessToken,
          userId: user._id,
          email: user.email,
          userCreatedAt: user.userCreatedAt,
          hostingEvents: user.hostingEvents,
          attendingEvents: user.attendingEvents
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
  const allUserInfo = []; //! radera
  const selectedUser = await User.findOne({ accessToken: req.header("Authorization") });
  allUserInfo.push(selectedUser); //! radera
  // see if this can be done smoother - create new object
  //! lägg in alla properties som vi vill ha, redaera logik för att mappaa/array
  /* const userInfo = {
    username: selectedUser.username
  } */
  const userInfo = allUserInfo.map((user) => {
    return ({
      username: user.username,
      email: user.email,
      hostingEvents: user.hostingEvents,
      attendingEvent: user.attendingEvents
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
  //checka så att vi har fått all required data, annrs skicka status 400.
  try {
    const selectedUser = await User.findOne({ accessToken: req.header("Authorization") });
    //! funkr det med bara if-statement om man vill uppdatera ena? Kolla annars på optional setting i databasen
    if (selectedUser && email && password) {
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
    //! Hur hantera events och anmälningar när man tar bort user. Ska partymembers meddelas?
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
