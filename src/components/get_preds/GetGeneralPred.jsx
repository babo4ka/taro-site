import "../Common.css"
import { getFromLocalStorage } from "../../utils/utils"
import { useEffect, useState } from "react"

const PredCard = ({text, date}) =>{

    return(
        <div className="container-fluid prediction_holder col-7 mt-3 mb-3">
            <span className="close-btn">&#10060;</span>
            <div className="row justify-content-center">
                <div className="col-12 text-start fw-bold mt-2">
                    <span>{date}</span>
                </div>

                <div className="col-12 text-start mt-3 mb-2">
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}

const GetGeneralPred = () =>{

    // const [predictions, setPredictions] = useState(getFromLocalStorage("general"))

    const predictions = [{
        text:"312312 выф ыфв ыфрв ыфолв оырфов рфыо вфыр воыфро вфыр овр ыфо",
        date:"321321312312"
    },
    {
        text:"312312 выф ыфв ыфрв ыфолв оырфов рфыо вфыр воыфро вфыр овр ыфо",
        date:"321321312312"
    },
    {
        text:"312312 выф ыфв ыфрв ыфолв оырфов рфыо вфыр воыфро вфыр овр ыфо",
        date:"321321312312"
    },
    {
        text:"312312 выф ыфв ыфрв ыфолв оырфов рфыо вфыр воыфро вфыр овр ыфо",
        date:"321321312312"
    },
    {
        text:"312312 выф ыфв ыфрв ыфолв оырфов рфыо вфыр воыфро вфыр овр ыфо",
        date:"321321312312"
    }]


    const goBack = () =>{
        window.location.href = "/"
    }


    return(
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-12 bazar-btn-holder">
                    <button className="btn get-bazar-btn col-4">
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
                <div className="row justify-content-center mt-5">
                    <div className="col-12 row justify-content-center">
                        <div className="col-7">
                        <button className="btn remove-btn col-2">Удалить все</button>
                        </div>
                        
                    </div>
                    
                    <div className="col-12">
                        {predictions.map(p =>(
                            <PredCard text={p.text} date={p.date}/>
                        ))}
                    </div>
                </div>
            ):""}
            
        </div>
    )
}

export default GetGeneralPred