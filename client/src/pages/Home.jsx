import { Navigate } from 'react-router-dom';
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
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to={'/login'} />
    }
  return (
    
    <div>
        {texts && texts.map((text, id) =>
            <Alignement text={text} id={id} key={id}/>
                
            )}
    </div>
  )
}
