import React, { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timeout = setTimeout(() => {
        setRequestMessage(null);
        setRequestStatus(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [requestStatus]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const messageChangeHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    setRequestStatus("pending");

    const messageData = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setRequestStatus("error");
      setRequestMessage(data.message);
      throw new Error(data.message || "Something went wrong");
    }
    setRequestStatus("success");
    setEnteredEmail("");
    setEnteredName("");
    setEnteredMessage("");
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message..",
      message: "your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "success!!",
      message: "message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "success!!",
      message: requestMessage,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Your Name</label>
          <input
            type="text"
            id="name"
            required
            value={enteredName}
            onChange={nameChangeHandler}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={messageChangeHandler}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
