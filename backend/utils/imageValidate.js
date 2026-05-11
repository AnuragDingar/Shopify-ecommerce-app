const imageValidate = (images) => {
    let imageTable = [];
    if (Array.isArray(images)) {
        imageTable = images;
    } else {
        imageTable.push(images)
    }

    if (imageTable.length > 3) {
        return { error: "Send only 3 images at once" }
    }
    for (let image of imageTable) {
        console.log("image.size", image.size)
        if (image.size > 3048576) {
            return { error: "Size too large (above 1 MB) " }
        }

        // /(image\/jpg)|(image\/jpeg)|(image\/png)/
        // /jpg|jpeg|png/
        const filetypes = /jpg|jpeg|png/;
        const minetype = filetypes.test(image.minetype);
        if (minetype) return { error: "Incorrect mine type (should be jpg,jpeg or png)" }
    }
    return { error: false }
}

module.exports = imageValidate