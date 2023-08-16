import {ORDER_LOAD_SUCCESS, ORDER_LOAD_FAIL, ORDER_SUCCESS, ORDER_FAIL} from '../types'

const initState = {
    orders : [] ,
    order : null ,
    error : null ,
    loading : true
}

const orderReducer = (state = initState , action) =>{
    switch(action.type) {
        
        case ORDER_SUCCESS : {
            return {
                ...state,
                order : action.payload
            }
        }
        case ORDER_FAIL : {
            return{
                ...state,
                error: action.payload
            }
        }
        case ORDER_LOAD_SUCCESS : {
            return {
                ...state,
                orders : action.payload,
                loading : false 
            }
        }
        case ORDER_LOAD_FAIL : {
            return {
                ...state,
                orders : [] ,
                error : action.payload,
                loading: false
            }
        }
        default : return state
    }
}

export default orderReducer;