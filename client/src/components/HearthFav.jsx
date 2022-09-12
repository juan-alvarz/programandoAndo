import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser,getFavorites,
   } from "../redux/actions";
import axios from "axios";

export default function HearthFav({ course,userObj }) {
  const { user } = useSelector((state) => state.programandoando);
  const { favoritesUser } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch()
  console.log(favoritesUser)
  // console.log(favoritesUser)
  // const dispatch = useDispatch();
  const [contador,setContador] = useState(0)
  
  let userID = userObj.user._id
  let courseID = course._id
  // console.log(userID)
  // console.log(courseID)

  const handleAdd = () =>{ 
    // dispatch(addFavorite(courseID,userID))
    addFavorite2(courseID,userID)
    setStatus("like")        
    dispatch(getFavorites(userID))
    setContador(contador+1)  
  }

  const handleDelete = () =>{ 
    // dispatch(deleteFavorite(courseID,userID))
    deleteFavorite2(courseID,userID)
    setStatus("unlike")  
    dispatch(getFavorites(userID))        
    setContador(contador+1)  
  }
  const [status,setStatus] = useState("")

  useEffect (() =>{
    dispatch(getFavorites(userID))
    console.log(contador)
  },[dispatch,contador])

  // console.log(status)
  // console.log(course);
  // let userNuevo = JSON.parse(JSON.stringify(user ? user : null));
  // const [favoritoAgregado, setFavoritoAgregado] = useState("");
  const deleteFavorite2 = async (courseId,userId) => {
    const response = await axios.put(`http://localhost:3001/api/users/deleteFavorites/${userId}/`,
    [courseId]);
    return response.data;
  };

  const addFavorite2 = async (courseId,userId) => {
    const response = await axios.put(`http://localhost:3001/api/users/addFavorites/${userId}/`,
    [courseId]);
    return response.data;
  };


  
  
 
  
  let existFavorite = favoritesUser.find((e) => e._id === course._id)
  
  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignContent: "center",
        maxWidth: 350,
        marginTop: 10,
        cursor: "pointer",
      }}
    >
       {/* {existFavorite? setStatus("like"): setStatus("unlike")}
       <svg // SIN COLOREAR
      
       
          onClick={existFavorite? handleDelete: handleAdd}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={existFavorite?"currentColor":"none"}
          stroke-width={existFavorite? "": "1.5"}
          stroke={existFavorite? "":"currentColor" }
          class="w-6 h-6"
          value = {status}
        >
          <path
            stroke-linecap={existFavorite? "" :"round"}
            stroke-linejoin={existFavorite? "": "round"}
            d={existFavorite?"M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" 
          :"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }
          />
        </svg> */}
    
    {status === "like"?
      <svg // COLOREADO
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6"
      onClick={ handleDelete}
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>    
    :
    <svg // SIN COLOREAR
          onClick={existFavorite? handleDelete: handleAdd}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={existFavorite?"currentColor":"none"}
          stroke-width={existFavorite? "": "1.5"}
          stroke={existFavorite? "":"currentColor" }
          class="w-6 h-6"
        >
          <path
            stroke-linecap={existFavorite? "" :"round"}
            stroke-linejoin={existFavorite? "": "round"}
            d={existFavorite?"M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" 
          :"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }
          />
        </svg>
  }

{/* 
      { favoritesUser.find((e) => e._id === course._id) ? 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
          onClick={ handleDelete}
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
       : 
        <svg
          onClick={handleClick }
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>

} */}

      
    </div>
  );
}

