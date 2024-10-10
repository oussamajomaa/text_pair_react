import { Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Alignement from '../component/Alignement';

// Définition de l'URL de base pour l'API
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Home() {
    // Initialisation de plusieurs variables d'état pour gérer les données du formulaire et l'affichage des résultats
    const [count, setCount] = useState(0);
    const token = localStorage.getItem('token'); // Récupération du token d'authentification
    const role = localStorage.getItem('role')
    const form = useRef(); // Référence au formulaire
    const button = useRef(); // Référence au bouton pour afficher le formulaire
    const [paragraphs, setParagraphs] = useState([]); // Stockage des résultats de recherche
    const [source_author, setSource_author] = useState(''); // Champ Auteur Source
    const [source_title, setSource_title] = useState(''); // Champ Titre Source
    const [source_year, setSource_year] = useState(''); // Champ Année Source
    const [source_content, setSource_content] = useState(''); // Champ Contenu Source
    const [target_author, setTarget_author] = useState(''); // Champ Auteur Cible
    const [target_title, setTarget_title] = useState(''); // Champ Titre Cible
    const [target_year, setTarget_year] = useState(''); // Champ Année Cible
    const [target_content, setTarget_content] = useState(''); // Champ Contenu Cible
    const [isCount, setIsCount] = useState(false); // Indique si des résultats ont été trouvés
    const [currentPage, setCurrentPage] = useState(0); // Suivi de la page actuelle
    const [isLoading, setIsLoading] = useState(false); // Indique si les résultats sont en cours de chargement
    const itemsPerPage = 50;  // Nombre d'éléments à afficher par page
    // const pageSize = 50; // Taille de la page pour les requêtes API
    const [lastId, setLastId] = useState(0); // Dernier ID récupéré pour la pagination
    const [pageIds, setPageIds] = useState([]); // Pile des derniers IDs pour la navigation dans les pages
    const [start, setStart] = useState(1)
    const [end, setEnd] = useState(1)

    // Fonction pour récupérer les résultats de recherche à partir de l'API
    const fetchResults = async (page = 0, direction = 'next', lastId) => {
        setIsLoading(true); // Démarrage du chargement

        let tempLastId;
        if (direction === 'next') {
            tempLastId = lastId; // Utiliser le dernier ID actuel pour récupérer la page suivante
        } else if (direction === 'previous') {
            tempLastId = pageIds.length > 0 ? pageIds.pop() : 0; // Récupérer l'ID de la page précédente
            setPageIds([...pageIds]);  // Mettre à jour la pile des IDs
        }

        // Envoi de la requête POST à l'API avec les données du formulaire et l'ID de la page actuelle
        
        const response = await fetch(`${ENDPOINT}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source_content,
                source_author,
                source_title,
                source_year,
                target_content,
                target_author,
                target_title,
                target_year,
                lastId: tempLastId,
                start,
                end
            }),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json(); // Récupération des données de l'API
            if (data.results && data.results.length > 0) {
                
                setCount(data.total_count); // Mise à jour du compteur total de résultats
                if (direction === 'next') {
                    setPageIds([...pageIds, lastId]);  // Ajouter l'ID actuel à la pile si c'est une requête "next"
                }
                const newLastId = data.results[data.results.length - 1]?.ID || tempLastId; // Mise à jour de lastId avec l'ID du dernier élément récupéré
                setLastId(newLastId);
                setParagraphs(prevParagraphs => [...prevParagraphs, ...data.results]); // Ajout des nouveaux résultats à la liste existante
                setIsCount(true); // Indiquer que des résultats ont été trouvés
            }
        }

        setIsLoading(false); // Fin du chargement
    };



    // Fonction appelée lors de la soumission du formulaire
    const handlSubmit = async (e) => {
        e.preventDefault();

        // Réinitialisation des états pour une nouvelle recherche
        setParagraphs([]);       // Vider complètement les résultats actuels
        setLastId(0);            // Réinitialiser lastId à 0
        setCurrentPage(0);       // Réinitialiser la page courante
        setPageIds([]);          // Réinitialiser la pile des lastIds
        setCount(0);             // Réinitialiser le compteur total de résultats

        await fetchResults(0, 'next', 0);  // Passer les paramètres nécessaires à la fonction
        hideForm();  // Cacher le formulaire après la soumission
    };



    // Gestion de la pagination lorsqu'un utilisateur clique sur une page
    const handlePageClick = async (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);

        if (selectedPage > currentPage) {
            await fetchResults(selectedPage, 'next', lastId); // Aller à la page suivante
        } else if (selectedPage < currentPage) {
            await fetchResults(selectedPage, 'previous', lastId); // Aller à la page précédente
        }
    };

    // Afficher le formulaire de recherche
    const showForm = () => {
        form.current.style.display = 'block';
        button.current.style.display = 'none';
    };

    // Réinitialiser les champs du formulaire
    const resetButton = () => {
        setSource_author('');
        setSource_year('');
        setSource_content('');
        setSource_title('');
        setTarget_author('');
        setTarget_year('');
        setTarget_content('');
        setTarget_title('');
        setStart(1)
        setEnd(1)
    };

    // Cacher le formulaire de recherche
    const hideForm = () => {
        form.current.style.display = 'none';
        button.current.style.display = 'block';
    };

    const handleStartChange = (e) => {
        const newStart = parseInt(e.target.value, 10);
        setStart(newStart);

        // Si start est supérieur à end, mettez à jour end
        // if (newStart > end) {
        //     setEnd(newStart);
        // }
    };

    const handleEndChange = (e) => {
        const newEnd = parseInt(e.target.value, 10);

        // Ne mettez à jour end que s'il est supérieur ou égal à start
        // if (newEnd >= start) {
        setEnd(newEnd);
        // } else {

        // Remettre la valeur de l'input à l'état précédent
        // e.target.value = end;
        // }
    };

    // Redirection vers la page de login si l'utilisateur n'est pas authentifié
    if (role) {
        if (role === 'Administrateur') {
            return <Navigate to={'/admin/dashboard'} />
        }
        // if (role === 'Validateur') {
        //     return <Navigate to={'/validation'} />
        // }
    } else {

        return <Navigate to={'/login'} />;
    }
    

    // Détermination des éléments à afficher sur la page actuelle
    const currentItems = paragraphs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div>
            <div className=" p-5">
                <button onClick={showForm} className="hidden show-form btn w-full " ref={button}>
                    Afficher le formulaire de recherche
                </button>
                <form onSubmit={handlSubmit} ref={form} className='border'>
                    <div className="flex max-md:flex-col">
                        {/* Section Source */}
                        <div className="p-5 source w-1/2 border-r max-md:w-full">
                            <h3 className=" font-bold mb-2 text-center text-xl">Source</h3>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Passage</label>
                                <input type="text" className=" input input-bordered w-full" onChange={(e) => setSource_content(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Auteur</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setSource_author(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Titre</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setSource_title(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Date</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setSource_year(e.target.value)} />
                            </div>
                        </div>
                        {/* Section Cible */}
                        <div className="p-5 target w-1/2 border-l max-md:w-full">
                            <h3 className=" font-bold mb-2 text-center text-xl">Cible</h3>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Passage</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setTarget_content(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Auteur</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setTarget_author(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Titre</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setTarget_title(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Date</label>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setTarget_year(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {/* Boutons de contrôle du formulaire */}
                    <div className='flex gap-2 m-4 justify-between items-center'>
                        <div className='flex gap-2'>
                            <button className="btn btn-outline btn-primary btn-sm">Chercher</button>
                            <button onClick={resetButton} type="reset" className="btn btn-sm btn-outline">Réinitialiser</button>
                            <button onClick={hideForm} type="reset" className="btn btn-sm btn-outline btn-error">Annuler</button>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <h2 >Sélectionner la plage des enregistrements entre 1 et 191582</h2>
                            <div>
                                <label htmlFor="debut">début
                                    <input
                                        type="number"
                                        className='border rounded mx-2  w-16' id='debut' min={1}
                                        value={start}
                                        onChange={handleStartChange} /></label>
                                <label htmlFor="fin">fin
                                    <input
                                        type="number"
                                        className='border rounded mx-2 w-16' id='fin' min={1} max={191582}
                                        value={end}
                                        onChange={handleEndChange} /></label>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Affichage du nombre de résultats */}
                {isCount && <span className='my-3 inline-block badge-neutral p-1 rounded font-bold'>Résultats: {count}</span>}

                {/* Indicateur de chargement */}
                {isLoading && <span className="loading loading-bars loading-lg text-accent block m-auto"></span>}



                {/* Affichage des résultats */}
                {currentItems && currentItems.map((text, counter) => (
                    <Alignement text={text} counter={counter + currentPage * 50 + 1} key={text.ID} />
                ))}

            </div>
            <div className='flex justify-center mb-3'>
                {/* Pagination */}
                {currentItems.length > 0 && (
                    <ReactPaginate
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        breakLabel={null}
                        breakClassName={null}
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(count / itemsPerPage)}  // Calcul du nombre total de pages
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={1}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        forcePage={currentPage}
                        disableInitialCallback={true}
                    />
                )}
            </div>
        </div>
    );
}
