import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function CountryCharts() {

    const { users } = useSelector((state) => state.programandoando);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]); 

    const countryUsers = users.map(e => e.country)
    

    const countryUsersOk = (countryUsers.filter(e => e.length > 2)).sort()

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

    // console.log(countryUsersOk)
    // console.log(unicosPaises)
    // console.log(almacenadorDeVecesRepetidas)

    const labels = unicosPaises.map(e => e);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Country chart',
            data: almacenadorDeVecesRepetidas.map(e => e),
            backgroundColor: ['rgb(168, 76, 101)']
        }]
    }
    
  return (
    <Bar data={data}/>
  )
}

export default CountryCharts