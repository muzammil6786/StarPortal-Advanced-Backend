const jwt = require('jsonwebtoken');
const User = require('../model/user');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(200).send({ msg: "User is already registered, please login" });
        } 
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully',user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_JWT_SECRET, { expiresIn: "24h" });
    res.status(201).send({ msg: "Login successful", token, refreshToken });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { register, login };
