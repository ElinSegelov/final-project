import { User } from '../../Models';
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync();

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
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
    };
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    });
  };
};