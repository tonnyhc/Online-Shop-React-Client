import { createContext, useState, useEffect, useContext } from "react";
import { AuthDataContext } from "./AuthContext";

import * as basketServices from '../services/basketService';

export const BasketContext = createContext();


export const BasketProvider = ({ children }) => {
    const [userBasket, setUserBasket] = useState({});

    const { csrfToken } = useContext(AuthDataContext);
    const { userData } = useContext(AuthDataContext);

    useEffect(() => {
        const fetchBasket = async () => {
            const username = userData.username
            const basket = await basketServices.getBasket(username, csrfToken);
            setUserBasket(basket)
        };

        fetchBasket();
    }, [])

    const clearUserBasket = () => {
        setUserBasket({});
    }

    const addItemToBasket = (newItem) => {
        setUserBasket(oldBasket => {
            return {
                ...oldBasket,
                basketitem_set: [...oldBasket.basketitem_set, newItem]
            };
        });
    }

    const removeItemFromBasket = (item) => {
        setUserBasket(oldBasket => {
            return {
                ...oldBasket,
                basketitem_set: oldBasket.basketitem_set.filter(oldItem => oldItem.slug !== item.slug)
            }
        })
    }

    return (
        <BasketContext.Provider value={{ userBasket, addItemToBasket, removeItemFromBasket, clearUserBasket }}>
            {children}
        </BasketContext.Provider>
    );
}