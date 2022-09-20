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
import NavBarUser from "./NavBarUser";
import Footer from "./Footer";
import arrowMenu from "../utils/images/sidebar/control.png";
import icono from '../utils/images/MaileraIcono.png'


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
  const [open, setOpen] = useState(true);

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
    dispatch(getChatById(chatActual[0]._id));
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
  function handleReload(e) {
    e.preventDefault();
    dispatch(getChatById(chatActual[0]._id));
  }

  function updateLiveChat() {
    let count = 0;
    while (count <= 10) {
      setTimeout(() => {
        dispatch(getChatById(chatActual[0]._id));
      }, 1000);
    }
  }
  //updateLiveChat();
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

  if (currentUser === null) {
    //si no está logueado, no existe chat
    return <Error404 />;
  }
  //pantala de carga
  else if (Object.keys(users).length === 0) {
    return <Loader />;
  } else {
    return (
      <div style={{backgroundColor: 'rgb(240, 240, 240)'}}>
        <NavBarUser />
        <div className="m-5 rounded-xl" style={{ display: "flex", backgroundColor: '#fff' }}>
          {/* <div  
          className="rounded-xl"
          >
            <div className="py-3 rounded-tl-xl" style={{display: 'flex', justifyContent:'center', color: 'rgb(198, 198, 198)', backgroundColor: 'rgb(55, 109, 109)' }}>
              USERS AVAILABLE
            </div>
            {
              <ol>
                {usersToChat.map((user) => (
                  <div
                    className="m-1 p-2 rounded-md"
                    style={{borderWidth: 1, borderColor: 'rgb(55, 109, 109)'}}
                  >
                    <button onClick={(e) => handleUserChat(e, user)}>
                      {user.username}
                    </button>
                  </div>
                ))}
              </ol>
            }
          </div> */}
          <div
            style={{ backgroundColor: 'rgb(55, 109, 109)', height: 750}}
            className={`${
              open ? "w-36 md:w-96 rounded-l-xl" : "w-10 md:w-36 rounded-l-xl"
            } duration-300 h-screen p-5 pt-8 bg-blue-900 relative`}
          >
            <img
              src={arrowMenu}
              alt="arrowMenu"
              className={`z-10 absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-blue-900 ${!open &&
                "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 justify-center">
            <img
            style={{ width: 150 }}
            src={icono}
            alt="logo"
            className={`cursor-pointer duration-500 ${open &&
              "rotate-[360deg]"}`}
            />
            </div>

              <ol style={{height: 500}} className="px-3 rounded-xl mt-10 overflow-hidden hover:overflow-y-scroll scrolling-touch">
                {usersToChat.map((user) => (
                  <div
                    className="text-white"
                  >
                    {/* user.image.length > 1 ? user.image : */}
                    <div className="flex w-full my-1 p-2 text-xs rounded-md cursor-pointer" style={{borderWidth: 1, borderColor: 'rgb(201, 196, 184)'}} onClick={(e) => handleUserChat(e, user)}>
                      <img className='w-12 h-12 rounded-full' src={user.image && user.image.url.length > 1 ? user.image.url : 'https://www.pngmart.com/files/21/Account-User-PNG-Photo.png' }/>
                      <button className={`${!open && "scale-0"} origin-left duration-200 ml-3`} onClick={(e) => handleUserChat(e, user)}>
                        {user.username}
                      </button>
                    </div>
                  </div>
                ))}
              </ol>

          </div>
          <div style={{position: 'relative', width: '100%'}}>
            {Object.keys(userActual).length !== 0 ? (
              <div>
                <div
                  className="bg-gray-100 font-bold uppercase"
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    color: 'rgb(17, 52, 82)'
                  }}
                >
                  <h1 >{userActual.username}</h1>
                </div>
                <div className="mx-4 md:mx-16 my-6">
                {Object.keys(chat).length !== 0 && chatActual.length !== 0 ? (
                  chat.content.map((con) => (
                    con.author._id === idGet ? (
                    <div className="my-5">
                      {/* <strong style={{color: 'rgb(17, 52, 82)'}}>{con.author.name}: </strong> */}
                      <span style={{backgroundColor: 'rgb(17, 52, 82)'}} className='p-2 rounded-lg text-white font-bold'>{con.content}</span>
                    </div>
                    ) : (
                      <div className="flex justify-end my-5">
                        {/* <strong className='mr-2' style={{color: 'rgb(55, 109, 109)'}}>{con.author.name}: </strong> */}
                        <span style={{backgroundColor: 'rgb(55, 109, 109)'}} className='p-2 rounded-lg text-white font-bold'>{con.content}</span>
                      </div>
                    )
                  ))
                ) : (
                  <span style={{color: 'rgb(168, 76, 101)'}} className="font-bold">
                    No chats yet, start a chat with {userActual.username}!
                  </span>
                )}
                </div>
                <form style={{position: 'absolute', bottom: '0px', width: '100%'}} onSubmit={(e) => handleSubmitChat(e)}>
                  <div style={{display: "flex"}} className='h-16'>
                    <div style={{backgroundColor: 'rgb(17, 52, 82)', width: '100%'}} className="flex justify-center">
                      <input
                        style={{color: '#fff', backgroundColor: 'rgb(17, 52, 82)', width: '100%'}}
                        className='pl-10'
                        type="text"
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => handleChangeChat(e)}
                      />
                    </div>
                  </div>
                    <div style={{position: 'absolute', right: '0px', bottom: '0px'}} className="flex w-24 h-16 mr-20">
                      <button style={{backgroundColor: 'rgb(17, 52, 82)', color: '#fff', borderWidth: 1, borderColor: 'rgb(201, 196, 184)'}} className="my-4 p-2 rounded-md w-24 flex justify-center items-center" type="submit">Send</button>
                      <button style={{backgroundColor: 'rgb(17, 52, 82)', color: '#fff', borderWidth: 1, borderColor: 'rgb(201, 196, 184)'}} className="my-4 p-2 rounded-md ml-6 w-24 flex justify-center items-center" onClick={(e) => handleReload(e)}>Reload</button>
                    </div>
                </form>
              </div>
            ) : (
              <div style={{width: '100%', heigth: '100%', display: "flex", color: 'rgb(168, 76, 101)'}} className="place-content-center my-80 text-center font-bold">
                <p className="">No user selected yet</p>
              </div>
            )}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default InternalChat;
