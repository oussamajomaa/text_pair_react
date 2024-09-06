import { useEffect } from "react";

// Définition de l'URL de base pour l'API
const ENDPOINT = 'http://localhost:8000/api';
export default function Dashboard() {
    const getValidated = async() => {
        const response = await fetch(`${ENDPOINT}/dashboard`)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
        }
    }

    useEffect(()=> {
        getValidated()
    },[])
  return (
    <div>Dashboard</div>
  )
}
