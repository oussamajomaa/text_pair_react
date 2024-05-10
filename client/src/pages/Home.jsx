import { Navigate } from 'react-router-dom';
import Alignement from '../component/Alignement';
import Search from '../component/Search';
import { useRef, useState } from 'react';

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
    const token = localStorage.getItem('token')
    const form = useRef();
    const button = useRef();
    const [paragraph,setParagraph] = useState([])

    const handlSubmit = (e) => {
        e.preventDefault()
        console.log(form);
        console.log(button);
        form.current.style.display = 'none'
        button.current.style.display = 'block'
        setParagraph(texts)
    }

    const showForm = () => {
        form.current.style.display = 'block'
        button.current.style.display = 'none'
    }

    if (!token) {
        return <Navigate to={'/login'} />
    }


    return (

        <div>
            <div className=" shadow-md m-5 p-5 ">
                <button onClick={showForm} className=" hidden show-form btn btn-outline w-full" ref={(el) => button.current = el}>Show search form</button>
                <form onSubmit={handlSubmit} ref={(el) => form.current = el} >
                    <div className=" flex">
                        <div className="p-5 source w-1/2 border-r">
                            <h3 className=" font-bold mb-2">Source</h3>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Passage
                                <input type="text" className="grow" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Author
                                <input type="text" className="grow" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Title
                                <input type="text" className="grow" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Date
                                <input type="text" className="grow" />
                            </label>
                        </div>
                        <div className="p-5 target w-1/2 border-l">
                            <h3 className=" font-bold mb-2">Target</h3>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Passage
                                <input type="text" className="grow" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Author
                                <input type="text" className="grow" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Title
                                <input type="text" className="grow" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">
                                Date
                                <input type="text" className="grow" />
                            </label>
                        </div>
                    </div>

                    <button className="btn bg-sky-600 hover:bg-sky-700 text-white btn-sm px-6 mr-2">Search</button>
                    <button type="reset" className="btn btn-sm px-6 bg-red-400 hover:bg-red-500 text-white ">Reset</button>
                </form>
            </div>
            {/* <Search  /> */}
            {paragraph && paragraph.map((text, id) =>
                <Alignement text={text} id={id} key={id} />

            )}
        </div>
    )
}
