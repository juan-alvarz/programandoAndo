import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForoById, updateForo, updateDeleteCommentorAnswer, getAllForos } from "../redux/actions";
import { useForm } from 'react-hook-form';




export default function Foro() {

    let foroId = "6325148393901f7583647c03"
    const dispatch = useDispatch();
    const { foro } = useSelector((state) => state.programandoando);
    const {register, formState: {errors}, handleSubmit} = useForm();

    const [contador, setContador] = useState(1)
  //  const [contador2, setContador2] = useState(2)
    const [state, setState] = useState({ input1: "", input2: "" })

       useEffect(() => {
        setTimeout(function(){
          dispatch(getForoById(foroId));
        }, 4000)
       }, [contador]);

       useEffect(() => {
        setTimeout(function(){
          dispatch(getForoById(foroId));
        }, 0.1)
       }, [contador]);


    const usuario = window.localStorage.getItem('user')
    let userObj = JSON.parse(usuario);
    console.log(foro)  
    // COMENTARIO 

    const [commentario, setCommentario] = useState({
      content: "",
      authorComment: userObj.user._id,
      commentId: "", // este siempre sale vacio che 
    });
  
    function handleChange(e) {
      setCommentario({...commentario, content: e.target.value,});
      setState({...state, [e.target.name]: e.target.value,})
    }
  
    function handleSubmitComment(e) {
      e.preventDefault();
      dispatch(updateForo(foroId, commentario))
      setState({input2: ""})
      setContador(contador + 1)
    }

    function deleteComment4(e, id){
      e.preventDefault()
      //return deleteComment
         dispatch(updateDeleteCommentorAnswer(foroId, {commentId: id, change: "deleteComment"}))
         dispatch(getForoById(foroId));
         setContador(contador + 1)
    }
  
    function deleteAnswer(e, id, idAnswer){
      e.preventDefault()
      //return deleteComment
      dispatch(updateDeleteCommentorAnswer(foroId, {commentId: id, change: "deleteAnswer", idAnswer: idAnswer}))
      setContador(contador + 1)
    }
  
    // RESPUESTA 
    const [respuesta, setRespuesta] = useState({
      content: "",
      authorComment: userObj.user._id,
      commentId: "",
      change: "respuesta"
    });
  
    function handleChangeRespuesta(e) {
      setRespuesta({...respuesta, commentId: e.target.dataset.commentid,  content: e.target.value, });
      setState({ ...state, input1: e.target.value})
      setContador(contador + 1)
    }
    
    function handleSubmitRespuesta(data, e) {
      e.preventDefault();
      e.target.reset()
      dispatch(updateForo(foroId, respuesta)).then(setContador(contador + 1))
      setState({ input1: ""})
      setContador(contador + 1)
    }
  
    // if (!Object.keys(course).length) {
    //   return <h2>Cargando Video!</h2>;
    // } else {
    return (
          <div>
               <p> FORO FUNCIONAL </p> 
            <form onSubmit={handleSubmit(handleSubmitRespuesta)}> 
            {Object.keys(foro).length > 0 ? (
              foro.comments.map(            
                (comment) => 
                <ol>
                  <br></br>
                  <h1>abajo un nuevo comentario</h1>
                <p>ESTE ES EL COMENTARIO: -- {comment.content}</p> 
                <p>Autor  --- {comment.authorComment? comment.authorComment.name: "no se encuenta master"}</p>
                <br></br>
                <h3>{comment.answers?.map(
                  (answer) => 
                  <ol>
                  <p> -- ESTA ES UNA ANSWER: {answer.content}</p>
                  <p>Author de la respuesta: {answer.authorComment? answer.authorComment.name: <p>No tiene autor</p>}</p>
                  {answer.authorComment? answer.authorComment._id === userObj.user._id? <button
                 className="button"
                 class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                 type="submit"
                onClick={(e) => deleteAnswer(e, comment._id, answer._id)}
                >Eliminar respuesta</button>: "" : <h1></h1>}
            </ol>
                )}
                </h3>
                <br></br>
            <h3>Comentar</h3>    <input
              type="text"
              placeholder="Comment..."
              data-commentid={comment._id}
              name="hola"
              onChange={(e) => handleChangeRespuesta(e)}
              />
            <button
              className="button"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
             onClick={(e) => handleSubmitRespuesta(e)}
           disabled={state.input1? "": true}
              > 
             Send Comment</button>  
             {comment.authorComment? userObj.user._id === comment.authorComment._id?<button
              className="button"
              type="submit"
             onClick={(e) => deleteComment4(e, comment._id)}
              > 
             Delete Comment</button> : "" : ""} 
                </ol>) 
            ) : (
              <h2>No se cumplió master</h2>
            )}
            </form>
            <br></br>
          <br></br>
         <p>INPUT PARA ENVIAR UN COMENTARIO</p> <input
              type="text"
              placeholder="Comment..."
              value= {state.input2}
              name= "input2"
              onChange={(e) => handleChange(e)}
            />
             <button
              className="button"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={(e) => handleSubmitComment(e)}
              disabled={state.input2? "": true}
              >
              Send Comment
            </button>
            <p>EL DE ARRIBA ES UN INPUT PARA UN COMENTARIO, NO UNA RESPUESTA</p>
        </div>
      )
    }
//  }