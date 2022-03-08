function deepCopy(obj) {
    let copy = JSON.parse(JSON.stringify(obj));
    return copy;
}

export default {
    deepCopy
}