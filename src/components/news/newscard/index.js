import React from 'react'
import './card.css'

export default function NewsCard({
  data = {}
}) {
  console.log('data', )
  var months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
  ];
  return (
    <div className="card">
      <figure className="snip1208">
        <img src={data.urlToImage} alt="sample66"/>
        <div className="date">
          <span className="day">{data.publishedAt.split("T")[0].split("-")[2]}</span>
          <span className="month">
            {months[data.publishedAt.split("T")[0].split("-")[1]-1]}
          </span>
        </div>
        <figcaption>
          <h3>{data.title}</h3>
          <p>
            {data.description}
          </p>
          <button>read more</button>
        </figcaption>
        <a href={data.url}></a>
      </figure>
    </div>
  );
}
