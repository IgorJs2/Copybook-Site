import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import { languageHandler } from '../handlers/languageHandler'
import { ChartFilterHandler } from '../handlers/ChartFilterHandler'

const ProgressAll_Chart_student = ({ data, avarage, filter, currentLang }) => {
  useEffect(() => {
    const LangData = data.map((elem) => {
      return {
        label: languageHandler(currentLang, elem.label),
        data: elem.data,
        borderColor: elem.borderColor,
      }
    })

    const progressAllRef = document
      .getElementById('progressAll_chart')
      .getContext('2d')

    let chartStatus = Chart.getChart('progressAll_chart')
    if (chartStatus != undefined) {
      chartStatus.destroy()
    }

    new Chart(progressAllRef, {
      type: 'line',
      data: {
        labels: [
          languageHandler(currentLang, 'January'),
          languageHandler(currentLang, 'February'),
          languageHandler(currentLang, 'March'),
          languageHandler(currentLang, 'April'),
          languageHandler(currentLang, 'Mays'),
          languageHandler(currentLang, 'June'),
          languageHandler(currentLang, 'July'),
          languageHandler(currentLang, 'August'),
          languageHandler(currentLang, 'September'),
          languageHandler(currentLang, 'October'),
          languageHandler(currentLang, 'November'),
          languageHandler(currentLang, 'December'),
        ],
        datasets: LangData,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            onClick: (event, legendItem, legend) => {
              ChartFilterHandler(event, legendItem, legend, avarage)
            },
            labels: {
              color: 'white',
              font: {
                size: 16,
                family: 'Rubik',
              },
            },
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
  }, [data, currentLang])

  return <div></div>
}

export default ProgressAll_Chart_student
