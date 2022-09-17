import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function CountryCharts() {

    const { users } = useSelector((state) => state.programandoando);
    const dispatch = useDispatch();

    useEffect(() => {
          dispatch(getUsers());
      }, [dispatch]); 

    // console.log(users)

    const countryUsers = users.map(e => e.country)
    
    // console.log(countryUsers)

    const countryUsersOk = countryUsers.filter(e => e.length > 2)

    // console.log(countryUsersOk)

    // const countriesWithoutRepeating = countryUsersOk.filter((item, index) => {
    //     return countryUsersOk.indexOf(item) === index
    // })

    // console.log(countriesWithoutRepeating)

    let unicosPaises = []
    let almacenadorDeVecesRepetidas = []
    let contador = 1

    for (let i = 0; i < countryUsersOk.length; i++){
        if (countryUsersOk[i+1] === countryUsersOk[i]){
            contador++;
        }
        else {
            unicosPaises.push(countryUsersOk[i]);
            almacenadorDeVecesRepetidas.push(contador);
            contador = 1
        }
    }

    console.log(unicosPaises)
    console.log(almacenadorDeVecesRepetidas)

    const [userCountry, setUserCountry] = useState ({
        labels: unicosPaises.map(e => e),
        datasets: [
            {
                label: 'Country chart',
                data: almacenadorDeVecesRepetidas.map(e => e)
            }
        ]
    })

  return (
    <Bar data={userCountry}/>
  )
}

export default CountryCharts