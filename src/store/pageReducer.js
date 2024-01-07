const initialState = {
    pagesStack : []
}


export const ADD_PAGE = "ADD"
export const REMOVE_PAGE = "REMOVE"

export const pageReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_PAGE:
            return {...state, pagesStack: ()=>{
                let stack = state.pagesStack
                stack.push(action.page)
                return stack
            }}

        case REMOVE_PAGE:
            return {...state, pagesStack: ()=>{
                let stack = state.pagesStack
                stack.pop()
                return stack
            }}

        default:
            return state
    }
}


export const add_page = page => ({type:ADD_PAGE, page})
export const remove_page = () => ({type:REMOVE_PAGE})