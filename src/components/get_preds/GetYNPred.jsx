import $ from 'jquery'
import { useState } from 'react'
import { saveToLocalStorage, goBack } from '../../utils/utils'
import "../YN.css"
import GetBazarBtn from '../GetBazarBtn'

const YNCard = ({predText, index}) =>{
    const [flipped, setFlipped] = useState(false)

    const flip = () =>{
        const duration = 500
        
        if(!flipped){
            const width = $(`#front-${index}`).width()
            const animatedFront = document.getElementById(`front-${index}`).animate([
                {transform:"translateX(0px)"},
                {transform:`translateX(${width/2}px) rotateZ(90deg)`},
            ], 
            {
                duration:duration
            })
            
            animatedFront.onfinish = ()=>{
                document.getElementById(`front-${index}`).remove()
            }

            setFlipped(true)
        }
        
    }

    const preOpen = () =>{
        const el = document.getElementById(`front-${index}`)
        if(el != undefined){
            document.getElementById(`front-${index}`).style.transform = "translateX(25px) translateY(25px)"
        }
    }

    const close = () =>{
        const el = document.getElementById(`front-${index}`)
        if(el != undefined){
            document.getElementById(`front-${index}`).style.transform = "translateX(0px)"
        }
    }

    return(
        <div onMouseLeave={close} onMouseMove={preOpen} onClick={flip} id={`yn-holder-${index}`} className="col-3 pt-2 pb-2 yn-pred-holder align-items-center">
            <div id={`front-${index}`} className="yn-holder yn-side yn-front">
                <span>набазарено, но скрыто, жмякай и смотри</span>
            </div>

            <div id={`back-${index}`} className="yn-holder yn-side yn-back">
                <span>{predText}</span>
            </div>
            
        </div>
    )
}


const GetYNPred = () =>{

    const [predictions, setPredictions] = useState(undefined)
    const [status, setStatus] = useState("тут будет судьба")

    const getPrediction = () =>{
        setPredictions(undefined)
        setStatus("гадаем судьбу...")
        rotateBtn(0)
        $.get(`http://localhost:8080/getYN?len=${$("#yn-count-inp").val()}`, (data)=>{
            saveToLocalStorage("yn", data)

            setPredictions(data)
            rotateBtn(1)
            setTimeout(()=>rotateBtn(2), 2000)
        })
    }

    const routesMap = [90,90,-180]

    const btnId = "getYNPredBtn"
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
                    <input id="yn-count-inp" type="number" className="col-1 mt-2"/>
                </div>
                

                <div className="col-12 mt-5">
                    <button onClick={goBack} className="btn col-2 nav_btn">
                        вернуться назад
                    </button>
                </div>
            </div>

            {predictions?(
                <div className="container-fluid mt-5">
                    <div className="row justify-content-center text-center">
                        {predictions.map((p, index) => (
                            <YNCard predText={p} index={index}/>
                        ))}
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

export default GetYNPred