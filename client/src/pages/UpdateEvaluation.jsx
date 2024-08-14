import { useEffect, useState } from "react"
import Alignement from "../component/Alignement"

// const ENDPOINT = 'http://134.157.57.237:3500' 
const ENDPOINT = 'http://localhost:3500'
export default function UpdateEvaluation() {
	const [paragraphs, setParagraphs] = useState([])
	const userID = parseInt(localStorage.getItem("id"))
	console.log(typeof(userID));
	
	const getAlignment = async () => {
		const response = await fetch(`${ENDPOINT}/alignment_evaluated/${userID}`)
		if (response.ok) {
			const data = await response.json()
			setParagraphs(data)
			console.log(data);
			
		}
	}

	useEffect(() => {
		getAlignment()
	},[])

	return (
		<div className="p-5 m-5">
			{paragraphs && paragraphs.map((text, id) =>
				<Alignement text={text} id={id + 1} key={id} />
			)}

		</div>
	)
}
