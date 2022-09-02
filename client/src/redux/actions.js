import axios from "axios";
import { getAllCharacters, getCharacterById } from "./characterSlice";

// export const getCharacters = () => (dispatch) => {
//   axios
//     .get("https://rickandmortyapi.com/api/character")
//     .then((res) => dispatch(getAllCharacters(res.data.results)))
//     .catch((e) => console.log(e));
// };

// export const getCharactersById = (id) => (dispatch) => {
//   axios
//     .get(`https://rickandmortyapi.com/api/character/${id}`)
//     .then((res) => dispatch(getCharacterById(res.data)))
//     .catch((e) => console.log(e));
// };
