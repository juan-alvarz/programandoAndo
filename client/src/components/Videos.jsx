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
    console.log(videos)
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

        <div >
            <div className='grid justify-items-center mb-20'>
            <Paginated setPagina={paginado} videos={videos.length} videosPagina={videosPagina} paginaActual={paginaActual} prev={prev} next={next}></Paginated>
            </div>
            <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {
                videosActuales.map((elemento, index) => {
                    return (
                        <div key={index}>
                            <NavLink to="/video">
                                <div style={{ margin: 10 }} className="w-80 h-80 hover:w-96   p-6 bg-gray-800 rounded-lg border border-gray-200   hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-gray-800">{elemento.name}</h3>
                                    <p className="font-normal text-gray-400 dark:text-gray-900">{elemento.description}</p>
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
