export function sortColumns(data, column, order) {
    return data.sort((a, b) => {
        var _a, _b;
        const valueA = ((_a = a[column[0]]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || '';
        const valueB = ((_b = b[column[0]]) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase()) || '';
        if (valueA < valueB)
            return order === 'asc' ? -1 : 1;
        if (valueA > valueB)
            return order === 'desc' ? 1 : -1;
        return 0;
    });
}
