import "./MainPage.css"
import "./Common.css"
import { useState } from "react"
import $ from 'jquery'
import { useDispatch, useSelector} from "react-redux"
import { add_page } from "../store/pageReducer"

const MainPage = () =>{

    const [titleText, setTitleText] = useState("набазарь себе судьбу")



    const goToGet = () =>{
        setTitleText("какую судьбуу базарим?")
        setPageType(0)
        $("#main-menu-btns").addClass("hidden-btns")
        $("#choose-pred-btns").removeClass("hidden-btns")
    }

    const goToMy = () =>{
        setTitleText("набазаренная судьба")
        setPageType(1)

        $("#main-menu-btns").addClass("hidden-btns")
        $("#choose-pred-btns").removeClass("hidden-btns")
    }

    const goToMain = () =>{
        setTitleText("набазарь себе судьбу")
        setPageType(-1)

        $("#main-menu-btns").removeClass("hidden-btns")
        $("#choose-pred-btns").addClass("hidden-btns")
    }


    const generalPages = ["/getGeneral", "/myGeneral"]
    const ynPages = ["/getYN", "/myYN"]
    const pffPages = ["/getPFF", "/myPFF"]
    //0 - get, 1 - my, (-1) - none
    const [pageType, setPageType] = useState(-1)

    const openGeneralPage = () => {
        window.location.href = generalPages[pageType]
    }

    const openYNPage = () =>{
        window.location.href = ynPages[pageType]
    }


    return(
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-12 title">
                    <h1 className="col-12">{titleText}</h1>
                </div>
                
                <div id="main-menu-btns" className="col-12 row justify-content-center mt-5">
                    <button onClick={goToGet} className="btn col-md-2 col-12 nav_btn">получить предсказания</button>

                    <button onClick={goToMy} className="btn col-md-2 col-12 nav_btn">мои предсказания</button>
                </div>
 
                <div id="choose-pred-btns" className="col-12 row justify-content-center mt-5 hidden-btns">
                    <button onClick={openGeneralPage} className="btn col-md-2 col-12 nav_btn">общее</button>
                    <button onClick={openYNPage} className="btn col-md-2 col-12 nav_btn">да / нет</button>
                    <button className="btn col-md-2 col-12 nav_btn">прошлое-настоящее-будущее</button>
                    <div className="col-12">
                        <button onClick={goToMain} className="btn col-md-2 col-12 nav_btn mt-3">назад</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MainPage