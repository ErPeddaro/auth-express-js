const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new User({
		username: username,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		res.json(newUser);
	} catch (err) {
		err.code == 11000
			? res.json({ error: "User already registered" })
			: res.json({ error: err.message });
	}
});

module.exports = router;
