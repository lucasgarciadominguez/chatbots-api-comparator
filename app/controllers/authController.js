const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = []; // simulation of database

async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Encripts the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // saves the user
    users.push({ username, password: hashedPassword });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // finds user
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(400).json({ error: "User not found" });

    // check passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    // generates JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { register, login };
