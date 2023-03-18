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

        default:
            return state
    }
}


export default cartReducer