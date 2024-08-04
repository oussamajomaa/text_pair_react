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
    const [source_year, setSource_year] = useState('')
    const [source_content, setSource_content] = useState('')
    const [target_author, setTarget_author] = useState('')
    const [target_title, setTarget_title] = useState('')
    const [target_year, setTarget_year] = useState('')
    const [target_content, setTarget_content] = useState('')
    const [isCount, setIsCount] = useState(false)


    const handlSubmit = async (e) => {
        e.preventDefault()
        // const response = await fetch('passage.json')
        const response = await fetch('http://localhost:3500/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    source_content,
                    source_author,
                    source_title,
                    source_year,
                    target_content,
                    target_author,
                    target_title,
                    target_year
                }
            )
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data);
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
        setSource_year('')
        setSource_content('')
        setSource_title('')
        setTarget_author('')
        setTarget_year('')
        setTarget_content('')
        setTarget_title('')
    }



    // if (!token) {
    //     return <Navigate to={'/login'} />
    // }

    return (
        <div>
            <div className=" shadow-md m-5 p-5 ">
                <button onClick={showForm} className=" hidden show-form btn  w-full" ref={(el) => button.current = el}>Afficher le formulaire de recherche</button>
                <form onSubmit={handlSubmit} ref={(el) => form.current = el} >
                    <div className="flex max-md:flex-col">
                        <div className="p-5 source w-1/2 border-r max-md:w-full">
                            <h3 className=" font-bold mb-2 text-center text-xl">Source</h3>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Passage</label>
                                <input type="text" className=" input input-bordered  w-full" onChange={(e) => setSource_content(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Auteur</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setSource_author(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Titre</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setSource_title(e.target.value)} />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Date</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setSource_year(e.target.value)} />
                            </div>
                        </div>
                        <div className="p-5 target w-1/2 border-l max-md:w-full">
                            <h3 className=" font-bold mb-2 text-center text-xl">Cible</h3>
                            <div className='flex items-center mb-2'>
                            <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Passage</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setTarget_content(e.target.value)} />
                           
                            </div>
                            <div className='flex items-center mb-2'>
                            <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Auteur</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setTarget_author(e.target.value)} />
                           
                            </div>
                            <div className='flex items-center mb-2'>
                            <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Title</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setTarget_title(e.target.value)} />
                           
                            </div>
                            <div className='flex items-center mb-2'>
                            <label className="bg-slate-500 p-2 mr-2 rounded-md text-white inline-block w-[90px] text-right">Date</label>
                                <input type="text" className="input input-bordered  w-full" onChange={(e) => setTarget_year(e.target.value)} />
                           
                            </div>
                            
                            
                            
                            
                        </div>
                    </div>
                    <button className="btn bg-sky-600 hover:bg-sky-700 text-white btn-sm px-6 mr-2">Chercher</button>
                    <button onClick={resetButton} type="reset" className="btn btn-sm px-6 bg-red-400 hover:bg-red-500 text-white ">Annuler</button>
                </form>

                {isCount && <span className='my-3 inline-block badge-neutral p-1 rounded font-bold'>Résultats: {paragraphs.length}</span>}
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
