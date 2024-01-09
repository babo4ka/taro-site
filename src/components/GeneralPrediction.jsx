import { removeFromLocalStorage } from "../utils/utils"
import { useEffect } from "react"
import $ from 'jquery'

const GeneralPrediction = ({text, inkey, update, isLast}) =>{

    const deletePred = ()=>{
        removeFromLocalStorage("general", inkey)
        update()
    }

    useEffect(()=>{
        $(".last_holder").fadeIn('slow')
    })

    return(
        <div className={`container-fluid prediction_holder col-7 mt-3 mb-3 ${isLast?"last_holder":""}`}>
            <span onClick={deletePred} className="close-btn">&#10060;</span>
            <div className="row justify-content-center">


                <div className="col-12 text-start mt-3 mb-2">
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default GeneralPrediction