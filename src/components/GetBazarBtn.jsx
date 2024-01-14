import "./GetBazar.css"

const GetBazarBtn = ({getPrediction, fsText, bosText, basText, btnId}) =>{

    return(
        <div id={btnId} onClick={getPrediction} className="col-12 bazar-btn-holder">
            <div class="back-bs bazar-side">
                <span>{basText}</span>
            </div>
            <div class="top-bs bazar-side">
                <span>{bosText}</span>
            </div>
            <div class="bottom-bs bazar-side">
                <span>""</span>
            </div>
            <div class="front-bs bazar-side">
                <span>{fsText}</span>
            </div>

        </div>
    )
}

export default GetBazarBtn