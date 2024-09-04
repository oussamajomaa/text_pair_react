import { useEffect, useState } from "react";
import Alignement from "../component/Alignement";
import { Navigate } from "react-router-dom";

const ENDPOINT = "http://localhost:8000/api";
export default function Validation() {
	const [paragraphs, setParagraphs] = useState([])
	const [isSpinnser, setIsSpinner] = useState(false)
	const [count, setCount] = useState(0)
	const fetchEvaluation = async () => {
		setIsSpinner(true)
		const response = await fetch(`${ENDPOINT}/validation`, {
			credentials: 'include'
		})
		if (response.ok) {
			const data = await response.json()
			setParagraphs(data.results)
			console.log(data.results);
			setCount(data.count)
			setIsSpinner(false)
		}
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
			{/* {isSpinnser && <span className="loading loading-spinner text-primary"></span>} */}
			<div className=" shadow-md m-5 p-5 ">
				{count}
				{paragraphs && paragraphs.map((text, counter) =>
					<Alignement text={text} counter={counter + 1} key={text.id} />
				)}
			</div>
		</div>
	)
}
