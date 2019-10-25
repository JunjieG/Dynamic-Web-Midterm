import React, { useEffect, useState } from 'react'

import './search.css'

export default function Search({ sendData }) {
  const [query, setQuery] = useState('')
  const [typingTimeout, setSearchTimeout] = useState(0)

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (query !== '') {
      setSearchTimeout(
        setTimeout(function () {
          console.log("query", query)
          sendData(query)
        }, 2000)
      )
    }
  }, [query])

  function onChangeHandler(e) {
    setQuery(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13){
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      console.log('keyCode', 13)
      sendData(query)
    } else {
      console.log('keyCode', e.keyCode)
    }
  }

  return (
    <div className='searchWrapper' onKeyDown={e => handleKeyDown(e)}>
      <fieldset class='field-container'>
        <label className="search-label">
          <input
            type='text'
            value={query}
            onChange={e => onChangeHandler(e)}
            className='field'
            placeholder="Search..."
          />
        </label>
        <div class='icons-container'>
          <div class='icon-search'></div>
        </div>
      </fieldset>
    </div>
  )
}
