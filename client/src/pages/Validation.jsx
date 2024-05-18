import { useEffect, useState } from "react";
import Alignement from "../component/Alignement";
import { Navigate } from "react-router-dom";

export default function Validation() {
	const [paragraphs, setParagraphs] = useState([])
	const [isSpinnser, setIsSpinner] = useState(false)
	const fetchEvaluation = async () => {
		setIsSpinner(true)
		const response = await fetch('http://localhost:3333/evaluate')
		const data = await response.json()
		setParagraphs(data)
		setIsSpinner(false)
		console.log(data);
	}

	useEffect(() => {
		fetchEvaluation()
	}, [])

	const role = localStorage.getItem('role')
	// si le role n'est pas validateur revenir sur la page d'accueil
	if (role !== 'Validateur') {
		return <Navigate to={'/'} />
	}
	return (
		<div>
			{isSpinnser && <span className="loading loading-spinner text-primary"></span>}
			<div className=" shadow-md m-5 p-5 ">
				{paragraphs && paragraphs.map((text, id) =>
					<Alignement text={text} id={id} key={text.id} />
				)}
			</div>
		</div>
	)
}
