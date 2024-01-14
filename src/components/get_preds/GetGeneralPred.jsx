import "../Common.css"
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage, removeAll, goBack} from "../../utils/utils"
import { useEffect, useState } from "react"
import $ from 'jquery'
import GeneralPrediction from "../GeneralPrediction"
import GetBazarBtn from "../GetBazarBtn"


const GetGeneralPred = () =>{

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
        
        // for(var key in preds){
        //     if (key != 'last'){
        //         predsArr.push({
        //             text:preds[key],
        //             inkey:key
        //         })
        //     }
        // }

        // console.log(predictions)
        setPredictions(predsArr)
        // console.log(predictions)
    }

    useEffect(()=>{
        updatePreds()
    }, [])

    const [prediction, setPrediction] = useState("")

    const getPrediction = () =>{
        console.log("get pred before fetch")
        setPredictions(undefined)
        $.get(`http://localhost:8080/getGeneral?len=${$("#gen-count-inp").val()}`, (data)=>{
            // console.log("get pred after fetch inside")
            setPrediction(data)
            
            saveToLocalStorage("general", data)
            
            updatePreds()
            
        }).fail((data)=>{
           updatePreds()
           setPrediction(data.responseText)
        })
        console.log("get pred after fetch outside")
        
    }

    const removeAllPreds = () =>{
        removeAll("general")
        updatePreds()
    }


    return(
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
            <div className="col-12 bazar-btn-holder">
                    <button onClick={getPrediction} className="btn get-bazar-btn col-4">
                        базар судьбы
                    </button>
                </div>
                {/* <GetBazarBtn getPrediction={getPrediction} /> */}

                <div className="col-12 mt-5 row justify-content-center">
                    <span style={{color:"#FFFFFF"}} className="col-12 fw-bold">сколько слов базарить?</span>
                    <input id="gen-count-inp" type="number" className="col-1 mt-2"/>
                </div>
                

                <div className="col-12 mt-5">
                    <button onClick={goBack} className="btn col-2 nav_btn">
                        вернуться назад
                    </button>
                </div>
            </div>

            <div className="row justify-content-center text-center mt-5">
                <span className="col-10 fw-bold prediction-text">
                    {prediction}
                </span>
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

export default GetGeneralPred