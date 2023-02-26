import { addToBasket } from "../../services/basketService";


export const addToCart = async (e, slug, csrfToken) => {
    e.preventDefault();
    // TODO: When added item to the basket, wait for the response to be 200 and then append it to the state of the app
    try {
        const { product, quantity } = Object.fromEntries(new FormData(e.target));
        const body = {
            product,
            "quantity": Number(quantity)
        }
        const data = await addToBasket(slug, body, csrfToken);
        alert("Product successfully added to cart");
        return data;
    } catch (e) {
        alert(e);
    }

}