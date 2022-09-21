import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function AgeCharts() {

    const { users } = useSelector((state) => state.programandoando);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);  

    var birthdaysMillisec = users.map(e => Date.parse(e.birthday))

    const now = Date.now()

    console.log(users)

    var diferencia = []

    for (let i = 0; i < birthdaysMillisec.length; i++){
        diferencia.push (now - birthdaysMillisec[i])
    }


    let ages = []
    
    for (let i = 0; i < diferencia.length; i++){
        ages.push((diferencia[i] / (31536000000)).toFixed(0))
    }

    // 1000 * 60 * 60 * 24 * 365 = 31536000000


    let ages16to25 = []
    let ages26to35 = []
    let ages36to45 = []
    let ages46to55 = []
    let ages56to65 = []
    let ages66to75 = []
    let moreTo76 = []

    for (let i = 0; i < ages.length; i++){
        if (ages[i] >= 16 && ages[i] <= 25){
            ages16to25.push (ages[i])
        }
        if (ages[i] >= 26 && ages[i] <= 35){
            ages26to35.push (ages[i])
        }
        if (ages[i] >= 36 && ages[i] <= 45){
            ages36to45.push (ages[i])
        }
        if (ages[i] >= 46 && ages[i] <= 55){
            ages46to55.push (ages[i])
        }
        if (ages[i] >= 56 && ages[i] <= 65){
            ages56to65.push (ages[i])
        }
        if (ages[i] >= 66 && ages[i] <= 75){
            ages66to75.push (ages[i])
        }
        if (ages[i] >= 76){
            moreTo76.push (ages[i])
        } 
    }


    const labels = ['16 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '66 - 75', '75 - 100'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Ages chart',
            data: [ages16to25.length, ages26to35.length, ages36to45.length, ages46to55.length, ages56to65.length, ages66to75.length, moreTo76.length],
            backgroundColor: ['rgb(55, 109, 109)'],
        }]
    }

  return (
    <Bar data={data}/>
  )
}

export default AgeCharts

