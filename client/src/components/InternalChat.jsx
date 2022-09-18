import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers } from "../redux/actions";
import Error404 from "./Error404";
import axios from "axios";
import Loader from "./Loader";
import ChatContent from "./ChatContent";

function InternalChat() {
  const dispatch = useDispatch();
  // necesito el user con la sesión activa, y los usuarios disponibles para chatear
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const idGet = currentUser !== null ? currentUser.user._id : null;
  const { user, users } = useSelector((state) => state.programandoando);
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
      const payload = { author: user._id, content: message };
      setMessage("");
      await axios.put(
        `http://localhost:3001/api/chat/${chatActual[0]._id}`,
        payload
      );
    } // si no existe el chat, lo crea
    else {
      const payload = {
        transmitter: user._id,
        receiver: userActual._id,
        content: {
          author: user._id,
          content: message,
        },
      };
      await axios.post(`http://localhost:3001/api/chat/`, payload);
      setMessage("");
    }
  }

  //cambia el chat según el usuario que toquemos
  function handleUserChat(e, userToChat) {
    e.preventDefault();
    userChat = userToChat;
    commonChat = compare(user, userToChat); //user.chats = [{...}] <===> userToChat.chats = ['']
    const muestrameEsto = user.chats.filter((chat) => chat._id === commonChat);
    setChatActual(muestrameEsto);
    setUserActual(userToChat);
  }

  useEffect(() => {
    dispatch(getUsers());
    if (currentUser !== null) {
      dispatch(getUser(idGet));
    }
  }, [users]);

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
            /* 
            <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
            <div class="w-1/4">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                class="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div class="w-full">
              <div class="text-lg font-semibold">Luis1994</div>
              <span class="text-gray-500">Pick me at 9:00 Am</span>
            </div>
          </div>
            */
            <div>
              <h1>{userActual.username}</h1>
              {chatActual.length !== 0 ? (
                chatActual.map((message) =>
                  message.content?.map((cont) => (
                    <div>
                      <span>
                        <strong>{cont.author.username}:</strong> {cont.content}
                      </span>
                    </div>
                  ))
                )
              ) : (
                <span>No hay chats aún, inicia un chat!</span>
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
      </div>
    );
  }
}

export default InternalChat;
