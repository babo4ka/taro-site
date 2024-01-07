import { useSelector } from "react-redux"

const GetGeneralPred = () =>{
    const prevp = useSelector(state => state.page.pagesStack)
    console.log(prevp)
    return(
        <div>
            hello
        </div>
    )
}

export default GetGeneralPred