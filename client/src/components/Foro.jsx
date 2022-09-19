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
          <div className="bg-white w-7/12 rounded-md mb-10">
            <div style={{backgroundColor: 'rgb(17, 52, 82)'}} className='rounded-t-xl mb-5'>
               <p style={{color: 'rgb(240, 240, 240)'}} className="text-center py-5 text-xl font-bold uppercase"> General Forum </p> 
            </div>
            <div style={{height: 500}} className='flex justify-center overflow-hidden hover:overflow-y-scroll'>
            <form className="bg-white w-10/12" onSubmit={handleSubmit(handleSubmitRespuesta)}> 
            {Object.keys(foro).length > 0 ? (
              foro.comments.map(            
                (comment) => 
                <ol style={{borderWidth: 1, height: 320}} className='rounded-md my-5 border-gray-300 overflow-hidden hover:overflow-y-scroll'>
                <div className="bg-gray-400 rounded-t-md py-1">
                <p className="text-lg text-center font-bold text-white">{comment.authorComment? comment.authorComment.name: "no se encuenta master"}</p>
                </div>
                <div >
                <p className="text-md text-center font-bold pt-5">{comment.content}</p> 
                </div>
                <div className=" my-5">
                <h3>{comment.answers?.map(
                  (answer) => 
                  <ol className="bg-gray-200 my-3 mx-3 p-4 rounded-md">
                  <p className="text-sm font-bold">{answer.authorComment? answer.authorComment.name: <p>No tiene autor</p>}</p>
                  <p className="text-xs">{answer.content}</p>
                  {answer.authorComment? answer.authorComment._id === userObj.user._id? 
                  <div style={{display: "flex", justifyContent: "flex-end"}}>
                  <button
                    style={{width: 130}}
                    className="bg-gray-700 text-xs hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                    type="submit"
                    onClick={(e) => deleteAnswer(e, comment._id, answer._id)}
                    >Delete answer</button></div>: "" : <h1></h1>}
                  </ol>
                )}
                </h3>
                </div>
            <div style={{display: 'flex', justifyContent: 'center'}} className="my-5">
              <input
                className="border border-gray-300 rounded-l-md pl-3"
                type="text"
                placeholder="Comment..."
                data-commentid={comment._id}
                name="hola"
                onChange={(e) => handleChangeRespuesta(e)}
                />
              <button
              style={{width: 130, backgroundColor: 'rgb(55, 109, 109)'}}
                className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-r-md"
                type="submit"
                onClick={(e) => handleSubmitRespuesta(e)}
                disabled={state.input1? "": true}
                > 
              Send Reply</button> 
             </div> 
             {comment.authorComment? userObj.user._id === comment.authorComment._id?
             <div style={{display: "flex", justifyContent: "flex-end"}}>
             <button
              style={{width: 130}}
              className="mb-4 mr-4 bg-gray-700 text-xs hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
              type="submit"
             onClick={(e) => deleteComment4(e, comment._id)}
              > 
             Delete Comment</button></div> : "" : ""} 
                </ol>) 
            ) : (
              <h2>No se cumplió master</h2>
            )}
            </form>
            </div>
            <div style={{backgroundColor: 'rgb(17, 52, 82)'}} className='rounded-b-md'>
              <div style={{display: 'flex', justifyContent: 'center'}} className="mt-5 pt-5">
                <p style={{color: 'rgb(240, 240, 240)'}} className="uppercase mb-3 font-bold text-sm">Post your questions / comments here</p> 
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}} className="pb-5">
                <input
                style={{backgroundColor: 'rgb(17, 52, 82)'}}
                className="border border-white text-sm rounded-l-md pl-3"
                  type="text"
                  placeholder="New answer"
                  value= {state.input2}
                  name= "input2"
                  onChange={(e) => handleChange(e)}
                />
                <button
                style={{width: 130, backgroundColor: '#fff', color: 'rgb(17, 52, 82)'}}
                className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-r-md"
                  type="submit"
                  onClick={(e) => handleSubmitComment(e)}
                  disabled={state.input2? "": true}
                  >
                  Send Comment
                </button>
                </div>
              </div>
        </div>
      )
    }
//  }