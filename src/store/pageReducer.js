const initialState = {
    pagesStack : []
}


export const ADD_PAGE = "ADD"
export const REMOVE_PAGE = "REMOVE"

export const pageReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_PAGE:
            var stack = state.pagesStack
            stack.push(action.page)

            return {...state, pagesStack:stack}

        case REMOVE_PAGE:
            var stack = state.pagesStack
            stack.pop()
            return {...state, pagesStack:stack}

        default:
            return state
    }


}


export const add_page = page => ({type:ADD_PAGE, page})
export const remove_page = () => ({type:REMOVE_PAGE})