import { goBack, saveToLocalStorage } from "../../utils/utils"
import $ from 'jquery'
import {useState } from "react"
import "../PPF.css"

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
        await $.get(`http://localhost:8080/getPPF?len=${$("#ppf-count-inp").val()}`, (data)=>{
            console.log(Object.keys(data))

            setPredictions(data)
            
            saveToLocalStorage("ppf", data)
        })
    }

    const [currentZoom, setCurrentZoom] = useState(0)
    let minZoom = 0; 
    let maxZoom = 10; 
    let stepSize = 1;


    const predTitles = ["ПРОШЛОЕ", "НАСТОЯЩЕЕ", "БУДУЩЕЕ"]
    const [predTypeKey, setPredTypeKey] = useState('past')
    const predKeys = ['past', 'present', 'future']
    // 0 - past, 1 - present, 2 - future
    const [predType, setPredType] = useState(0)
    const EnlargePred = (e) =>{
        document.body.style.overflow = "hidden";
        
        let direction = e.deltaY < 0?-1:1
        let newZoom = currentZoom + direction * stepSize

        let pred = document.getElementById("ppf-pred")


        if(newZoom > maxZoom || newZoom < minZoom){
            if(newZoom > maxZoom){
                if(predType < 2){
                    var newType = predType + 1
                    setPredType(newType)

                    setCurrentZoom(0)

                    var nextPred = predKeys[newType]
                    
                    setPredTypeKey(nextPred)

                    pred.style.transform = `scale(0)`
                }else{
                    document.body.style.overflow = "auto";
                }
            }else if (newZoom < minZoom){
                if(predType > 0){
                    var newType = predType - 1
                    setPredType(newType);
                    setCurrentZoom(10)

                    var nextPred = predKeys[newType]
                    
                    setPredTypeKey(nextPred)

                    pred.style.transform = `scale(1)`
                }else{
                    document.body.style.overflow = "auto";
                }
            }
        }else{
            setCurrentZoom(newZoom)
    
            pred.style.transform = `scale(${newZoom/10})`
        }
    }

    return(
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-12 bazar-btn-holder">
                    <button onClick={getPrediction} className="btn get-bazar-btn col-4">
                        базар судьбы
                    </button>
                </div>

                <div className="col-12 mt-5 row justify-content-center">
                    <span style={{color:"#FFFFFF"}} className="col-12 fw-bold">сколько слов базарить?</span>
                    <input id="ppf-count-inp" type="number" className="col-1 mt-2"/>
                </div>
                

                <div className="col-12 mt-5">
                    <button onClick={goBack} className="btn col-2 nav_btn">
                        вернуться назад
                    </button>
                </div>
            </div>

            {predictions?(
                <div id="ppf-preds-scroll" className="row justify-content-center ppf-preds-holder">
{/* 
                    <h2 style={{color:"#ffffff"}} className="ppf-title text-center">{predTitles[predType]}</h2>

                    <div id="ppf-pred" className="col-7 ppf-pred-holder">
                        <span>{predictions[predTypeKey]}</span>
                    </div> */}

                    <div className="col-3 row justify-content-center text-center pred-cube-holder">
                        <span style={{color:"#FFFFFF"}} className="fw-bold">ПРОШЛОЕ</span>
                        <div class="pred-cube mt-5">
                            <div class="back side past"></div>
                            <div class="left side past"></div>
                            <div class="right side past"></div>
                            <div class="top side past"></div>
                            <div class="bottom side past"></div>
                            <div class="front side past"></div>
                        </div>
                    </div>
                    
                    <div className="col-3 row justify-content-center text-center pred-cube-holder">
                        <span style={{color:"#FFFFFF"}} className="fw-bold">НАСТОЯЩЕЕ</span>
                        <div class="pred-cube mt-5">
                            <div class="back side present"></div>
                            <div class="left side present"></div>
                            <div class="right side present"></div>
                            <div class="top side present"></div>
                            <div class="bottom side present"></div>
                            <div class="front side present"></div>
                        </div>
                    </div>
                    
                    <div className="col-3 row justify-content-center text-center pred-cube-holder">
                        <span style={{color:"#FFFFFF"}} className="fw-bold">БУДУЩЕЕ</span>
                        <div class="pred-cube mt-5">
                            <div class="back side future"></div>
                            <div class="left side future"></div>
                            <div class="right side future"></div>
                            <div class="top side future"></div>
                            <div class="bottom side future"></div>
                            <div class="front side future"></div>
                        </div>
                    </div>
                    
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