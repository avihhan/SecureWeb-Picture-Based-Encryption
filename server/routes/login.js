import express from "express";
// This will help us connect to the database
import { db_login } from "../db/connection.js";
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
import CryptoJS from "crypto-js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
db_login.createCollection("db_login");

// login -----------
router.post("/", async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;
  let collection = await db_login.collection("db_login");
  const user_dataset = await collection.findOne({ username: username });

  console.log("typed_password: ", password);
  console.log("db_password: ", user_dataset.password);

  // Check the username and password, and respond accordingly
  console.log(user_dataset);
  if (user_dataset && username === user_dataset.username) {
    if (user_dataset.password && password === user_dataset.password) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user_data: user_dataset,
      });
    } else {
      console.log("wrong password");
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } else {
    console.log("user not found");
    res.status(404).json({ success: false, message: "Invalid username" });
  }
});

// register ---------
router.post("/register", async (req, res) => {
  // Extract username and password from the request body
  try {
    const user_data = req.body;
    console.log(user_data);
    let collection = db_login.collection("db_login");
    let existingUser = await collection.findOne({
      username: user_data.username,
    });
    if (!existingUser) {
      // User does not exist, proceed with insertion
      const result = await collection.insertOne(user_data);
      console.log("Data inserted:", result.insertedId);
      res.status(200).json({ success: true, message: "Signup successful." });
    } else {
      // User already exists
      res.status(409).json({ success: false, message: "User already exists." });
    }
  } catch (err) {
    console.error("Error inserting data:", err);
  }
});

export default router;
