// import logo from './logo.svg';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Alignement from './component/Alignement';
// import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
// import { useState, useRef } from 'react';
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

function App() {
    // const [show, setShow] = useState(false)
    // const [comment, setComment] = useState(false)

    // const source_target = useRef([]);
    // const source_target_before = useRef([]);
    // const source_target_after = useRef([]);
    // const source_before = useRef([]);
    // const source_after = useRef([]);
    // const target_before = useRef([]);
    // const target_after = useRef([]);
    // const source_alignement = useRef([]);
    // const target_alignement = useRef([]);
    // const show_btn = useRef([]);
    // const hide_btn = useRef([]);
    // const textarea_comment = useRef([]);
    // const btn_textarea = useRef([]);

    // const showDiff = (id) => {
    //     // Si le conteneur du texte traité existe
    //     if (source_target.current[id]) {

    //         // Afficher la différence entre les deux textes
    //         source_target_after.current[id].style.display = 'flex'
    //         // récupérer le code html du texte source traité
    //         let source = source_target.current[id].querySelector('.css-rq9a2a-diff-removed .css-o1u8iu-content-text').innerHTML

    //         // Insérer le code html du texte source traité dans un paragraphe
    //         source_alignement.current[id].innerHTML = source_before.current[id].innerHTML + source + source_after.current[id].innerHTML

    //         // récupérer le code html du texte target traité
    //         let target = source_target.current[id].querySelector('.css-cnnxkz-diff-added .css-o1u8iu-content-text').innerHTML

    //         // Insérer le code html du texte target traité dans un paragraphe
    //         target_alignement.current[id].innerHTML = target_before.current[id].innerHTML + target + target_after.current[id].innerHTML

    //         // cacher le bouton afficher
    //         show_btn.current[id].style.display = 'none'
    //         // cacher le bouton cacher
    //         hide_btn.current[id].style.display = 'block'

    //         // cacher le texte original
    //         source_target_before.current[id].style.display = 'none'
    //         setShow(!show)
    //     }
    // }

    // const hideDiff = (id) => {
    //     // Si le conteneur du texte traité existe
    //     if (source_target.current[id]) {

    //         // cacher le texte traité
    //         source_target_after.current[id].style.display = 'none'

    //         // afficher le bouton afficher
    //         show_btn.current[id].style.display = 'block'

    //         // cacher le bouton cacher
    //         hide_btn.current[id].style.display = 'none'

    //         // Afficher le texte original
    //         source_target_before.current[id].style.display = 'flex'
    //         setShow(!show)
    //     }
    // }

    // const handleComment = (id) => {
    //     setComment(true)
    //     console.log(id);
    //     // textarea_comment.current[id].style.display="block"
    //     if (textarea_comment.current[id]) {
    //         console.log(textarea_comment.current[id])
    //         textarea_comment.current[id].style.display = 'block'
    //         btn_textarea.current[id].style.display = 'block'
    //         // textarea_comment.current[id].style.display="block"
    //     }
    // }

    // const handleTextArea = (id) => {
    //     if (textarea_comment.current[id]) {
    //         textarea_comment.current[id].value = ''
    //         textarea_comment.current[id].style.display='none'
    //         btn_textarea.current[id].style.display = 'none'
    //     }
    // }

    // const handleSave = (id) => {
    //     setComment(false)
    //     if (textarea_comment.current[id]) {
    //         console.log(textarea_comment.current[id])
    //         textarea_comment.current[id].style.display = 'none'
    //         btn_textarea.current[id].style.display = 'none'
    //         // textarea_comment.current[id].style.display="block"
    //     }
    // }

    return (
    <div>
        {texts && texts.map((text, id) =>
            <Alignement text={text} id={id} key={id}/>
       ) }
    </div>
        // <Router>
        //     <Routes>
        //         <Route path='/' element={<Home />}></Route>
        //         <Route path='/login' element={<Login />}></Route>

        //     </Routes>
        // </Router>

    )
}

export default App;
