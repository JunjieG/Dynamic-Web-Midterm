import React from 'react'

import Card from 'components/news/newscard'

import './news.css'

export default function News({ feed }) {
  console.log('news', feed)
  if (feed && feed.articles) {
    return (
      <div className="news">
        {feed.articles.map(( content, i ) => (
          <Card key={i} data={content} />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        Loading.....
      </div>
    )
  }
}
