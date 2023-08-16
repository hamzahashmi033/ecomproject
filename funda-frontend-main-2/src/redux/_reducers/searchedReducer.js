import {GET_SEARCHED_ITEMS} from '../types'

const initState = {
    searchArr : {} ,
   
}

const searchProductReducer = (state = initState , action) =>{
    switch(action.type) {
        
        case GET_SEARCHED_ITEMS : {
            return {
                ...state,
                searchArr:action.payload
            }
        }
       
        default : return state
    }
}

export default searchProductReducer;