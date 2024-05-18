import { Navigate } from 'react-router-dom';
import Alignement from '../component/Alignement';
import Search from '../component/Search';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const token = localStorage.getItem('token')
    const form = useRef();
    const button = useRef();
    const [paragraphs, setParagraphs] = useState([])
    const [source_author, setSource_author] = useState('')
    const [source_title, setSource_title] = useState('')
    const [source_date, setSource_date] = useState('')
    const [source_passage, setSource_passage] = useState('')
    const [target_author, setTarget_author] = useState('')
    const [target_title, setTarget_title] = useState('')
    const [target_date, setTarget_date] = useState('')
    const [target_passage, setTarget_passage] = useState('')
    const [isCount, setIsCount] = useState(false)

    
    const handlSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('http://localhost:3333/search', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    source_passage,
                    source_author,
                    source_title,
                    source_date,
                    target_passage,
                    target_author,
                    target_title,
                    target_date
                }
            )
        })
        if (response.ok) {
            const data = await response.json()
            setParagraphs(data)
            setIsCount(true)
        }

        form.current.style.display = 'none'
        button.current.style.display = 'block'
    }

    const showForm = () => {
        form.current.style.display = 'block'
        button.current.style.display = 'none'
    }

    const resetButton = () => {
        setSource_author('')
        setSource_date('')
        setSource_passage('')
        setSource_title('')
        setTarget_author('')
        setTarget_date('')
        setTarget_passage('')
        setTarget_title('')
    }



    if (!token) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <div className=" shadow-md m-5 p-5 ">
                <button onClick={showForm} className=" hidden show-form btn  w-full" ref={(el) => button.current = el}>Afficher le formulaire de recherche</button>
                <form onSubmit={handlSubmit} ref={(el) => form.current = el} >
                    <div className="flex max-md:flex-col">
                        <div className="p-5 source w-1/2 border-r max-md:w-full">
                            <h3 className=" font-bold mb-2">Source</h3>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Passage
                                <input type="text" className="grow" onChange={(e) => setSource_passage(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Auteur
                                <input type="text" className="grow" onChange={(e) => setSource_author(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Titre
                                <input type="text" className="grow" onChange={(e) => setSource_title(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Date
                                <input type="text" className="grow" onChange={(e) => setSource_date(e.target.value)} />
                            </label>
                        </div>
                        <div className="p-5 target w-1/2 border-l max-md:w-full">
                            <h3 className=" font-bold mb-2">Cible</h3>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Passage
                                <input type="text" className="grow" onChange={(e) => setTarget_passage(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Author
                                <input type="text" className="grow" onChange={(e) => setTarget_author(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Title
                                <input type="text" className="grow" onChange={(e) => setTarget_title(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-1">Date
                                <input type="text" className="grow" onChange={(e) => setTarget_date(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <button className="btn bg-sky-600 hover:bg-sky-700 text-white btn-sm px-6 mr-2">Chercher</button>
                    <button onClick={resetButton} type="reset" className="btn btn-sm px-6 bg-red-400 hover:bg-red-500 text-white ">Annuler</button>
                </form>

                {isCount &&<span className='my-3 inline-block badge-neutral p-1 rounded font-bold'>Résultats: {paragraphs.length}</span>}
               {/* {paragraphs && paragraphs.length > 0 && <div className='shadow p-6 border my-3 bg-slate-200 rounded'>
                    <h2 className='text-center text-xl font-bold'>Résultats pour la requête suivante {paragraphs.length}</h2>
                     <div className='flex justify-between'>
                        <div> a.campos@paubearnhabitat.fr 
                            <h2>Paramètres sources</h2>
                            <span>{source_passage}</span>
                            <span >{source_author}</span>
                            <span>{source_title}</span>
                            <span>{source_date}</span>
                        </div>
                        <div>
                            <h2>Paramètres cibles</h2>
                            <span>{target_passage}</span>
                            <span>{target_author}</span>
                            <span>{target_title}</span>
                            <span>{target_date}</span>
                        </div>

                    </div> 
                </div>}*/}
            </div>
            {/* <Search  /> */}
            {paragraphs && paragraphs.map((text, id) =>
                <Alignement text={text} id={id} key={id} />
            )}
        </div>
    )
}
