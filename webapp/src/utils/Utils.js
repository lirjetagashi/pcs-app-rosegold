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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export function getCurrency() {
    return formatter.format(0).split("0")[0];
}

export function formatCurrency(value) {
    if (!value) {
        return formatter.format(0);
    }

    return formatter.format(value);
}

export function formatName(firstName, lastName) {
    return `${firstName} ${lastName?.charAt(0)}.`
}