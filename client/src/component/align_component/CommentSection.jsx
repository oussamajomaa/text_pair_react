import React, { useRef } from 'react';
const ENDPOINT = 'http://localhost:3500'
export default function CommentSection({ id, text }) {
    const textarea_comment = useRef([]);
    const save_comment = useRef([]);
    const add_comment = useRef([]);
    const btn_textarea = useRef([]);

    const addComment = () => {
        add_comment.current.style.display = 'none';
        save_comment.current.style.display = 'block';
        textarea_comment.current.style.display = 'block';
        btn_textarea.current.style.display = 'block';
    };

    const closeTextArea = () => {
        textarea_comment.current.value = '';
        textarea_comment.current.style.display = 'none';
        btn_textarea.current.style.display = 'none';
        add_comment.current.style.display = 'block';
        save_comment.current.style.display = 'none';
    };

    const saveComment = async (alignement_id) => {
        const comment = textarea_comment.current.value;
        if (comment) {
            const user_id = localStorage.getItem('id');
            const response = await fetch(`${ENDPOINT}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, alignement_id, comment })
            });

            if (response.ok) {
                console.log(await response.json());
            }

            textarea_comment.current.value = '';
            save_comment.current.style.display = 'none';
            textarea_comment.current.style.display = 'none';
            btn_textarea.current.style.display = 'none';
            add_comment.current.style.display = 'block';
        }
    };

    return (
        <div className="flex items-center gap-4 px-4 max-md:flex-col">
            <button className="btn btn-sm btn-outline w-52" onClick={addComment} ref={add_comment}>
                Ajouter un commentaire
            </button>
            <button className="btn btn-sm btn-outline w-52 save-comment" onClick={() => saveComment(text.id)} ref={save_comment}>
                Enregistrer
            </button>
            <textarea
                placeholder="Ajouter un commentaire..."
                className="hidden textarea textarea-bordered w-full m-4 border-gray border"
                ref={textarea_comment}
            ></textarea>
            <button className="hidden btn btn-circle btn-xs btn-outline absolute top-5 right-5" onClick={closeTextArea} ref={btn_textarea}>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
