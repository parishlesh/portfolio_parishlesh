const User = require("../models/user-models");
const sendResetEmail = require("../validators/auth-mailer");
const bcrypt = require("bcryptjs");

const home = (req, res) => {
  try {
    res.status(200).send("this is home page");
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "page not found",
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "user already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    await userCreated.save();

    res
      .status(201)
      .json({
        message: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (err) {
    const status = 500;
    const message = "Internal server error";
    const error = { status, message };
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      const error = {
        status: 400,
        message: "Invalid credentials",
        extraDetails: "Invalid Email address",
      };
      return next(error);
    }

    // const passwordValidation = await userExist.comparePassword(password);
    const passwordValidation = await userExist.comparePassword(password);

    if (passwordValidation) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      const error = {
        status: 401,
        message: "Invalid username or password",
        extraDetails: "The password provided is incorrect",
      };
      return next(error);
    }
  } catch (err) {
    const error = {
      status: 500,
      message: "Internal server error",
      extraDetails: err.message,
    };
    next(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.User;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from the user route: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "user does not exist" });
    }

    // Generate a reset token and set the expiration time
    const resetToken = await userExist.generateResetToken();
    await userExist.save();

    // Send the reset email
    await sendResetEmail(userExist.email, resetToken);

    console.log("token form the forgot passwor", sendResetEmail);

    return res.status(200).json({
      message: "Password reset link sent to email",
      link: { sendResetEmail },
    });
  } catch (err) {
    next(err); // Log the error for debugging purposes
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      extraDetails: err.message,
    });
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // Find the user by the token and check if it has not expired
    const user = await User.findOne({
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Compare the token
    const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", extraDetails: error.message });
  }
};

module.exports = { home, register, login, user, forgotPassword, resetPassword };
