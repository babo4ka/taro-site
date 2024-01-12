import "./GetBazar.css"

const GetBazarBtn = ({getPrediction}) =>{

    return(
        <div onClick={getPrediction} className="col-12 bazar-btn-holder">
                {/* <button onClick={getPrediction} className="btn get-bazar-btn col-4">
                    базар судьбы
                </button> */}
            <div class="back-bs bazar-side">
                <span>базар судьбы</span>
            </div>
            {/* <div class="left-bs bazar-side"></div>
            <div class="right-bs bazar-side"></div> */}
            <div class="top-bs bazar-side">
                <span>базар судьбы</span>
            </div>
            <div class="bottom-bs bazar-side">
                <span>базар судьбы</span>
            </div>
            <div class="front-bs bazar-side">
                <span>базар судьбы</span>
            </div>

        </div>
    )
}

export default GetBazarBtn