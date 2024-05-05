import { useState } from "react"

export default function RadioButton({ id, setRadioValue }) {
    return (

        <div className="radio-btn">
            
            <div className="label-radio">
                <label htmlFor={`yes${id}`}>Correct
                <input type="radio" id={`yes${id}`} name={`eval$${id}`} value="Correct" onChange={(e) => { setRadioValue(e.target.value) }} />
                </label>
            </div>
            <div className="label-radio">
                <label htmlFor={`no${id}`}>Incorrect
                <input type="radio" id={`no${id}`} name={`eval$${id}`} value="Incorrect" onChange={(e) => { setRadioValue(e.target.value) }} />
                </label>
            </div>
            <div className="label-radio">
                <label htmlFor={`doubtful${id}`}>Pas sûr
                <input type="radio" id={`doubtful${id}`} name={`eval$${id}`} value="Pas sûr" onChange={(e) => { setRadioValue(e.target.value) }} />
                </label>
            </div>
        </div>

    )
}
