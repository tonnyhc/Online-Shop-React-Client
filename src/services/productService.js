const url = 'http://localhost:8000/api/products/';

export const getAll = async () => {
    try{
        const response = await fetch(url);
        if (response.ok !== true){
            throw new Error(response.msg)
        }
        const data = await response.json()
        return data;
    } catch (e){
        throw new Error(e.msg)
    }
}

export const getBySlug = async (slug) => {
    try{
        const response = await fetch(url + slug);
        if (response.ok !== true){
            throw new Error(response.msg);
        }
        const data = await response.json();
        return data
    } catch (e){
        throw new Error(e.msg)
    }
}