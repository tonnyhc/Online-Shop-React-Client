async function requester(method, url, body, csrfToken) {
    const host = 'http://localhost:8000/api';
    let options = {};
    options.method = method;
    options.headers = {};

    let token = JSON.parse(localStorage.getItem('userData')).token;

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    if (csrfToken) {
        options.headers['X-CSRFToken'] = csrfToken
    }

    if (token) {
        options.headers['Authorization'] = `Token ${token}`;
    }

    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            const data = await response.json();
            const error = new Error(data.message || "An error ocurred");
            error.status = response.status
            throw error;
        }
        if (response.status == 204) {
            return;
        }
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

export async function get(url, query) {
    const queryString = new URLSearchParams(query).toString();
    const requestUrl = queryString ? `${url}?${queryString}` : url;
    return await requester('GET', requestUrl, null);
}

export async function post(url, body, csrfToken) {
    return await requester('POST', url, body, csrfToken);
}

export async function put(url, body, csrfToken) {
    return await requester("PUT", url, body, csrfToken);
}

export async function del(url, body, csrfToken) {
    return await requester('DELETE', url, body, csrfToken);
}