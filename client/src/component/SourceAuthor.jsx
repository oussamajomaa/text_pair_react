import React from 'react'

export default function SourceAuthor({ text }) {
  return (
    <div className='text-red-800 '>
      <div className='flex flex-col '>
        <span><strong>Auteur:</strong> {text.source_author}</span>
        <span><strong>Année:</strong> {text.source_year}</span>
        <span><strong>Titre:</strong> {text.source_title}</span>
      </div>
    </div>
  )
}
