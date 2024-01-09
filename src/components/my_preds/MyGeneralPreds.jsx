import { useEffect, useState } from "react"
import { getFromLocalStorage, removeAll } from "../../utils/utils"
import GeneralPrediction from "../GeneralPrediction"

const MyGeneralPreds = () =>{

    const [predictions, setPredictions] = useState(undefined)

    const updatePreds = () =>{
        console.log("update preds")
        const preds = getFromLocalStorage("general")
        const predsArr = []

        if(preds != undefined){
            for(let i=preds.last; i>0; i--){
                predsArr.push({
                    text:preds[i],
                    inkey:i,
                    isLast:i==preds.last
                })
            }
        }

        setPredictions(predsArr)
    }
    
    const removeAllPreds = () =>{
        removeAll("general")
        updatePreds()
    }

    useEffect(()=>{
        updatePreds()
    }, [])

    const goBack = () =>{
        window.location.href = "/"
    }

    return(
        <div className="container-fluid">
            <div className="col-12 mt-5">
                <button onClick={goBack} className="btn col-2 nav_btn">
                    вернуться назад
                </button>
            </div>


            {predictions?(
                <div className="row justify-content-center mt-5">
                    <div className="col-12 row justify-content-center">
                        <div className="col-7">
                        <button onClick={removeAllPreds} className="btn remove-btn col-2">Удалить все</button>
                        </div>
                        
                    </div>
                    
                    <div className="col-12">
                        {predictions.map(p =>(
                            <GeneralPrediction text={p.text} inkey={p.inkey} isLast={p.isLast} update={updatePreds}/>
                        ))}
                    </div>
                </div>
            ):""}
        </div>
    )
}

export default MyGeneralPreds