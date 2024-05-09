import crypto from "crypto";
import bcrypt from "bcrypt";
import Token from "../models/token.model.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/email.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(
        error?.message ||
          "Something went wrong while generating referesh and access token"
      );
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim() || !email.trim() || !password.trim())
      return res.status(400).send("All details are compulsory!!");

    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(400).send("User with given email already exist!");

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    }).save();

    console.log("after", user);
    let token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
    
    await sendEmail(user.email, "Verify Email", message);

    res.send("An Email sent to your account please verify");
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

const verifyUser = async (req, res) => {
  try {
    console.log(3);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    console.log("before");

    try {
      await User.updateOne({ _id: user._id }, { verified: true });
      console.log("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
    }

    try {
      await Token.findOneAndDelete({ _id: token._id });
      console.log("Token removed successfully.");
    } catch (error) {
      console.error("Error removing token:", error);
    }

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(3);
    const { email, password } = req.body;
    // console.log(email);

    if (!password && !email) {
      return res.status(400).send("email and password are required");
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).send("User doesn't exist!!");
    }

    if (!user.verified) return res.status(404).send("User is not verified!!");

    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).send("Invalid User credentials!!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      );
  } catch (error) {
    console.log(error);
  }
};

export { verifyUser, registerUser, loginUser };
