const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

const signupUser = async (req, res) => {
  const { name, email, password, role, adminsecret } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminSecret = "iam-admin";
    if (role === "admin" && adminSecret !== adminsecret)
      return res.status(400).json({ message: "Invalid admin secret" });
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "No user found for this email address" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    signupUser,loginUser
}