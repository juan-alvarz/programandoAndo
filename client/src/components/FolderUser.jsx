import React from 'react'
import { Favorites } from './Favorites'
import UserScoringCourse from "./UserScoringCourse";


export const FolderUser = () => {
  return (
    <div>
        <div>
            <UserScoringCourse></UserScoringCourse>
        </div>
        <div>
            <Favorites></Favorites>
        </div>
    </div>
  )
}
