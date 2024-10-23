const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const generanerateTokenandSetCookie = require('../utils/generateTokenandSetCookie');
const { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } = require('../mailtrap/emails')
const bycrptjs = require('bcryptjs');
const crypto = require('crypto');
const verifyToken = require('../middleware/verifyToken');
// const checkAuth = require('../middleware/chechAuth');


const checkAuth = async (req,res)=>{
	try {
		const user = await User.findById(req.userId)
		if(!user){
			return res.status(400).json({ success: false, message: "User not found" });
		}
		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		return res.status(400).json({ success: false, message: error.message });
	}
}
router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', async (req, res) => {

	const { email, password, name } = req.body;
	try {
		if (!email || !password || !name) {
			return res.status(400).json("All fields are required");
		}
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(400).json({ success: false, message: "User Already Exists" });
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashPassword,
			name,
			verificationToken,
			verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000
		})

		await user.save();

		// jwt
		generanerateTokenandSetCookie(res, user._id);

		await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined
			},
		});

	} catch (error) {

		return res.status(400).json({ success: false, message: error.message });
	}
});

router.post("/verify-email", async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationExpiresAt: { $gt: Date.now() }
		})

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationExpiresAt = undefined;

		await user.save();

		// await sendWelcomeEmail(user.email, user.name);
		res.status(200).json({
			success: true, message: "Email verified successfully", user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "server error" });
	}
})

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email })

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		const validpassword = await bycrptjs.compare(password, user.password);

		if (!validpassword) {
			return res.status(400).json({ success: false, message: "Invalid Password" });
		}

		generanerateTokenandSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});

	} catch (error) {
		res.status(400).json({ success: false, message: "something went wrong" });
	}
});

router.post('/forgot-password', async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });

	} catch (error) {
		res.status(400).json({ success: false, message: "wrong" })
	}
});

router.post('/reset-password/:token', async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() }
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		const hasedPassword = await bycrptjs.hash(password, 10);
		user.password = hasedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;

		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });

	} catch (error) {
		res.status(400).json({ success: false, message: "error in reset password" });
	}
});

router.post('/logout', (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
});



module.exports = router