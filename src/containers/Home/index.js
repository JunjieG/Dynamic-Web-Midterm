import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Chart from 'components/chart'
import News from 'components/news'
import Search from 'components/search'

import './home.css'

const apiKey = 'OmI3MDUyZWE3OTk0YjRjZGE2NTA4ZWZlYTU1MzI4ODEw'
const newsApiKey = '6eb3d7551b3e432295b3537b87e9d2cf'

export default function Home(props){
  const [stockInfo, setStockInfo] = useState({})
  const [newsfeed, setNewsfeed] = useState({})
  const [tickerSym, setTickerSym] = useState('AAPL')

  function callbackFunction(childData) {
    setTickerSym(childData)
  }

  function getStockInfo(tickerSymbol){
    axios.get(`https://api-v2.intrinio.com/securities/${tickerSymbol}/prices?api_key=${apiKey}`)
      .then(function (response) {
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

  function getNewsfeed(tickerSymbol){
    let date = new Date()
    let today = date.toISOString().split('T')[0]

    axios.get('https://newsapi.org/v2/everything?' +
          `q=${tickerSymbol}&` +
          `from=${today}` +
          'sortBy=new&' +
          `apiKey=${newsApiKey}`)
      .then(function (response) {
        setNewsfeed(response.data)
        console.log('feed', response.data)
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
    if (tickerSym === '') { // Use default value if ticker is empty
      setTickerSym('AAPL')
    }
    getStockInfo(tickerSym)
    getNewsfeed(tickerSym)
  }, [tickerSym])

  return(
    <div className='HomeWrapper'>
      <Search sendData={callbackFunction}/>
      <Chart prices={stockInfo} symbol={tickerSym} />
      <News feed={newsfeed} />
    </div>
  )
    
}
