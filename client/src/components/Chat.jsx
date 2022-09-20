import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { NavLink } from "react-router-dom";
import img from "../utils/images/ChatBotIcon2.png";

const Chat = () => {
  const [open, setOpen] = useState(false);

  const theme = {
    background: "#113452",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#A84C65",
    headerFontColor: "#C6C6C6",
    headerFontSize: "15px",
    botBubbleColor: "#A84C65",
    botFontColor: "#C6C6C6",
    userBubbleColor: "#A84C65",
    userFontColor: "#C6C6C6",
    width: 350,
  };

  const handleOpen = () => {
    if (open === false) {
      setOpen(true);
    }
    if (open === true) {
      setOpen(false);
    }
  };

  return open === false ? (
    <div
      style={{
        width: 60,
        height: 60,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <button
        className="animate-bounce"
        style={{
          width: 60,
          backgroundColor: "rgb(168, 76, 101)",
          borderRadius: "34px 8px 34px 34px",
        }}
        onClick={handleOpen}
      >
        <img style={{ padding: 10 }} src={img} alt="chatbot image" />
      </button>
    </div>
  ) : (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          style={{ width: 350 }}
          steps={[
            {
              id: "1",
              message: "What is your name?",
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              trigger: "3",
            },
            {
              id: "3",
              message: "Hi {previousValue}, nice to meet you!",
              trigger: "4",
            },
            {
              id: "4",
              message: "What questions do you have?",
              trigger: "5",
            },
            {
              id: "5",
              options: [
                { value: 1, label: "How can I help the site?", trigger: "6" },
                {
                  value: 2,
                  label: "Can I create my own study route?",
                  trigger: "7",
                },
                {
                  value: 3,
                  label: "Why cant I view a video if I am already logged in?",
                  trigger: "8",
                },
                {
                  value: 4,
                  label:
                    "Its not a question I want to ask and I want to talk to a person",
                  trigger: "9",
                },
              ],
            },
            {
              id: "6",
              message:
                "On our site we have a donation section within your User Panel! Thanks for thinking about the platform!",
              trigger: "11",
            },
            {
              id: "7",
              message:
                'Once logged in, you can click on "Create route" in the navigation bar and create it there!',
              trigger: "10",
            },
            {
              id: "10",
              component: (
                <NavLink to={"/createCourse"}>
                  <button>Click here</button>
                </NavLink>
              ),
              asMessage: true,
              trigger: "11",
            },
            {
              id: "11",
              message: "Do you need to know anything else?",
              trigger: "12",
            },
            {
              id: "12",
              options: [
                { value: "y", label: "Yes", trigger: "5" },
                { value: "n", label: "No", trigger: "13" },
              ],
            },
            {
              id: "8",
              message:
                "If you are already logged in, you may not have confirmed your email address. Please check if you have done so, after that you should have no problems!",
              trigger: "11",
            },
            {
              id: "9",
              message: "A person will be contacting you in a few moments",
              end: true,
            },
            {
              id: "13",
              message:
                "Thank you for using our ChatBot. It will always be here to help you!",
              end: true,
            },
          ]}
        />
      </ThemeProvider>
      <div style={{ width: 350, display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            width: 60,
            backgroundColor: "rgb(168, 76, 101)",
            borderRadius: "34px 8px 34px 34px",
            marginTop: 5,
          }}
          onClick={handleOpen}
        >
          <img style={{ padding: 10 }} src={img} alt="chatbot image" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
