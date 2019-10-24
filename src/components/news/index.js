import React from 'react'

import Card from 'components/news/newscard'

export default function News({ feed }) {
  console.log('news', feed)
  if (feed && feed.articles) {
    return (
      <div>
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
