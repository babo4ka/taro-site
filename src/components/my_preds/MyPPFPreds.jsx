import { useEffect, useState } from "react"
import { removeAll, goBack, getFromLocalStorage, removeFromLocalStorage } from "../../utils/utils"

const PPFPrediction = ({preds, inkey, update})=>{

    const deletePred = ()=>{
        removeFromLocalStorage("ppf", inkey)
        update()
    }

    return(
        <div className={`container-fluid prediction_holder col-7 mt-3 mb-3`}>
            <span onClick={deletePred} className="close-btn">&#10060;</span>
            <div className="row justify-content-center">


                <div className="col-12 text-start mt-3 mb-2">
                    <span>{"Прошлое: " + preds['past']}<br/></span>
                    <span>{"Настоящее: " + preds['present']}<br/></span>
                    <span>{"Будущее: " + preds['future']}</span>
                </div>
            </div>
        </div>
    )
}

const MyPPFPreds = () =>{

    const [predictions, setPredictions] = useState(undefined)

    const updatePreds = () =>{
        const preds = getFromLocalStorage("ppf")
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
        removeAll("ppf")
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
                            <PPFPrediction preds={p.preds} inkey={p.inkey} update={updatePreds}/>
                        ))}
                    </div>
                </div>
            ):""}
        </div>
    )
}

export default MyPPFPreds