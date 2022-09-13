import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from "../redux/actions"

export const RankUserDonation = () => {

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.programandoando)
    useEffect(() => {

        dispatch(getUsers())

    }, [dispatch]);
    let ranking = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].contributor > 0) {
            ranking.push(users[i])
        }
    }
    console.log(ranking)
    return (
        <div>
            {ranking ? ranking.map(elemento => {
                return (
                    <div>
                        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="" alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {elemento.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {elemento.username}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {elemento.contributor}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                )
            }) :
                <span>No hay usuarios</span>}
        </div>
    )
}