async function requester(method, url, body, token){
    const host = 'http://localhost:8000/api';
    let options = {};
    options.method = method;
    options.headers = {};
    debugger;
    if (body){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    if (token){
        options.headers['Authorization'] = `Token ${token}`;
    }

    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            throw new Error();
        }
        if (response.status == 204){
            return;
        }

        const data = await response.json();
        return data;
    } catch (error){
        alert(error.message);
        throw error
    }
}

export async function get(url, token) {
    return await requester('GET', url, null, token);
}

export async function post(url, body) {
    return await requester('POST', url, body);
}

export async function put(url, body) {
    return await requester("PUT", url, body);
}

export async function del(url){
    return await requester('DELETE', url);
}