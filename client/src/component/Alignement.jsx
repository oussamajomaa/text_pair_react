import { useRef, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import TargetAuthor from "./TargetAuthor";
import SourceAuthor from "./SourceAuthor";
import RadioButton from "./RadioButton";
// import { Navigate } from "react-router-dom";

export default function Alignement({ text, id }) {
    const [show, setShow] = useState(false)
    // const [comment, setComment] = useState('')
    const [radioValue, setRadioValue] = useState('')
    const [checked, setChecked] = useState(null)

    const source_target = useRef([]);
    const source_target_before = useRef([]);
    const source_target_after = useRef([]);
    const source_before = useRef([]);
    const source_after = useRef([]);
    const target_before = useRef([]);
    const target_after = useRef([]);
    const source_alignement = useRef([]);
    const target_alignement = useRef([]);
    const show_btn = useRef([]);
    const hide_btn = useRef([]);
    const textarea_comment = useRef([]);
    const btn_textarea = useRef([]);
    const save_comment = useRef([]);
    const add_comment = useRef([]);
    const check = useRef([]);

    const role = localStorage.getItem('role')
    const showDiff = (id) => {
        // Si le conteneur du texte traité existe
        if (source_target.current[id]) {

            // Afficher la différence entre les deux textes
            source_target_after.current[id].style.display = 'flex'
            // récupérer le code html du texte source traité
            let source = source_target.current[id].querySelector('.css-rq9a2a-diff-removed .css-o1u8iu-content-text').innerHTML

            // Insérer le code html du texte source traité dans un paragraphe
            source_alignement.current[id].innerHTML = source_before.current[id].innerHTML + source + source_after.current[id].innerHTML
            // donner une color vert au passage après traitement
            let sources = source_alignement.current[id].querySelectorAll('.css-cncyp1-word-diff')
            sources.forEach(source => {
                source.style.color = "green"
            })
            // donner une color rouge au passage source après traitement
            let removed = source_alignement.current[id].querySelectorAll('.css-hf3w1f-word-removed')
            removed.forEach(item => {
                item.style.color = 'red'
            })

            // récupérer le code html du texte target traité
            let target = source_target.current[id].querySelector('.css-cnnxkz-diff-added .css-o1u8iu-content-text').innerHTML

            // Insérer le code html du texte target traité dans un paragraphe
            target_alignement.current[id].innerHTML = target_before.current[id].innerHTML + target + target_after.current[id].innerHTML
            // donner une color vert au passage après traitement
            let targets = target_alignement.current[id].querySelectorAll('.css-cncyp1-word-diff')
            targets.forEach(target => {
                target.style.color = "green"
            })
            // donner une color blue au passage target après traitement
            let targets1 = target_alignement.current[id].querySelectorAll('.css-1u4zuq6-word-added')
            targets1.forEach(target => {
                target.style.color = "blue"
            })


            // cacher le bouton afficher
            show_btn.current[id].style.display = 'none'
            // afficher le bouton cacher
            hide_btn.current[id].style.display = 'block'

            // cacher le texte original
            source_target_before.current[id].style.display = 'none'
            setShow(!show)
        }
    }

    const hideDiff = (id) => {
        // Si le conteneur du texte traité existe
        if (source_target.current[id]) {

            // cacher le texte traité
            source_target_after.current[id].style.display = 'none'

            // afficher le bouton afficher
            show_btn.current[id].style.display = 'block'

            // cacher le bouton cacher
            hide_btn.current[id].style.display = 'none'

            // Afficher le texte original
            source_target_before.current[id].style.display = 'flex'
            setShow(!show)
        }
    }

    // Lorsqu'on clique sur le button ajouter un commentaire
    const addComment = (id) => {
        if (textarea_comment.current[id]) {
            // cacher le bouton ajouter commentaire
            add_comment.current[id].style.display = 'none'
            // afficher le bouton enregistrer commentaire
            save_comment.current[id].style.display = 'block'
            // afficher le textarea et le button de close
            textarea_comment.current[id].style.display = 'block'
            btn_textarea.current[id].style.display = 'block'
        }
    }

    // Lorsqu'on clique sur le button close textarea
    const closeTextArea = (id) => {
        if (textarea_comment.current[id]) {
            // vider et chacher le textarea et le button de close
            textarea_comment.current[id].value = ''
            textarea_comment.current[id].style.display = 'none'
            btn_textarea.current[id].style.display = 'none'
            // afficher le button ajouter un commentaire et cacher le button enregistrer
            add_comment.current[id].style.display = 'block'
            save_comment.current[id].style.display = 'none'
        }
    }

    // Lorsqu'on clique sur le button enregistrer pour enregistrer le commentaire dans la BDD
    const saveComment = async (id, alignement_id) => {
        // Tester si le textarea existe et a une valeur
        if (textarea_comment.current[id]) {
            const comment = textarea_comment.current[id].value
            if (comment) {
                // envoyer une requette pour sauvegarder le commentaire
                const user_id = localStorage.getItem('id')
                const response = await fetch('http://localhost:3333/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id, alignement_id, comment })
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log(data);
                }
            }
            // vider et cacher le textarea et le button de close et le button enregistrer
            textarea_comment.current[id].value = ''
            save_comment.current[id].style.display = 'none'
            textarea_comment.current[id].style.display = 'none'
            btn_textarea.current[id].style.display = 'none'
            // reafficher le button ajouter un commentaire
            add_comment.current[id].style.display = 'block'
        }
    }

    // lorsqu'on clique sur la rdiobutton, on envoie une requette directement à la base de donnée
    // pour sauvegarder la valeur de la radiobutton
    const handleRadio = async (e, alignement_id) => {
        setRadioValue(e.target.value)
        const evaluate = e.target.value
        const user_id = localStorage.getItem('id')
        try {
            const response = await fetch('http://localhost:3333/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, alignement_id, evaluate }),
                credentials: 'include'

            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error('Network error:', error);
        }

    }

    const handleValidate = async (e,textId,id) => {
        const validate = e.target.checked

        
        console.log(validate);
        const response = await fetch('http://localhost:3333/validate', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ textId, validate }),
            credentials: "include"
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data);
        }
    }
    return (
        <>
            <div key={id} className="div-table m-5 my-6 p-1 border shadow-xl relative rounded" ref={(el) => source_target.current[id] = el}>
                <span className="absolute top-0 left-0 bg-slate-600 p-4 rounde text-white text-xs">{id + 1}</span>
                <div className="view flex max-md:flex-col" ref={(el) => source_target_before.current[id] = el}>
                    <div className="div-par-left w-1/2 max-md:w-full p-4 border-r border-black">
                        <h3 className="text-xl font-bold mb-2 text-center">Source</h3>
                        <SourceAuthor text={text} />

                        {/* <div className='author'>
                            <span>{text.source_author}</span>
                            <span>{text.source_date}</span>
                            <span>{text.source_title}</span>
                        </div> */}
                        <p>
                            <span ref={(el) => source_before.current[id] = el}>{text.source_context_before}</span>
                            <span className="alignement">{text.source_passage}</span>
                            <span ref={(el) => source_after.current[id] = el}>{text.source_context_after}</span>
                        </p>
                    </div>

                    <div className="div-par-right w-1/2 max-md:w-full p-4">
                        <h3 className="text-xl font-bold mb-2 text-center">Cible</h3>
                        <TargetAuthor text={text} />
                        {/* <div className='author'>
                            <span>{text.target_author}</span>
                            <span>{text.target_date}</span>
                            <span>{text.target_title}</span>
                        </div> */}
                        <p>
                            <span ref={(el) => target_before.current[id] = el}>{text.target_context_before}</span>
                            <span className="alignement">{text.target_passage}</span>
                            <span ref={(el) => target_after.current[id] = el}>{text.target_context_after}</span>
                        </p>
                    </div>

                </div>

                <div className="view view-diff max-md:flex-col" ref={(el) => source_target_after.current[id] = el}>
                    <div className="div-par-left w-1/2 max-md:w-full p-4">
                        <h3 className="text-xl font-bold mb-2 text-center">Source</h3>
                        <SourceAuthor text={text} />
                        {/* <div className='author'>
                            <span>{text.source_author}</span>
                            <span>{text.source_date}</span>
                            <span>{text.source_title}</span>
                        </div> */}
                        <p ref={(el) => source_alignement.current[id] = el}></p>
                    </div>
                    <div className="div-par-right w-1/2 max-md:w-full p-4">
                        <h3 className="text-xl font-bold mb-2 text-center">Cible</h3>
                        <TargetAuthor text={text} />
                        {/* <div className='author'>
                            <span>{text.target_author}</span>
                            <span>{text.target_date}</span>
                            <span>{text.target_title}</span>
                        </div> */}
                        <p ref={(el) => target_alignement.current[id] = el}></p>
                    </div>
                </div>

                {/* textarea pour ajouter un commentaire. Il est caché par defaut */}
                <div className='flex justify-center relative' >
                    <textarea placeholder='Ajouter un commentaire...' className="hidden textarea textarea-bordered w-full m-4 border-gray border" ref={(el) => { textarea_comment.current[id] = el }}  ></textarea>
                    <button className="hidden btn btn-circle btn-xs btn-outline absolute top-5 right-5" onClick={() => closeTextArea(id)} ref={(el) => { btn_textarea.current[id] = el }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <ReactDiffViewer
                    oldValue={text.source_passage}
                    newValue={text.target_passage}
                    splitView={true}
                    compareMethod={DiffMethod.WORDS}
                    lineNumberStart={100}
                    columnTitle={'My Column Title'}
                />
                <div className="flex items-center justify-between gap-3 max-md:flex-col">
                    <div className="flex gap-1">
                        <button className="btnShow btn btn-sm btn-outline w-52 " onClick={() => showDiff(id)} ref={(el) => show_btn.current[id] = el}>Afficher la différence</button>
                        <button className="btnHide btn btn-sm btn-outline hover:text-white w-52" onClick={() => hideDiff(id)} ref={(el) => hide_btn.current[id] = el}>Cacher la différence</button>
                    </div>

                    {/* Si l'email existe, cela veut dire que l'utilisateur est un valideur */}
                    {text.email &&
                        <div className=" flex gap-3 items-center  max-md:flex-col">
                            <div className=" flex gap-3 items-center px-[3px] btn btn-sm btn-outline hover:text-white">
                                <label htmlFor={`check${id}`}>Valider</label>
                                <input 
                                    defaultChecked={text.validate}
                                    type="checkbox" 
                                    id={`check${id}`} 
                                    className="checkbox-warning checkbox" 
                                    onChange={(e) => handleValidate(e,text.id,id)}
                                    ref={(el) => check.current[id] = el} />
                            </div>
                            <div className="flex gap-1  items-center max-md:flex-col ">
                                <p className="badge bg-slate-500 text-white">{text.evaluate}</p>
                                {/* <p className=" badge-neutral"> {text.email}</p> */}
                                {/* <p className=""> {text.comment}</p> */}
                            </div>
                        </div>
                    }

                    {/* <RadioButton id={id} setRadioValue={setRadioValue} onClick={handleRadio} /> */}


                    {/* Les radios button seront affichés lorsque l'utilisateur est un annotateur */}
                    {role === 'Annotateur' &&
                        <div className="flex items-center gap-4 px-4 max-md:flex-col">
                            <button className="btn btn-sm btn-outline w-52" onClick={() => { addComment(id) }} ref={(el) => add_comment.current[id] = el}>Ajouter un commentaire</button>
                            <button className="btn btn-sm btn-outline w-52 save-comment" onClick={() => { saveComment(id, text.id) }} ref={(el) => save_comment.current[id] = el}>Enregistrer</button>
                            <div className="flex items-center gap-4 px-4 border rounded-md">

                                <div className="label-radio">
                                    <label htmlFor={`yes${id}`}>Correct</label>
                                    <input type="radio" id={`yes${id}`} name={`eval$${id}`} value="Correct" onChange={(e) => { handleRadio(e, text.id) }} />
                                </div>
                                <div className="label-radio">
                                    <label htmlFor={`no${id}`}>Incorrect</label>
                                    <input type="radio" id={`no${id}`} name={`eval$${id}`} value="Incorrect" onChange={(e) => { handleRadio(e, text.id) }} />
                                </div>
                                <div className="label-radio">
                                    <label htmlFor={`doubtful${id}`}>Pas sûr</label>
                                    <input type="radio" id={`doubtful${id}`} name={`eval$${id}`} value="Pas sûr" onChange={(e) => { handleRadio(e, text.id) }} />
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    )
}
