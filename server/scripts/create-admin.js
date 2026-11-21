// Creates (or promotes) an admin user in the database from MONGODB_URI.
// Usage: npm run create-admin -- <email> <password> [name]
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user-models");

const [email, password, name = "Admin"] = process.argv.slice(2);

if (!email || !password) {
    console.error("Usage: npm run create-admin -- <email> <password> [name]");
    process.exit(1);
}

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email });
        if (user) {
            user.isAdmin = true;
            user.password = password; // hashed by the model's pre-save hook
            await user.save();
            console.log(`Updated ${email}: admin, password reset.`);
        } else {
            await User.create({ username: name, email, phone: "0000000000", password, isAdmin: true });
            console.log(`Created admin ${email}.`);
        }
    } catch (error) {
        console.error("Failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
})();
