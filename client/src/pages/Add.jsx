import { useEffect, useState } from "react"
import { json } from "react-router-dom";

export default function Add() {
    const [align, setAlign] = useState([])
    const getAlign = async () => {
        // const response = await fetch('passage.json')
        const response = await fetch('http://localhost:4444/alignment')
        const data = await response.json()
        setAlign(data);
        console.log(data);
    }

    useEffect(() => {
        getAlign()

    }, [])

    async function insertAlignment() {
        for (const item of align) {
            console.log(item);
            item.source_id = item.source_id.trim()
            item.source_content = item.source_content.trim()
            item.source_before = item.source_before.trim()
            item.source_after = item.source_after.trim()
            item.source_title = item.source_title.trim()
            item.source_author = item.source_author.trim()
            item.source_year = item.source_year.trim()
            item.target_id = item.target_id.trim()
            item.target_content = item.target_content.trim()
            item.target_before = item.target_before.trim()
            item.target_after = item.target_after.trim()
            item.target_title = item.target_title.trim()
            item.target_author = item.target_author.trim()
            item.target_year = item.target_year.trim()
            item.target_year = item.target_year.trim()
            try {
                const response = await fetch('http://localhost:4444/alignment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    console.error('Failed to fetch:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const truncate = async() => {
        try {
            const response = await fetch('http://localhost:4444/truncate')
            const data = await response.json()
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="p-5 flex gap-5">
            <button className="btn btn-primary" onClick={insertAlignment}>INSERT INTO ALIGNMENT</button>
            <button className="btn btn-primary" onClick={truncate}>TRUNCATE ALIGNMENT</button>
        </div>
    )
}
