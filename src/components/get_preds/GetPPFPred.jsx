import { goBack } from "../../utils/utils"
import $ from 'jquery'
import { useEffect, useState } from "react"
import { act } from "react-dom/test-utils"

const PredCard = ({title, text}) =>{


    return (
        <div className="container-fluid col-5">
            <h2 style={{color:"#ffffff"}} className="ppf-title text-center">{title}</h2>
            <div className="prediction_holder ppf-pred-holder pt-2 pb-2">
                <span>{text}</span>
            </div>
        </div>
    )
}

const GetPPFPred = () =>{

    const [status, setStatus] = useState("тут будет судьба")
    const [predictions, setPredictions] = useState(undefined)

    const getPrediction = async () =>{
        setPredictions(undefined)
        setStatus("гадаем судьбу...")
        await $.get("http://localhost:8080/getPPF", (data)=>{
            console.log(data)

            setPredictions(data)
            
        })
    }

    // let currentZoom = 0; 
    const [currentZoom, setCurrentZoom] = useState(0)
    let minZoom = 0; 
    let maxZoom = 10; 
    let stepSize = 1;


    const predTitles = ["ПРОШЛОЕ", "НАСТОЯЩЕЕ", "БУДУЩЕЕ"]
    const [predTypeKey, setPredTypeKey] = useState('future')
    // 0 - past, 1 - present, 2 - future
    const [predType, setPredType] = useState(0)
    const EnlargePred = (e) =>{
        document.body.style.overflow = "hidden";
        let direction = e.deltaY < 0?-1:1

        let newZoom = currentZoom + direction * stepSize

        let pred = document.getElementById("ppf-pred")

        console.log("start ", currentZoom)


        if(newZoom > maxZoom || newZoom < minZoom){
            if(newZoom > maxZoom){
                if(predType < 2){
                    setPredType(p =>{
                        return p + 1
                    })

                    setCurrentZoom(0)

                    var nextPred = Object.keys(predictions)[predType]
                    setPredTypeKey(nextPred)

                    pred.style.transform = `scale(0)`

                    console.log("make more block ", currentZoom)
                }else{
                    document.body.style.overflow = "auto";
                }
                console.log("more block ", currentZoom)
            }else if (newZoom < minZoom){
                if(predType > 0){
                    setPredType(p =>{
                        return p-1
                    });
                    setCurrentZoom(10)

                    var nextPred = Object.keys(predictions)[predType]
                    setPredTypeKey(nextPred)

                    pred.style.transform = `scale(1)`

                    console.log("make less block ", currentZoom)
                }else{
                    document.body.style.overflow = "auto";
                }

                console.log("less block ", currentZoom)
            }
            console.log("or or block ", currentZoom)
        }else{
            // currentZoom = newZoom
            setCurrentZoom(newZoom)
    
            pred.style.transform = `scale(${currentZoom/10})`

            console.log("usual ", currentZoom)
        }

        console.log("end ", currentZoom)
    }

    return(
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-12 bazar-btn-holder">
                    <button onClick={getPrediction} className="btn get-bazar-btn col-4">
                        базар судьбы
                    </button>
                </div>

                <div className="col-12 mt-5">
                    <button onClick={goBack} className="btn col-2 nav_btn">
                        вернуться назад
                    </button>
                </div>
            </div>

            {predictions?(
                <div onWheel={EnlargePred} id="ppf-preds-scroll" className="row justify-content-center ppf-preds-holder">

                    <h2 style={{color:"#ffffff"}} className="ppf-title text-center">{predTitles[predType]}</h2>

                    <div id="ppf-pred" className="col-7 ppf-pred-holder">
                        <span>{predictions[predTypeKey]}</span>
                    </div>
                    {/* <div className="col-12">
                        <PredCard title="ПРОШЛОЕ" text={predictions['past']}/>
                    </div>
                    
                    <div className="col-12">
                        <PredCard title="НАСТОЯЩЕЕ" text={predictions['present']}/>
                    </div>

                    <div className="col-12">
                        <PredCard title="БУДУЩЕЕ" text={predictions['future']}/>
                    </div> */}
                </div>
            ):
                <div className='row justify-content-center text-center mt-5'>
                    <span style={{color:"#ffffff"}} className='fw-bold'>{status}</span>
                </div>
            }
        </div>
    )
}

export default GetPPFPred