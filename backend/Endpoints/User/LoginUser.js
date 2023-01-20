import { User } from '../../Models';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials did not match"
      });
    };
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    });
  };
};