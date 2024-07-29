// Function to sort columns
export function sortColumns(data, column, order) {
    // Return the sorted data
    return data.sort((a, b) => {
        var _a, _b;
        const valueA = ((_a = a[column]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || '';
        const valueB = ((_b = b[column]) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase()) || '';
        // Compare the values
        if (valueA < valueB)
            return order === 'asc' ? -1 : 1;
        if (valueA > valueB)
            return order === 'desc' ? 1 : -1;
        return 0;
    });
}
