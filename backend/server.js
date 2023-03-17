import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./Models";
import { applyForSpot } from "./Endpoints/Events/ApplyForSpot";
import { createEvent } from "./Endpoints/Events/CreateEvent";
import { deleteEvent } from "./Endpoints/Events/DeleteEvent";
import { getEvents } from "./Endpoints/Events/GetEvents";
import { updateEvent } from "./Endpoints/Events/UpdateEvent";
import { deleteUser } from "./Endpoints/User/DeleteUser";
import { getUserInfo } from "./Endpoints/User/GetUserInfo";
import { loginUser } from "./Endpoints/User/LoginUser";
import { registerUser } from "./Endpoints/User/RegisterUser";
import { updateUserInfo } from "./Endpoints/User/UpdateUserInfo";
import { sendFriendRequest } from "./Endpoints/User/friends/SendFriendRequest";
import { acceptFriendRequest } from "./Endpoints/User/friends/AcceptFriendRequest";
import { boardGameData } from "./Endpoints/APIProxy/BGA";
import { locations } from "./Endpoints/Events/Locations";
import { aboutUs } from "./Endpoints/Content/AboutUs";
import { cancelFriendRequest } from "./Endpoints/User/friends/CancelFriendRequest";
import { removeFriend } from "./Endpoints/User/friends/RemoveFriend";



dotenv.config();
mongoose.set('strictQuery', true);

export const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      });
    };
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.stack
    });
  };
};

// Routes
app.get("/", (_, res) => {
  res.send("This is Octahedron API");
});

// -------------------------------- USER --------------------------------

app.post("/register", registerUser);
app.post("/login", loginUser);

app.post("/friends", authenticateUser);
app.post("/friends", sendFriendRequest);

app.patch("/friends", authenticateUser);
app.patch("/friends", acceptFriendRequest);

app.patch("/cancel-request", authenticateUser);
app.patch("/cancel-request", cancelFriendRequest);

app.delete("/friends", authenticateUser);
app.delete("/friends", removeFriend);

app.get("/user", authenticateUser);
app.get("/user", getUserInfo);

// This allows the user to update or delete the user profile
app.patch("/user", authenticateUser);
app.patch("/user", updateUserInfo);

app.delete("/user", authenticateUser);
app.delete("/user", deleteUser);

// -------------------------------- EVENTS ------------------------------
app.post("/event", authenticateUser);
app.post("/event", createEvent);

// If user is not authenticated they get limited info about the events, if user is authenticated they get all event info.
app.get("/event", getEvents);

// This allows the user to delete an event
app.delete("/event", authenticateUser);
app.delete("/event", deleteEvent);

// This allows the user to update event
app.patch("/event", authenticateUser);
app.patch("/event", updateEvent);

app.post("/applyForSpot", authenticateUser);
app.post("/applyForSpot", applyForSpot);

app.get("/locations", locations);

// -------------------------------- CONTENT ------------------------------

app.post("/bga", authenticateUser);
app.post("/bga", boardGameData);

app.get("/aboutUs", aboutUs);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
