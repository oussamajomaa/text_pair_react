import { useRef, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import TargetAuthor from "./TargetAuthor";
import SourceAuthor from "./SourceAuthor";
import RadioButton from "./RadioButton";
// import { Navigate } from "react-router-dom";
import Search from "./Search";

export default function Alignement({ text, id }) {
    const [show, setShow] = useState(false)
    // const [comment, setComment] = useState(false)
    const [radioValue, setRadioValue] = useState('')

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
    const token = localStorage.getItem('token')
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

            // récupérer le code html du texte target traité
            let target = source_target.current[id].querySelector('.css-cnnxkz-diff-added .css-o1u8iu-content-text').innerHTML

            // Insérer le code html du texte target traité dans un paragraphe
            target_alignement.current[id].innerHTML = target_before.current[id].innerHTML + target + target_after.current[id].innerHTML
            // donner une color vert au passage après traitement
            let targets = target_alignement.current[id].querySelectorAll('.css-cncyp1-word-diff')
            targets.forEach(target => {
                target.style.color = "green"
            })
            // donner une color blue au passage après traitement
            let targets1 = target_alignement.current[id].querySelectorAll('.css-1u4zuq6-word-added')
            targets1.forEach(target => {
                target.style.color = "blue"
            })


            // cacher le bouton afficher
            show_btn.current[id].style.display = 'none'
            // cacher le bouton cacher
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

    const handleComment = (id) => {
        // setComment(true)
        console.log(id);
        // textarea_comment.current[id].style.display="block"
        if (textarea_comment.current[id]) {
            console.log(textarea_comment.current[id])
            textarea_comment.current[id].style.display = 'block'
            btn_textarea.current[id].style.display = 'block'
            // textarea_comment.current[id].style.display="block"
        }
    }

    const handleTextArea = (id) => {
        if (textarea_comment.current[id]) {
            textarea_comment.current[id].value = ''
            textarea_comment.current[id].style.display = 'none'
            btn_textarea.current[id].style.display = 'none'
        }
    }

    const handleSave = (id) => {
        // setComment(false)
        if (textarea_comment.current[id]) {
            console.log(textarea_comment.current[id])
            textarea_comment.current[id].style.display = 'none'
            btn_textarea.current[id].style.display = 'none'
            // textarea_comment.current[id].style.display="block"
            console.log(radioValue);
        }
    }

    // if (!token) {
    //     return <Navigate to={'/login'} />
    // }
    return (
        <>
            <Search />
            <div key={id} className="div-table" ref={(el) => source_target.current[id] = el}>
                <div className="view" ref={(el) => source_target_before.current[id] = el}>
                    <div className="div-par-left">
                        <h3>Source</h3>
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

                    <div className="div-par-right">
                        <h3>Target</h3>
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

                <div className="view view-diff" ref={(el) => source_target_after.current[id] = el}>
                    <div className="div-par-left">
                        <h3>Source</h3>
                        <SourceAuthor text={text} />
                        {/* <div className='author'>
                            <span>{text.source_author}</span>
                            <span>{text.source_date}</span>
                            <span>{text.source_title}</span>
                        </div> */}
                        <p ref={(el) => source_alignement.current[id] = el}></p>
                    </div>
                    <div className="div-par-right">
                        <h3>Target</h3>
                        <TargetAuthor text={text} />
                        {/* <div className='author'>
                            <span>{text.target_author}</span>
                            <span>{text.target_date}</span>
                            <span>{text.target_title}</span>
                        </div> */}
                        <p ref={(el) => target_alignement.current[id] = el}></p>
                    </div>
                </div>
                <div className='div-textarea' >
                    <textarea placeholder='Ajouter un commentaire...' cols="30" rows="10" ref={(el) => { textarea_comment.current[id] = el }}></textarea>
                    <button onClick={() => handleTextArea(id)} ref={(el) => { btn_textarea.current[id] = el }}>X</button>
                </div>

                <ReactDiffViewer
                    oldValue={text.source_passage}
                    newValue={text.target_passage}
                    splitView={true}
                    compareMethod={DiffMethod.WORDS}
                    lineNumberStart={100}
                    columnTitle={'My Column Title'}
                />
                <div className="div-btn-radio">
                    <div className="div-btn">
                        <button className="btnShow" onClick={() => showDiff(id)} ref={(el) => show_btn.current[id] = el}>Show</button>
                        <button className="btnHide" onClick={() => hideDiff(id)} ref={(el) => hide_btn.current[id] = el}>Hide</button>
                        <button onClick={() => { handleComment(id) }}>Commentaire</button>
                        <button onClick={() => { handleSave(id) }}>Enregistrer</button>
                    </div>

                    <RadioButton id={id} setRadioValue={setRadioValue} />

                    {/* <div className="radio-btn">
                    <div className="label-radio">
                        <label htmlFor={`yes${id}`}>Correct</label>
                        <input type="radio" id={`yes${id}`} name={`eval$${id}`} value="Correct" onChange={(e) => { setRadioValue(e.target.value) }} />
                    </div>
                    <div className="label-radio">
                        <label htmlFor={`no${id}`}>Incorrect</label>
                        <input type="radio" id={`no${id}`} name={`eval$${id}`} value="Incorrect" onChange={(e) => { setRadioValue(e.target.value) }} />
                    </div>
                    <div className="label-radio">
                        <label htmlFor={`doubtful${id}`}>Pas sûr</label>
                        <input type="radio" id={`doubtful${id}`} name={`eval$${id}`} value="Pas sûr" onChange={(e) => { setRadioValue(e.target.value) }} />
                    </div>
                </div> */}
                </div>
            </div>
        </>
    )
}
