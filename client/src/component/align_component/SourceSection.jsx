import React from 'react';

export default function SourceSection({ text, id, isAligned = false }) {
    const contentRef = isAligned ? 'source_alignement' : 'source_before';
    
    return (
        <div className="div-par-left w-1/2 max-md:w-full p-4 border-r border-black">
            <h3 className="text-xl font-bold mb-2 text-center">Source</h3>
            <div className="text-red-800">
                <div className="flex flex-col">
                    <span><strong>Auteur:</strong> {text.source_author}</span>
                    <span><strong>Année:</strong> {text.source_year}</span>
                    <span><strong>Titre:</strong> {text.source_title}</span>
                </div>
            </div>
            <p ref={(el) => isAligned ? el : null}>
                <span>{text[contentRef]}</span>
                {isAligned ? null : <span>{text.source_after}</span>}
            </p>
        </div>
    );
}
