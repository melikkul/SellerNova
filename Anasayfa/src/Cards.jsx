import React from 'react'
import './Cards.css'

export default function Cards({image, title, description  }) {
  return (
    <div className='card'>
        <img src={image} alt="Kart Foto"  className='card-image'/>
        <h2 className='card-title'>{title}</h2>
        <p className='card-description'>{description}</p>
    </div>
  )
}
