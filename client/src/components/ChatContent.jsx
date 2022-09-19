/* import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { getUser, getChatById, deleteSchoolById } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function ChatContent({ id = "63279ce3d8ca8a2f96ae93b2" }) {
  if (id === null) {
    return (
      <div>
        <h3>No hay id</h3>
      </div>
    );
  }
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const idGet = currentUser !== null ? currentUser.user._id : null;
  const { user, users, chat } = useSelector((state) => state.programandoando);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    if (id !== "no se repiten") {
      dispatch(getChatById(id));
    }
    setContador(contador + 1);
  }, [chat.content.length]);

  //F, sigue rompiendo este while
  while (Object.keys(chat)) {
    setTimeout(() => {
      if (id !== "no se repiten") {
        dispatch(getChatById(id));
      }
    }, 1000);
  }

  if (Object.keys(chat).length) {
    return (
      <div style={{ background: "cadetblue", color: "aliceblue" }}>
        <h3>
          Recibí la siguiente INFO:{" "}
          {chat.content.map((con) => (
            <div>
              <strong>{con.author.name}: </strong>
              <span>{con.content}</span>
            </div>
          ))}
        </h3>
      </div>
    );
  }
}

export default ChatContent;
 */
