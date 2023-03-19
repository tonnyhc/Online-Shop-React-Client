import { addToBasket } from "../../services/basketService";


export const addToCart = async (e, slug, csrfToken, callBackFn) => {
    e.preventDefault();
    try {
        const { product, quantity } = Object.fromEntries(new FormData(e.target));
        const body = {
            product,
            "quantity": Number(quantity)
        }
        const data = await addToBasket(slug, body, csrfToken);
        callBackFn(data.item);
        alert("Product successfully added to cart");
        return data;
    } catch (e) {
        alert(e);
    }

}