import React from "react";
import axios from "axios";
import { useEffect } from "react";
function ChatContent({ message }) {
  return (
    <div>
      <h3>Recibí la siguiente INFO: {message}</h3>
    </div>
  );
}

export default ChatContent;
