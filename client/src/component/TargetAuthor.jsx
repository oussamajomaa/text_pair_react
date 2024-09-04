import React from 'react'

export default function TargetAuthor({ text }) {
    return (
            <div className='flex flex-col text-yellow-900'>
                <span><strong>Auteur:</strong> {text.target_author}</span>
                <span><strong>Année:</strong> {text.target_year}</span>
                <span><strong>Titre:</strong> {text.target_title}</span>
            </div>
    )
}
