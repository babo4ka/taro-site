import { removeFromLocalStorage } from "../utils/utils"

const YNPrediction = ({preds, inkey, update}) =>{

    const deletePred = ()=>{
        removeFromLocalStorage("yn", inkey)
        update()
    }


    return(
        <div className={`container-fluid prediction_holder col-7 mt-3 mb-3`}>
            <span onClick={deletePred} className="close-btn">&#10060;</span>
            <div className="row justify-content-center">


                <div className="col-12 text-start mt-3 mb-2">
                    {preds.map((p, index) =>(
                        <span>{(index + 1) + ": " + p}<br/></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default YNPrediction