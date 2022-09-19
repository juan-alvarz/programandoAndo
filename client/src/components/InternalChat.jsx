import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUsers,
  getChatById,
  update_getChat,
  create_getChat,
} from "../redux/actions";
import Error404 from "./Error404";
import axios from "axios";
import Loader from "./Loader";
import ChatContent from "./ChatContent";

function InternalChat() {
  const dispatch = useDispatch();
  // necesito el user con la sesión activa, y los usuarios disponibles para chatear
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const idGet = currentUser !== null ? currentUser.user._id : null;
  const { user, users, chat } = useSelector((state) => state.programandoando);
  const usersToChat = users.filter((user) => user._id !== idGet); //no puedes chatear contigo mismo...

  let userChat = {}; //usuario con el cual quiero chatear estando en mi cuenta
  let commonChat = "no se repiten";
  const [userActual, setUserActual] = useState({});
  const [chatActual, setChatActual] = useState([]);
  const [message, setMessage] = useState("");

  //saca el id de los chats necesarios
  function compare(user1, user2) {
    let repite = "no se repiten";
    for (let i = 0; i < user1.chats.length; i++) {
      for (let j = 0; j < user2.chats.length; j++) {
        if (user1.chats[i]._id === user2.chats[j]) {
          repite = user2.chats[j];
        }
      }
    }
    return repite;
  }

  function handleUserChat(e, userToChat) {
    e.preventDefault();
    userChat = userToChat;
    commonChat = compare(user, userToChat); //user.chats = [{...}] <===> userToChat.chats = ['']
    if (commonChat !== "no se repiten") {
      dispatch(getChatById(commonChat));
    }
    const chatNow = user.chats.filter((chat) => chat._id === commonChat);
    setChatActual(chatNow);
    setUserActual(userToChat);
  }

  //el cambio del chat lo va ejecutando
  function handleChangeChat(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  //envía el chat
  async function handleSubmitChat(e) {
    e.preventDefault();
    //si existe el chat, lo actualiza
    if (chatActual.length !== 0) {
      const mensaje = message;
      const payload = { author: user._id, content: mensaje };
      setMessage("");
      dispatch(update_getChat(chatActual[0]._id, payload));
    } else {
      const mensaje = message;
      const payload = {
        transmitter: user._id,
        receiver: userActual._id,
        content: {
          author: user._id,
          content: mensaje,
        },
      };
      setMessage("");
      dispatch(create_getChat(payload));
    }
  }

  //cambia el chat según el usuario que toquemos
  useEffect(() => {
    dispatch(getUsers());
    if (currentUser !== null) {
      dispatch(getUser(idGet));
    }
    if (commonChat !== "no se repiten") {
      dispatch(getChatById(commonChat));
    }
  }, [dispatch]);

  /* 
  const updateChatLive = async () => {
    let count = 0;
    while (count < 6) {
      if (commonChat !== "no se repite") {
        setTimeout(async () => {
          dispatch(getChatById(commonChat));
        }, 1000);
        count++;
      }
    }
  };
  updateChatLive(); */

  if (currentUser === null) {
    //si no está logueado, no existe chat
    return <Error404 />;
  } else if (Object.keys(users).length === 0) {
    return <Loader />;
  } else {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            border: "3px solid cadetblue",
          }}
        >
          <span style={{ color: "#21252B", background: "cadetblue" }}>
            USERS AVAILABLE
          </span>
          {
            <ol>
              {usersToChat.map((user) => (
                <div>
                  <button onClick={(e) => handleUserChat(e, user)}>
                    {user.username}
                  </button>
                  <hr />
                </div>
              ))}
            </ol>
          }
        </div>
        <div style={{ paddingLeft: "2vh", borderLeft: "5px solid gray" }}>
          {Object.keys(userActual).length !== 0 ? (
            <div>
              <h1>{userActual.username}</h1>

              {Object.keys(chat).length !== 0 ? (
                chat.content.map((con) => (
                  <div>
                    <strong>{con.author.name}: </strong>
                    <span>{con.content}</span>
                  </div>
                ))
              ) : (
                <span>
                  No hay chats aún, inicia un chat con {userActual.username}!
                </span>
              )}
              <form onSubmit={(e) => handleSubmitChat(e)}>
                <input
                  type="text"
                  placeholder="Send a message"
                  value={message}
                  onChange={(e) => handleChangeChat(e)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          ) : (
            <span>Aún no hay usuario seleccionado</span>
          )}
        </div>
        {/* <ChatContent
          id={
            commonChat !== "no se repiten"
              ? commonChat
              : "63279ce3d8ca8a2f96ae93b2"
          }
        /> */}
      </div>
    );
  }
}

export default InternalChat;
