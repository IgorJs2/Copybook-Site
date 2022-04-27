import React, { Component, useEffect } from 'react'
import Chart from 'chart.js/auto'
import { languageHandler } from '../handlers/languageHandler'

export const Progress_Chart_student = ({ data_st, currentLang }) => {
  useEffect(() => {
    const progressChartRef = document
      .getElementById('progress_chart')
      .getContext('2d')

    let chartStatus = Chart.getChart('progress_chart')
    if (chartStatus != undefined) {
      chartStatus.destroy()
    }

    new Chart(progressChartRef, {
      type: 'line',
      data: {
        labels: [
          languageHandler(currentLang, 'Jan'),
          languageHandler(currentLang, 'Feb'),
          languageHandler(currentLang, 'Mar'),
          languageHandler(currentLang, 'Apr'),
          languageHandler(currentLang, 'May'),
          languageHandler(currentLang, 'Jun'),
          languageHandler(currentLang, 'Jul'),
          languageHandler(currentLang, 'Aug'),
          languageHandler(currentLang, 'Sep'),
          languageHandler(currentLang, 'Oct'),
          languageHandler(currentLang, 'Nov'),
          languageHandler(currentLang, 'Dec'),
        ],
        datasets: [
          {
            data: data_st,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        borderColor: 'white',
        backgroundColor: '#6093c1',
        scales: {
          xAxis: {
            grid: {
              display: false,
            },
            ticks: {
              color: 'white',
            },
          },
          yAxis: {
            min: 0,
            max: 12,
            grid: {
              display: false,
            },
            ticks: {
              color: 'white',
            },
          },
        },
      },
    })
  }, [data_st, currentLang])

  return <div></div>
}
