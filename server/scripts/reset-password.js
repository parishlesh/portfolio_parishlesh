// Resets the password of an existing user in the database from MONGODB_URI.
// Usage: npm run reset-password -- <email> <newPassword>
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user-models");

const [email, password] = process.argv.slice(2);

if (!email || !password) {
    console.error("Usage: npm run reset-password -- <email> <newPassword>");
    process.exit(1);
}
if (password.length < 8) {
    console.error("Use a password of at least 8 characters.");
    process.exit(1);
}

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email });
        if (!user) {
            console.error(`No account found for ${email}. Create it with: npm run create-admin -- ${email} <password>`);
            process.exitCode = 1;
            return;
        }
        user.password = password; // hashed by the model's pre-save hook
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        console.log(`Password reset for ${email}${user.isAdmin ? " (admin)" : ""}. You can log in now.`);
    } catch (error) {
        console.error("Failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
})();
