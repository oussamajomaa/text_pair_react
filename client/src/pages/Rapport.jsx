import React, { useState, useEffect } from 'react';

const ENDPOINT = 'http://localhost:8000/api'

export default function Rapport() {
    const [evaluated, setEvaluated] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [countEvaluated, setCountEvaluated] = useState(0)
    const [countValidated, setCountValidated] = useState(0)
    const [countAlignment, setCountAlignment] = useState(0)


    const getCount = async () => {
        setIsLoading(true)
        const response = await fetch(`${ENDPOINT}/admin/rapport/count`)
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            animateCounter(data.evaluated, data.validated, data.alignment)

        }
        setIsLoading(false)
    }
    useEffect(() => {
        getCount()
    }, [])

    // Fonction générique pour récupérer les données par lot et les exporter en CSV
    const fetchDataInBatches = async (endpoint, fileName) => {
        setIsLoading(true);
        let lastId = 0;
        const limit = 1000;  // Nombre de lignes à récupérer par lot
        let allData = [];
        let batchCount = 0;

        while (true) {
            batchCount++;
            console.log(`Requête ${batchCount} envoyée, lastId : ${lastId}`);

            const response = await fetch(`${ENDPOINT}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ limit, lastId }),  // Envoyer lastId au backend
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`Lot récupéré: ${data.length} enregistrements`);

                // Ajouter les données récupérées à allData
                allData = allData.concat(data);

                // Si le nombre d'enregistrements récupérés est inférieur à la limite, arrêter la boucle
                if (data.length < limit) {
                    console.log("Dernier lot récupéré, arrêt de la boucle.");
                    break;
                }

                // Définir lastId comme l'ID du dernier élément du lot actuel
                lastId = data[data.length - 1].id;
            } else {
                console.error("Erreur lors de la récupération des données.");
                break;
            }
        }

        // Si des données sont disponibles, télécharger le CSV
        if (allData.length > 0) {
            downloadCSV(allData, fileName);
        } else {
            console.error("Aucune donnée disponible pour le téléchargement.");
        }

        setIsLoading(false);
    };

    const getEvaluatedInBatches = () => {
        fetchDataInBatches('/admin/rapport/evaluated', 'evaluated.csv');
    };

    const getValidatedInBatches = () => {
        fetchDataInBatches('/admin/rapport/validated', 'validated.csv');
    };

    const getAlignmentInBatches = () => {
        fetchDataInBatches('/admin/rapport/alignment', 'alignment.csv');
    };

    // Fonction d'animation pour incrémenter la valeur du compteur
    const animateCounter = (evaluated, validated, alignment) => {
        let currentValue1 = 0;
        let currentValue2 = 0;
        let currentValue3 = 0;

        const increment1 = Math.ceil(evaluated / 100); // Divisez pour que ça monte en 100 étapes
        const increment2 = Math.ceil(validated / 100); // Divisez pour que ça monte en 100 étapes
        const increment3 = Math.ceil(alignment / 100); // Divisez pour que ça monte en 100 étapes

        // Interval pour countEvaluated
        const interval1 = setInterval(() => {
            currentValue1 += increment1;
            if (currentValue1 >= evaluated) {
                setCountEvaluated(evaluated);
                clearInterval(interval1); // Arrêter une fois la valeur atteinte
            } else {
                setCountEvaluated(currentValue1);
            }
        }, 20);

        // Interval pour countValidated
        const interval2 = setInterval(() => {
            currentValue2 += increment2;
            if (currentValue2 >= validated) {
                setCountValidated(validated);
                clearInterval(interval2); // Arrêter une fois la valeur atteinte
            } else {
                setCountValidated(currentValue2);
            }
        }, 20);

        // Interval pour countAlignment
        const interval3 = setInterval(() => {
            currentValue3 += increment3;
            if (currentValue3 >= alignment) {
                setCountAlignment(alignment);
                clearInterval(interval3); // Arrêter une fois la valeur atteinte
            } else {
                setCountAlignment(currentValue3);
            }
        }, 20);
    };

    // Fonction pour convertir les données en CSV
    const convertToCSV = (objArray) => {
        if (!objArray || objArray.length === 0) {
            console.error("No data available to convert to CSV");
            return '';
        }

        const array = [Object.keys(objArray[0])].concat(objArray);

        return array.map(row => {
            return Object.values(row).join(",");
        }).join("\n");
    };

    // Fonction pour télécharger le CSV
    const downloadCSV = (data, filename) => {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Créer un lien de téléchargement et cliquer dessus
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="ml-64">
            <div className="p-6 bg-gray-100">
                <h1 className="text-3xl font-bold">Rapport</h1>
            </div>
            {isLoading && <span className="loading loading-bars loading-lg text-accent block m-auto"></span>}
            <div className='p-5 flex gap-6'>
                <div className='flex my-5'>
                    <div className='h-64 w-64 bg-slate-400 rounded flex flex-col justify-center items-center text-white gap-5'>
                        <h2 className='text-6xl '>{countEvaluated}</h2>
                        <h2 className='text-xl '>Alignement évalués</h2>
                        <button onClick={getEvaluatedInBatches} className="btn btn-warning font-bold py-2 px-4 rounded">
                            Exporter en CSV
                        </button>
                    </div>
                </div>
                <div className='flex my-5'>
                    <div className='h-64 w-64 bg-slate-400 rounded flex flex-col justify-center items-center text-white gap-5'>
                        <h2 className='text-6xl '>{countValidated}</h2>
                        <h2 className='text-xl '>Alignement validés</h2>
                        <button onClick={getValidatedInBatches} className="btn btn-warning font-bold py-2 px-4 rounded">
                            Exporter en CSV
                        </button>
                    </div>
                </div>
                <div className='flex my-5'>
                    <div className='h-64 w-64 bg-slate-400 rounded flex flex-col justify-center items-center text-white gap-5'>
                        <h2 className='text-6xl '>{countAlignment}</h2>
                        <h2 className='text-xl '>Alignements</h2>
                        <button onClick={getAlignmentInBatches} className="btn btn-warning font-bold py-2 px-4 rounded">
                            Exporter en CSV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
