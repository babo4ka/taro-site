import {createStore, combineReducers} from 'redux'
import { pageReducer } from './pageReducer'


const rootReducer = combineReducers({
    page:pageReducer
})

export const store = createStore(rootReducer)