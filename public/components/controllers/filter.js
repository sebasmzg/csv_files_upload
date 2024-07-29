export function filterData(arrayTable, searchTerm) {
    if (!searchTerm)
        return arrayTable;
    const lowerCaseTerm = searchTerm.toLowerCase();
    return arrayTable.filter(row => Object.values(row).some(cell => {
        if (cell == null)
            return false; // Maneja valores nulos o indefinidos
        return cell.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(lowerCaseTerm);
    }));
}
