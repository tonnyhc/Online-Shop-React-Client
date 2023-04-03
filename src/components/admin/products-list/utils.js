export const createFormData = (data) => {
    const formData = new FormData();
    for (let [name, value] of Object.entries(data)) {
        if (name == 'images') {
            for (let image of value) {
                formData.append('image', image);
            }

        } else {
            formData.append(name, value);
        }

    };
    return formData;
}