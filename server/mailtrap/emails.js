const { sender, mailtrapClient } = require('./mailtrap');
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('../mailtrap/emailTemplates');

const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);

		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify Your Email",
			html: htmlContent,
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error(`Error sending email: ${error.message}`);
	}
};

const sendWelcomeEmail = async (email, name) => {

}

const sendPasswordResetEmail = async (email, reset_URL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", reset_URL),
			category: "Password Reset",
		})
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error(`Error sending resetpassword email: ${error.message}`);
	}
}
const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];
	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password reset successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error(`Error sending resetpassword email: ${error.message}`);
	}
}

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail };
