import React from 'react'

export default function SourceAuthor({text}) {
  return (
    <div className='author'>
            <span>{text.source_author}</span>
            <span>{text.source_year}</span>
            <span>{text.source_title}</span>
        </div>
  )
}
