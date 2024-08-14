import React from 'react';

export default function TargetSection({ text, id, isAligned = false }) {
    const contentRef = isAligned ? 'target_alignement' : 'target_before';

    return (
        <div className="div-par-right w-1/2 max-md:w-full p-4">
            <h3 className="text-xl font-bold mb-2 text-center">Cible</h3>
            <div className="text-red-800">
                <div className="flex flex-col">
                    <span><strong>Auteur:</strong> {text.target_author}</span>
                    <span><strong>Année:</strong> {text.target_year}</span>
                    <span><strong>Titre:</strong> {text.target_title}</span>
                </div>
            </div>
            <p ref={(el) => isAligned ? el : null}>
                <span>{text[contentRef]}</span>
                {isAligned ? null : <span>{text.target_after}</span>}
            </p>
        </div>
    );
}
