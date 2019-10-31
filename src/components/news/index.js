import React from 'react'

import Card from 'components/news/newscard'

import './news.css'

export default function News({ feed }) {
  console.log('news', feed)
  if (feed && feed.articles) {
    return (
      <div className='newsWrapper'>
        <div className='newsBanner'>NEWS</div>
        <div className="news">
          {feed.articles.map(( content, i ) => (
            <Card key={i} data={content} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='newsWrapper'>
        News not found....
      </div>
    )
  }
}
