import $ from 'jquery'
import { useState } from 'react'
import { saveToLocalStorage, goBack } from '../../utils/utils'

const YNCard = ({predText, index}) =>{

    const [text, setText] = useState("набазарено, но скрыто, жмякай и смотри")
    const [flipped, setFlipped] = useState(false)

    const flip = () =>{
        
        if(!flipped){
            document.getElementById(`yn-holder-${index}`).animate([
                {transform:'rotateY(90deg)'}
            ], {
                duration: 300,
                iterations: 1
            })
            .onfinish =()=>{
                $(`#yn-holder-${index}`).removeClass("before-flip-yn-holder")
                setText(predText)
            }
            setFlipped(true)
        }
        
    }

    return(
        <div onClick={flip} id={`yn-holder-${index}`} className="col-3 prediction_holder yn-holder pt-2 pb-2 before-flip-yn-holder">
            <span>{text}</span>
        </div>
    )
}

const YNPred = ({preds})=>{


    return(
        <div className="container-fluid mt-5">
            <div className="row justify-content-center text-center">
                {preds.map((pred, index) =>(
                    <YNCard predText={pred} index={index}/>
                ))}
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
        $.get(`http://localhost:8080/getYN?len=${$("#yn-count-inp").val()}`, (data)=>{
            saveToLocalStorage("yn", data)

            setPredictions(data)
        })
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
                    <input id="yn-count-inp" type="number" className="col-1 mt-2"/>
                </div>
                

                <div className="col-12 mt-5">
                    <button onClick={goBack} className="btn col-2 nav_btn">
                        вернуться назад
                    </button>
                </div>
            </div>

            {predictions?(<YNPred preds={predictions}/>):
                <div className='row justify-content-center text-center mt-5'>
                    <span style={{color:"#ffffff"}} className='fw-bold'>{status}</span>
                </div>
            }
            
        </div>
    )
}

export default GetYNPred