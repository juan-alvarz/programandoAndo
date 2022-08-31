import { configureStore } from "@reduxjs/toolkit";
import programandoando from "./slice";

export default configureStore({
  reducer: {
    programandoando: programandoando,
  },
});
