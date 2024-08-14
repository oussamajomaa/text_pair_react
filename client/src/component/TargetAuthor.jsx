import React from 'react'

export default function TargetAuthor({ text }) {
    return (
        <div className='text-red-800 '>
            <div className='flex flex-col '>
                <span><strong>Auteur:</strong> {text.target_author}</span>
                <span><strong>Année:</strong> {text.target_year}</span>
                <span><strong>Titre:</strong> {text.target_title}</span>
            </div>
        </div>
    )
}
