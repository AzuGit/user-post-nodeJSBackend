import User from "../models/user.model.js";

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    //Create new user
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// User login
const userLogin = async (req, res) => {
  try {
    //check if user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check password

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //login successful

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// User logout
const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //logout successful
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { createUser, userLogin, logoutUser };
