const cartReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_BASKET":
            return action.payload;

        case "CLEAR_BASKET":
            return {};

        case "ADD_TO_BASKET":
            const existingItemIndex = state.basketitem_set.findIndex(item => item.slug === action.payload.slug);
            if (existingItemIndex !== -1){
                const newBasketItemSet = [...state.basketitem_set];
                newBasketItemSet[existingItemIndex] ={
                    ...newBasketItemSet[existingItemIndex],
                    quantity: newBasketItemSet[existingItemIndex].quantity += 1
                };

                return {
                    ...state,
                    basketitem_set: [...newBasketItemSet]
                };
            }
            return {
                ...state,
                basketitem_set: [...state.basketitem_set, action.payload]
            }

        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                basketitem_set: state.basketitem_set.filter(oldItem => oldItem.slug != action.payload),
            }

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
            const { changedItemSlug, discounted_price, value } = { ...action.payload }

            const newSet = state.basketitem_set.map(item => {
                if (item.slug == changedItemSlug) {
                    if (value === '+') {
                        return { ...item, quantity: item.quantity + 1 }
                    } else if (value === "-" && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }

                    }
                }
                return item;
            })
            return {
                ...state,
                basketitem_set: newSet,
                discounted_price
            }
        default:
            return state
    }
}


export default cartReducer