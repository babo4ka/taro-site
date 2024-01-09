import $ from 'jquery'

const GetYNPred = () =>{

    const getPrediction = () =>{
        $.get("http://localhost:8080/getYN", (data)=>{
            // console.log("get pred after fetch inside")
            console.log(data)
        })
    }

    const goBack = () =>{
        window.location.href = "/"
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

            
        </div>
    )
}

export default GetYNPred