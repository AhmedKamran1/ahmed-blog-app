import React from "react";
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      !message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.i1lr5rj.mongodb.net/?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to db" });
      return;
    }

    const db = client.db();

    try {
      const response = await db.collection("messages").insertOne(newMessage);
      newMessage.id = response.id;
      res.status(201).json({
        message: "Successfully stored message!",
        messageData: newMessage,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Storing message failed!" });
    }
    client.close();
  }
};

export default handler;
