export const ChartFilterHandler = (event, legendItem, legend, avarageArray) => {
  const avarage = avarageArray.map((elem) => {
    return Object.keys(elem).map((field) => {
      if (!elem[field]) {
        return { [field]: 0 }
      } else {
        return { [field]: elem[field] }
      }
    })[0]
  })

  const content = document.querySelector('.progress-block-first-all span')
  const index = legendItem.datasetIndex
  const ci = legend.chart
  if (ci.isDatasetVisible(index)) {
    let check = 0
    legend.legendItems.map((elem, i) => {
      if (elem.datasetIndex !== index) {
        if (legend.legendItems[i].hidden === true) {
          check += 1
        }
      }
    })
    if (check === 5) {
      legend.legendItems.map((elem, i) => {
        ci.show(elem.datasetIndex)
        legend.legendItems[i].hidden = false
      })
      content.childNodes[1].textContent = avarage[6].all
      content.childNodes[1].textContent = avarage[6].all || '0'
      content.classList.remove(...content.classList)
      content.classList.add('all')
      return null
    } else {
      legend.legendItems.map((elem, i) => {
        if (elem.datasetIndex !== index) {
          ci.hide(elem.datasetIndex)
          legend.legendItems[i].hidden = true
        }
      })
      avarage.forEach((element, i) => {
        if (
          legend.legendItems[i] != undefined &&
          legend.legendItems[i].text === legendItem.text
        ) {
          for (let key in avarage[i]) {
            content.childNodes[1].textContent = avarage[i][key] || '0'
            content.classList.remove(...content.classList)
            content.classList.add(key)
          }
        }
      })
    }
  } else {
    ci.show(index)
    legendItem.hidden = false
    legend.legendItems.map((elem, i) => {
      if (elem.datasetIndex !== index) {
        ci.hide(elem.datasetIndex)
        legend.legendItems[i].hidden = true
      }
    })

    avarage.forEach((element, i) => {
      if (
        legend.legendItems[i] != undefined &&
        legend.legendItems[i].text === legendItem.text
      ) {
        for (let key in avarage[i]) {
          content.childNodes[1].textContent = avarage[i][key] || '0'
          content.classList.remove(...content.classList)
          content.classList.add(key)
        }
      }
    })
  }
}
