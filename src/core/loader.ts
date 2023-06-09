const imageLoader = (params = { }) => {
    const img = new Image();
    for(const option in params)
        img[option] = params[option];
    return new Promise((resolve, reject) => {
        img.addEventListener("load", e => { resolve(img) });
        img.addEventListener("error", e => { reject(e) });
    });
}

export {
    imageLoader
}