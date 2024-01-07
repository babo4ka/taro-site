import { useEffect } from "react"
import { useSelector } from "react-redux"

import "../Common.css"
import { store } from "../../store/store"

const GetGeneralPred = () =>{
    const prevp = useSelector(state => state.page)

    useEffect(()=>{
        console.log(prevp)
    })

    const goBack = () =>{
        console.log(prevp)
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
        </div>
    )
}

export default GetGeneralPred