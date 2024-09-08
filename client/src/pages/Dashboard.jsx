import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Echart from "../component/Echart";

const ENDPOINT = 'http://localhost:8000/api';

export default function Dashboard() {
    const role = localStorage.getItem('role');
    const [alignement, setAlignment] = useState(0)
    const [evaluated, setEvaluated] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [notSure, setNotSure] = useState(0)
    const [validated, setValidated] = useState(0)
    const [evaluatedByUser, setEvaluatedByUser] = useState([{}])
    const [validateurs, setValidateurs] = useState([])
    const [annotateurs, setAnnotateurs] = useState([])
    const [annotateurDetail, setAnnotateurDetail] = useState({})
    const [username, setUsername] = useState('')
    // Group all chart data in one state object


    const [isLoading, setIsLoading] = useState(true); // Loading state

    // Fetch data from the API and handle errors
    const getData = async () => {
        try {
            const response = await fetch(`${ENDPOINT}/dashboard`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setAlignment(data.alignment)
                setEvaluated(data.evaluated)
                setCorrect(data.correct)
                setIncorrect(data.incorrect)
                setNotSure(data.notSure)
                setValidated(data.validated)
                setEvaluatedByUser(data.evaluatedByUser)
                setAnnotateurs(data.annotateur)
                setValidateurs(data.validateur)

                setIsLoading(false); // Data is loaded
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getOneAnnotateur = async (id) => {
        const response = await fetch(`${ENDPOINT}/dashboard/${id}`);
        if (response.ok) {
            const data = await response.json();
            if (data.annotateurDetail.length > 0) {
                setAnnotateurDetail(data.annotateurDetail[0]); // Par défaut un objet vide si data.annotateurDetail[0] est undefined
                setUsername(data.annotateurDetail[0].username)
            } else {
                setUsername('Aucaun alignement évalué')
            }
        }
    };

    // Function to generate pie chart options to avoid repetition
    const generatePieChartOptions = (title, data) => ({
        title: {
            text: title,
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });

    // Define all your chart data here
    const data1 = [
        { value: evaluated, name: 'Évalués' },
        { value: validated, name: 'Validés' }
    ];

    const data2 = [
        { value: correct, name: 'Correct' },
        { value: incorrect, name: 'Incorrect' },
        { value: notSure, name: 'Pas sûr' }
    ];

    const data3 = [
        { value: alignement, name: 'Alignements' },
        { value: evaluated, name: 'Évalués' }
    ];

    const data4 = annotateurDetail
        ? [
            { value: annotateurDetail.correct_count ?? 0, name: 'Correct' }, // Utilise la valeur ou 0 si elle est undefined
            { value: annotateurDetail.incorrect_count ?? 0, name: 'Incorrect' },
            { value: annotateurDetail.pas_sur_count ?? 0, name: 'Pas sûr' }
        ]
        : [];

    const label4 = []
    data4.map(item => {
        label4.push(item.name)
    })


    const labelByUser = []
    evaluatedByUser.map(item => {
        labelByUser.push(item.name)
    })


    const label1 = ['Validés', 'Évalués']
    const label2 = ['Correct', 'Incorrect', 'Pas sûr']
    const label3 = ['Alignements', 'Évalués']
    // Bar chart options
    const barChartOptions = (label, data) => ({
        xAxis: {
            type: 'category',
            data: label
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data,
                type: 'bar',
                itemStyle: {
                    // Ajoutez les couleurs de fond ici
                    color: function(params) {
                        // Exemple de couleur personnalisée basée sur l'index de la barre
                        const colorList = ['#5C7BD9', '#9FE080', '#FFDC60', '#EE6666', '#5470C6'];
                        return colorList[params.dataIndex % colorList.length];
                    }
                }
            }
        ]
    });

    // Redirect to login if not admin
    if (role !== 'Administrateur') {
        return <Navigate to={'/login'} />;
    }

    // // Display loading state until data is fetched
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div className="ml-64">
            
			<div className="flex-grow p-6 bg-gray-100">
				<h1 className="text-3xl font-bold">Tableau de board</h1>
			</div>
            <div className="p-5 flex">
                <div className="w-1/2">
                    <Echart option={generatePieChartOptions('Alignements évalués et validés', data1)} />
                    <Echart option={generatePieChartOptions('Évaluation des Alignements', data2)} />
                    <Echart option={generatePieChartOptions('Alignements vs Évalués', data3)} />
                    <Echart option={generatePieChartOptions('Évalués vs Utilisateur', evaluatedByUser)} />
                </div>
                <div className="w-1/2">
                    <Echart option={barChartOptions(label1, data1)} />
                    <Echart option={barChartOptions(label2, data2)} />
                    <Echart option={barChartOptions(label3, data3)} />
                    <Echart option={barChartOptions(labelByUser, evaluatedByUser)} />
                </div>
            </div>
            <div className="p-5 flex">
                <div className="w-1/2">
                    <select 
                        className="select select-bordered w-full max-w-xs mb-6" 
                        onChange={(e) => getOneAnnotateur(e.target.value)}
                        defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Choisir un annotateur</option>
                        {annotateurs.map((annotateur, index) => (

                            <option key={index} value={annotateur.id}>
                                {annotateur.username} {/* or another property you want to display */}
                            </option>

                        ))}
                    </select>
                    <Echart option={generatePieChartOptions(username, data4)} />
                </div>
                <div className="w-1/2">
                    <Echart option={barChartOptions(label4, data4)} />
                </div>
            </div>
        </div>
    );
}
