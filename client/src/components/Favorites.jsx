import React from 'react'
import { useSelector } from 'react-redux'

export const Favorites = () => {
  const {favoritesUser} = useSelector(state=> state.programandoando)
  return (
    <div>Favorites</div>
  )
}
