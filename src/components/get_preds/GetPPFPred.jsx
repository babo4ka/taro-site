import { goBack, saveToLocalStorage } from "../../utils/utils"
import $ from 'jquery'
import {useState } from "react"
import "../PPF.css"
import GetBazarBtn from "../GetBazarBtn"

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
        rotateBtn(0)
        await $.get(`http://localhost:8080/getPPF?len=${$("#ppf-count-inp").val()}`, (data)=>{
            console.log(Object.keys(data))

            setPredictions(data)
            
            saveToLocalStorage("ppf", data)
            rotateBtn(1)

            setTimeout(()=>rotateBtn(2), 2000)
        })
    }




    const [predTitle, setPredTitle] = useState("")
    const [predshow, setPredShow] = useState("")

    const setPredToModal = (e) =>{
        switch(e.currentTarget.id){
            case "past-box":
                setPredTitle("ПРОШЛОЕ")
                setPredShow(predictions['past'])
                return
            
            case "present-box":
                setPredTitle("НАСТОЯЩЕЕ")
                setPredShow(predictions['present'])
                return

            case "future-box":
                setPredTitle("БУДУЩЕЕ")
                setPredShow(predictions['future'])
                return

            default:
                setPredTitle("")
                setPredShow("")
                return
        }
    }

    const routesMap = [90,90,-180]

    const btnId = "getPPFPredBtn"
    const rotateBtn = (route) =>{
        const newRotate = routesMap
        .filter((m, i) => i < route)
        .reduce((sum, currValue) => sum + currValue, 0) + routesMap[route]

        const animateBtn = document.getElementById(btnId).animate([
            {transform:`rotateX(${newRotate}deg)`}
        ],
        {
            duration:500
        })

        animateBtn.onfinish = () =>{
            document.getElementById(btnId).style.transform = `rotateX(${newRotate}deg)`
        }
    }

    return(
        <div className="container-fluid">
            <div className="row justify-content-center text-center">

                <GetBazarBtn
                    getPrediction={getPrediction}
                    fsText="базар судьбы" 
                    bosText="гадаем судьбу..." 
                    basText="судьба готова"
                    btnId={btnId}
                />

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


                    <div onClick={setPredToModal} id="past-box" className="col-3 row justify-content-center text-center pred-cube-holder" data-bs-toggle="modal" data-bs-target="#prediction-modal">
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
                    
                    <div onClick={setPredToModal} id="present-box" className="col-3 row justify-content-center text-center pred-cube-holder" data-bs-toggle="modal" data-bs-target="#prediction-modal">
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
                    
                    <div onClick={setPredToModal} id="future-box" className="col-3 row justify-content-center text-center pred-cube-holder" data-bs-toggle="modal" data-bs-target="#prediction-modal">
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

            <div id="prediction-modal" class="modal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content modal-window">
                        <div class="modal-header">
                            <h5 class="modal-title">{predTitle}</h5>
                            <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Закрыть">&#10060;</button>
                        </div>
                        <div class="modal-body text-center fw-bold">
                            <p>{predshow}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetPPFPred