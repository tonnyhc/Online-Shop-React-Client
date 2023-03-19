import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { AuthDataContext } from "./AuthContext";

import * as basketServices from '../services/basketService';
import cartReducer from "../components/cart/utils/cartReducer";

export const BasketContext = createContext();


export const BasketProvider = ({ children }) => {
    const { csrfToken, userData } = useContext(AuthDataContext);

    const [basket, basketDispatch] = useReducer(cartReducer, {
        basketitem_set: []
    });
    const [basketTotal, setBasketTotal] = useState(0);

    useEffect(() => {
        const total_cost = basket.basketitem_set.reduce((accumulator, item) => {
            if (item.discounted_price){
                return accumulator + item.discounted_price * item.quantity;
            } else {
                return accumulator + item.product_price * item.quantity;
            }
        }, 0);

        setBasketTotal(total_cost);
    }, [basket.basketitem_set])


    useEffect(() => {
        (async () => {
            const username = userData.username
            const data = await basketServices.getBasket(username, csrfToken);
            basketDispatch({
                type: 'FETCH_BASKET',
                payload: data
            })
        })();

    }, [])

    const clearUserBasket = () => {
        basketDispatch({
            type: 'CLEAR_BASKET'
        })
    }

    const addItemToBasket = (newItem) => {
        basketDispatch({
            type: 'ADD_TO_BASKET',
            payload: newItem
        })

    }

    const removeItemFromBasket = (item) => {
        basketDispatch({
            type: "REMOVE_FROM_BASKET",
            payload: item
        });
    }

    const applyDiscount = (data) => {
        basketDispatch({
            type: "ON_DISCOUNT",
            payload: data
        })
    }

    const removeDiscount = () => {
        basketDispatch({
            type: "ON_REMOVE_DISCOUNT",
        })
    }

    const updateItemQuantity = (changedItemSlug, discounted_price, value) => {
        basketDispatch({
            type: 'UPDATE_QUANTITY',
            payload: {
                changedItemSlug,
                discounted_price,
                value
            }
        })
    }



    return (
        <BasketContext.Provider value={{
            basket,
            basketTotal,
            addItemToBasket,
            removeItemFromBasket,
            clearUserBasket,
            applyDiscount,
            removeDiscount,
            updateItemQuantity
        }}>
            {children}
        </BasketContext.Provider>
    );
}