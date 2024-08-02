const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { string } = require("zod");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
       return next();
    }
    try {
        const saltRound = 15;
        const hashPassword = bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_KEY,
            {
                expiresIn: "15d"
            }
        )
    } catch (error) {
        console.error(error)
        return null;
    }
};

userSchema.methods.generateResetToken = async function () {
    // Generate a reset token using crypto
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash the token using bcrypt
    const salt = await bcrypt.genSalt(15);
    this.resetPasswordToken = await bcrypt.hash(resetToken, salt);
  
    // Set token expiration time to 10 min
    this.resetPasswordExpires =Date.now() + 10 * 60 * 1000; // 10 min 
    return resetToken;
  };


const User = new mongoose.model('User', userSchema);

module.exports = User; 
