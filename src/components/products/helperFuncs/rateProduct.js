import * as productServices from '../../../services/productService';

export const onRate = async (e, slug) => {

    let score;

    if (e.target.tagName == 'BUTTON' ){
        score = e.target.value;
    } else if (e.target.tagName == 'I'){
        score = e.target.parentElement.value;
    }

    try {
        const data = await productServices.rateProduct(slug, score);
        return data;
    } catch(e){
        return;
    }
} 
