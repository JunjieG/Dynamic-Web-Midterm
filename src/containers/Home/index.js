import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Chart from 'components/chart'

const apiKey = 'OmI3MDUyZWE3OTk0YjRjZGE2NTA4ZWZlYTU1MzI4ODEw'

export default function Home(props){
  const [stockInfo, setStockInfo] = useState({})
  const [tickerSym, setTickerSym] = useState('AAPL')

  function getStockInfo(tickerSymbol){
    axios.get(`https://api-v2.intrinio.com/securities/${tickerSymbol}/prices?api_key=${apiKey}`)
      .then(function (response) {
        console.log(response)
        setStockInfo(response.data)
        return response.data
      })
      .catch(function (error) {
        console.log("error", error)
        setStockInfo({
          'error': 404
        })
        return error
      })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    const stockParam = urlParams.get('ticker') ? urlParams.get('ticker') : 'AAPL'
    getStockInfo(stockParam)
  }, [])

  console.log(stockInfo)
  return(
    <div>
      <Chart prices={stockInfo} />
    </div>
  )
    
}
