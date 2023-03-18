const cartReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_BASKET":
            return action.payload
        case "ON_ORDER":
            return action.payload
        case "ON_DISCOUNT":
            return {
                ...state,
                ...action.payload
            }
        case "ON_REMOVE_DISCOUNT":
            return {
                ...state,
                discounted_price: null,
                discount: null
            }
        case "UPDATE_QUANTITY":
            return {
                ...state,
                discounted_price: action.payload
            }
        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                discounted_price: action.payload
            }
        default:
            return state
    }
}


export default cartReducer