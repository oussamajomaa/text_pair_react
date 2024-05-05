import Alignement from '../component/Alignement';

const texts = [
    {
        source_author: "source_author",
        source_date: "source_date1",
        source_title: "source_title",
        source_context_before: "Cette application offre des solutions de gestion de l'alimentation spécifiquement conçues pour les établissements de santé, y compris les cuisines de cliniques. Elle permet de suivre les inventaires, de planifier les menus en fonction des besoins nutritionnels des patients et de gérer les coûts alimentaires. ",
        source_passage: "MealSuite propose une gamme de solutions logicielles pour les établissements.",
        source_context_after: "NetChef est une plateforme de gestion alimentaire qui inclut des fonctionnalités de gestion de stock adaptées aux cuisines de cliniques. Elle permet de suivre les niveaux de stock, de planifier les menus, de gérer les recettes et de générer des rapports nutritionnels.",
        target_author: "target_author1",
        target_date: "target_date1",
        target_title: "target_title1",
        target_context_before: " S'il ne porte encor les cliquettes, Je suis content d'être tondu. LE PRÊCHEUR. Vas, tu puisses être pendu ! Le très puissant roi divin Dit qu'on boive du meilleur vin, Et nous défend de boire l'eau, Car autant en fait un chevau Chevau : cheval. fsf Quant on le mène à la rivière. Et le prophète nous declare",
        target_passage: " MealSuite propose une gamme source_title de solutions logicielles tondu",
        target_context_after: " NetChef est une plateforme de gestion alimentaire qui inclut des fonctionnalités de gestion de stock adaptées aux cuisines de cliniques. Elle permet de suivre les niveaux de stock, de planifier les menus, de gérer les recettes et de générer des rapports nutritionnels.",
    },
{
        source_author: "source_author",
        source_date: "source_date1",
        source_title: "source_title",
        source_context_before: "Title Page ENCYCLOPÉDIE, DICTIONNAIRE ",
        source_passage: "RAISONNÉ DES SCIENCES, DES ARTS ET DES MÉTIERS, PAR UNE SOCIÉTÉ DE GENS DE LETTRES. Mis en ordre & publié par M. DIDEROT ,",
        source_context_after: "de l'Académie Royale des Sciences & des Belles-Lettres de Prusse ; & quant à la Partie Mathématique, par M. D'ALEMBERT, de l'Académie Royale des Sciences de Paris, de celle de Prusse, & de la Société Royale de Londres. Tantùm",
        target_author: "target_author1",
        target_date: "target_date1",
        target_title: "target_title1",
        target_context_before: "NCYCLÓPÉDIEjOuDictiott aio. naire",
        target_passage: " raisonné des Sciences^ des Arts ôc Métiers, par une Société de gens de Lettres, mis en ordre ôc publié par Mrs. Diderot",
        target_context_after: " NetChef est une plateforme de gestion alimentaire qui inclut des fonctionnalités de gestion de stock adaptées aux cuisines de cliniques. Elle permet de suivre les niveaux de stock, de planifier les menus, de gérer les recettes et de générer des rapports nutritionnels.",
    },
]

export default function Home() {
  return (
    <div>
        {texts && texts.map((text, id) =>
            <Alignement text={text} id={id} key={id}/>
                // <div key={id} className="div-table" id={`table${id}`} ref={(el) => source_target.current[id] = el}>
                //     <div className="view" id={`divOrigin${id}`} ref={(el) => source_target_before.current[id] = el}>
                //         <div className="div-par-left">
                //             <h3>Source</h3>
                //             <div className='author'>
                //                 <span>{text.source_author}</span>
                //                 <span>{text.source_date}</span>
                //                 <span>{text.source_title}</span>
                //             </div>
                //             <p>
                //                 <span id={`text1_before${id}`} ref={(el) => source_before.current[id] = el}>{text.source_context_before}</span>
                //                 <span className="alignement">{text.source_passage}</span>
                //                 <span id={`text1_after${id}`} ref={(el) => source_after.current[id] = el}>{text.source_context_after}</span>
                //             </p>
                //         </div>

                //         <div className="div-par-right">
                //             <h3>Target</h3>
                //             <div className='author'>
                //                 <span>{text.target_author}</span>
                //                 <span>{text.target_date}</span>
                //                 <span>{text.target_title}</span>
                //             </div>
                //             <p>
                //                 <span id={`text2_before${id}`} ref={(el) => target_before.current[id] = el}>{text.target_context_before}</span>
                //                 <span className="alignement">{text.target_passage}</span>
                //                 <span id={`text2_after${id}`} ref={(el) => target_after.current[id] = el}>{text.target_context_after}</span>
                //             </p>
                //         </div>
                //     </div>

                //     <div className="view view-diff" id={`view${id}`} ref={(el) => source_target_after.current[id] = el}>
                //         <div className="div-par-left">
                //             <h3>Source</h3>
                //             <div className='author'>
                //                 <span>{text.source_author}</span>
                //                 <span>{text.source_date}</span>
                //                 <span>{text.source_title}</span>
                //             </div>
                //             <p id={`source${id}`} ref={(el) => source_alignement.current[id] = el}></p>
                //         </div>
                //         <div className="div-par-right">
                //             <h3>Target</h3>
                //             <div className='author'>
                //                 <span>{text.target_author}</span>
                //                 <span>{text.target_date}</span>
                //                 <span>{text.target_title}</span>
                //             </div>
                //             <p id={`target${id}`} ref={(el) => target_alignement.current[id] = el}></p>
                //         </div>
                //     </div>
                //     <div className='div-textarea' >
                //         <textarea placeholder='Ajouter un commentaire...' cols="30" rows="10" ref={(el) => { textarea_comment.current[id] = el }}></textarea>
                //         <button onClick={()=>handleTextArea(id)} ref={(el) => { btn_textarea.current[id] = el }}>X</button>
                //     </div>

                //     <ReactDiffViewer
                //         oldValue={text.source_passage}
                //         newValue={text.target_passage}
                //         splitView={true}
                //         compareMethod={DiffMethod.WORDS}
                //         lineNumberStart={100}
                //         columnTitle={'My Column Title'}
                //     />
                //     <div className="div-btn">

                //         <button className="btnShow" onClick={() => showDiff(id)} id={`btnShow${id}`} ref={(el) => show_btn.current[id] = el}>Show</button>
                //         <button className="btnHide" onClick={() => hideDiff(id)} id={`btnHide${id}`} ref={(el) => hide_btn.current[id] = el}>Hide</button>
                //         <button onClick={() => { handleComment(id) }}>Commentaire</button>
                //         <button onClick={() => { handleSave(id) }}>Enregistrer</button>
                //         <div className="radio-btn">
                //             <div className="label-radio">
                //                 <label htmlFor={`yes${id}`}>Correct</label>
                //                 <input type="radio" id={`yes${id}`} name={`eval$${id}`} value="yes" />
                //             </div>
                //             <div className="label-radio">
                //                 <label htmlFor={`no${id}`}>Incorrect</label>
                //                 <input type="radio" id={`no${id}`} name={`eval$${id}`} value="no" />
                //             </div>
                //             <div className="label-radio">
                //                 <label htmlFor={`doubtful${id}`}>Pas sûr</label>
                //                 <input type="radio" id={`doubtful${id}`} name={`eval$${id}`} value="doubtful" />
                //             </div>
                //         </div>
                        
                //     </div>
                // </div>
            )}
    </div>
  )
}
