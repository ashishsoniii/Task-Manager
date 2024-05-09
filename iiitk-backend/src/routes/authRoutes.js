const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // For sending emails
const User = require("../models/User");

const router = express.Router();
const secretKey = "taskManager"; // Enter a secure secret key

// Step 1: User Registration with College Email

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Check if the email is already registered
		let existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				error: "Email is already registered.",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user instance
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			verified: true, // Set verified to true by default
			otp: 3333, // Set OTP to 3333
			lastLogin: Date.now(), // Set lastLogin to current time
		});

		// Save the new user to the database
		await newUser.save();

		// Generate JWT token
		const token = jwt.sign({ userId: newUser._id }, secretKey, {
			expiresIn: "7d", // Token expires in 7 days
		});

		return res.status(201).json({
			message: "User registered successfully.",
			token,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error occurred." });
	}
});
// Helper function to send new Password  to College Email (using Nodemailer, configure SMTP transport)

async function sendPasswordToemail(email, password) {
	// Configure Nodemailer transport (SMTP)
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "ashishsonii2002@gmail.com",
			pass: "deqgogkyznmmmuei",
		},
	});

	// Email data
	const mailOptions = {
		from: "ashishsonii2002@gmail.com",
		to: email,
		subject: "Your Password is",
		text: `Your random password: ${password}`,
	};

	// Send email
	await transporter.sendMail(mailOptions);
}

// Add this route to your authRoutes.js file


// Helper function to generate OTP (customize as needed)
function generateOTP() {
	return Math.floor(1000 + Math.random() * 9000).toString();
}

// Helper function to send OTP to College Email (using Nodemailer, configure SMTP transport)

async function sendOTPToemail(email, otp) {
	// Configure Nodemailer transport (SMTP)
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "ashishsonii2002@gmail.com",
			pass: "deqgogkyznmmmuei",
		},
	});

	// Email data
	const mailOptions = {
		from: "ashishsonii2002@gmail.com",
		to: email,
		subject: "OTP Verification",
		text: `Your OTP for registration: ${otp}`,
	};

	// Send email
	await transporter.sendMail(mailOptions);
}


router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user by college email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "User Not Found" });
		}

		// // Check if the user is unverified
		// if (!user.verified) {
		// 	return res.status(401).json({
		// 		error: "Account is unverified. First-time user should register first.",
		// 	});
		// }

		// Check the password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ error: "Wrong Password" });
		}

		// User matched! Generate a JWT token
		const token = jwt.sign({ userId: user._id }, secretKey, {
			expiresIn: "1000h",
		});

		// Update last login
		user.lastLogin = new Date();
		await user.save();

    // Prepare the user's info to send back
    const userInfo = {
      id: token,
      name: user.name,
      email: user.email,
      lastLogin: user.lastLogin,
    };

		// Send the response along with the token and user info
		res.status(200).json({ token, user: userInfo });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Login failed." });
	}
});

// /forgot-password - This route is used to initiate the password reset process. It sends an OTP to the user's college email address. If the user exists in the database, it generates a new OTP, sends it via email, and updates the user's OTP field.

// Step 3: Forgot Password - Send OTP to College Email
router.post("/forgot-password", async (req, res) => {
	try {
		const { email } = req.body;

		// Check if the college email is registered
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}

		// Generate and Send OTP to College Email
		const otp = generateOTP();
		await sendOTPToemail(email, otp);

		// Update the user with the new OTP
		user.otp = otp;
		await user.save();

		res.json({ message: "OTP sent to College Email for password reset." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "OTP sending failed." });
	}
});

// Step 4: Reset Password - Verify OTP and Update Password
router.post("/reset-password", async (req, res) => {
	try {
		const { email, otp, newPassword } = req.body;

		// Find the user by college email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "Authentication failed." });
		}

		// Check if the provided OTP matches the stored OTP
		if (otp !== user.otp) {
			return res.status(401).json({ error: "OTP verification failed." });
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the user's password and remove the OTP
		user.password = hashedPassword;
		user.otp = undefined; // Remove OTP
		await user.save();

		res.json({ message: "Password reset successful." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Password reset failed." });
	}
});

// Logout route
router.post("/logout", (req, res) => {
	// impleament on frontend

	res.json({ message: "Logout successful." });
});

module.exports = router;
