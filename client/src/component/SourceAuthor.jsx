import React from 'react'

export default function SourceAuthor({ text }) {
  return (

      <div className='flex flex-col text-yellow-900'>
        <span><strong>Auteur:</strong> {text.source_author}</span>
        <span><strong>Année:</strong> {text.source_year}</span>
        <span><strong>Titre:</strong> {text.source_title}</span>
      </div>

  )
}
