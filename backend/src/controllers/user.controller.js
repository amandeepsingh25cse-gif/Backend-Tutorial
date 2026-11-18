import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const makeToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email and password are required" });
        }
        if (await User.findOne({ email })) {
            return res.status(409).json({ message: "Email already registered" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        res.status(201).json({
            message: "User registered",
            user: { id: user._id, name: user.name, email: user.email },
            token: makeToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token: makeToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const logoutUser = (req, res) => {
    res.json({ message: "Logged out. Delete the token on the client." });
};