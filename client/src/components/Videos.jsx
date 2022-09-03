import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Paginated } from './Paginated'
import { useEffect } from 'react'

export const Videos = (props) => {
    let name=props.name
    useEffect(() => {
        setPaginaActual(1)
      },[name]);
      
     
    let videos = props.videos
   
    const[paginaActual, setPaginaActual]= useState(1)
    const[videosPagina]= useState(4)

    const ultimoVideo = paginaActual * videosPagina 
    const primerVideo = ultimoVideo - videosPagina
    
    const videosActuales= videos.slice(primerVideo,ultimoVideo)

    const prev=()=>{
      
        if(paginaActual > 1){
  
          setPaginaActual(paginaActual-1)
        }else{
          setPaginaActual(paginaActual)
        }
      }
      const next=()=>{
        
        if(paginaActual < Math.ceil(videos.length/videosPagina)){
  
          setPaginaActual(paginaActual+1)
        }else{
          setPaginaActual(paginaActual)
        }
      }
      const paginado= (numeroPagina)=>{
        setPaginaActual(numeroPagina)
      }

    return (

        <div className='mb-20'>
            <div className='grid justify-items-center mb-5'>
            <Paginated setPagina={paginado} videos={videos.length} videosPagina={videosPagina} paginaActual={paginaActual} prev={prev} next={next}></Paginated>
            </div>
            <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 sm:ml-20 md:grid-cols-2 lg:grid-cols-4" style={{width:"80%",marginLeft:"10%"}}>

            {
                videosActuales.map((elemento, index) => {
                    return (
                        <div className='' key={index}>
                            <NavLink className="w-80" to="/video">
                                <div style={{ margin: 10 }} className="w-60 h-48    p-6 bg-gray-900 rounded-lg border border-gray-200 hover:border-gray-800    hover:bg-gray-700 hover:text-black">
                                    <h3 className="mb-2  font-bold tracking-tight text-white dark:text-gray-800">{elemento.name}</h3>
                                    
                                </div>
                            </NavLink>
                        </div>
                    )
                })
            }
            </div>
        </div>

    )
}
