import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ENDPOINT = "http://localhost:8000/api";

export default function UpdateEvaluation() {
    const [paragraphs, setParagraphs] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [lastId, setLastId] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Aligné avec `pageSize`
    const pageSize = 10;

    const fetchResults = async () => {
        setIsLoading(true);
        const response = await fetch(`${ENDPOINT}/evaluation`, {
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setCount(data.count);
                setParagraphs(data.results);
                console.log(data.results)
            } 
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    const handelDelete = async(id) => {
        const response = await fetch(`${ENDPOINT}/evaluation/${id}`, {
            method:'delete',
            credentials: "include",
        })
        if (response.ok) {
            const data = await response.json();
            fetchResults()
            
        }
    }
    // Nouvelle logique pour gérer les éléments sur la page actuelle
    const currentItems = paragraphs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


    return (
        <div className="p-5 m-5 relativr">
            {isLoading && <span className="loading loading-bars loading-lg text-accent block m-auto absolute left-1/2"></span>}
            <h2 className="py-2 px-3 mb-3 bg-black text-white text-center rounded ">
                 {count} Alignements Évalués par  {localStorage.getItem('email')}
            </h2>
            <div className="flex mb-3 pb-3 border-b-4">
                <div className="font-bold w-6/12">Source Contexte</div>
                <div className="font-bold w-5/12">Cible Contexte</div>
                <div className="font-bold w-1/12">ACTION</div>
            </div>
            {currentItems.length > 0 && currentItems.map((text, id) => (
                <div key={id}>
                    <div className="flex gap-2 my-2 shadow items-center">
                        <div className="w-6/12 ">
                            {text.source_before.length > 200
                                ? text.source_before.slice(0, 200) + " ..."
                                : text.source.before}
                        </div>
                        <div className="w-5/12 ">
                            {text.target_before.length > 200
                                ? text.target_before.slice(0, 200) + " ..."
                                : text.target.before}
                        </div>
                        <div className="w-1/12 "><button className="btn btn-outline btn-error btn-sm" onClick={()=>{handelDelete(text.evaluation_id)}}>Supprimer</button></div>
                    </div>
                </div>
            ))}
            <div className="flex justify-center mb-3">
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={null}
                    breakClassName={null}
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(count / itemsPerPage)}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={1}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    forcePage={currentPage}
                    disableInitialCallback={true}
                />
            </div>
        </div>
    );
}
