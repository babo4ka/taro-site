import YNPrediction from "../YNPrediction"
import { goBack, getFromLocalStorage, removeAll } from "../../utils/utils"
import { useEffect, useState } from "react"

const MyYNPreds = () =>{

    const [predictions, setPredictions] = useState(undefined)

    const updatePreds = () =>{
        const preds = getFromLocalStorage("yn")
        const predsArr = []

        if(preds != undefined){
            for(let i=preds.last; i>0; i--){
                predsArr.push({
                    preds:preds[i],
                    inkey:i
                })
            }
        }

        setPredictions(predsArr)
    }

    useEffect(()=>{
        updatePreds()
    }, [])

    const removeAllPreds = () =>{
        removeAll("yn")
        updatePreds()
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
                            <YNPrediction preds={p.preds} inkey={p.inkey} update={updatePreds}/>
                        ))}
                    </div>
                </div>
            ):""}
        </div>
    )
}

export default MyYNPreds