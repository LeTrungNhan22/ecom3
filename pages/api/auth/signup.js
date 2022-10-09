//sign up api
import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  //register user always is post
  if (req.method !== "POST") {
    return;
  }
  // get name, email, password from request body
  const { name, email, password } = req.body;
  //check condition input
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }
  await db.connect();
  //check exist user
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    await db.disconnect();
    return;
  }
  //create new user account
  const newUser = await User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin,
  });
};

export default handler;
