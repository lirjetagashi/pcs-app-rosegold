export function resolveField(object, path, defaultValue) {
    return path
        .split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, object)
}

export function getTime(date) {
    if (!date) {
        return "--:--";
    }

    return new Date(date).toLocaleTimeString().substring(0, 5);
}