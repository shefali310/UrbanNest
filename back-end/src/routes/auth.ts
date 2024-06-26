import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import verifyToken from "../../middleware/auth";

const router = express.Router();

// Login route with validation
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password validity
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create and send a JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day in milliseconds
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong..." });
    }
  }
);

// Validate token route
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

// Logout route
router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

// Forgot password route with validation
router.post(
  "/forgot-password",
  [check("email", "Email is required").isEmail()],
  async (req: Request, res: Response) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Generate and store a secure reset token for the user
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Use nodemailer to send a password reset email
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   auth: {
      //     user: "isac.jakubowski13@ethereal.email",
      //     pass: "prCM3U5P1qQTmCsUEk",
      //   },
      // });

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'bertha.stark@ethereal.email',
            pass: 'vYPWakqHUYqKCHqqA5'
        }
    });

      const mailOptions = {
        from: "shefpanchal3@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Click the link to reset your password: http://localhost:5173/reset-password/${resetToken}`,
      };

      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } catch (error) {
      console.error("Error initiating password reset:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Password reset route with token
router.post("/reset-password/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user by reset token and check if it's still valid
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the user's password and clear the reset token
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
