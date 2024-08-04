import React from 'react'

export default function TargetAuthor({ text }) {
    return (
        <div className='author'>
            <span>{text.target_author}</span>
            <span>{text.target_year}</span>
            <span>{text.target_title}</span>
        </div>
    )
}
