export function filterData(arrayTable, searchTerm) {
    if (!searchTerm)
        return arrayTable;
    const lowerCaseTerm = searchTerm.toLowerCase();
    return arrayTable.filter(row => Object.values(row).some(cell => cell.toLowerCase().includes(lowerCaseTerm)));
}
